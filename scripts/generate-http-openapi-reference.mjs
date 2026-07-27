#!/usr/bin/env node
/**
 * Expand http-openapi-reference.ts body/query params from specification protos.
 * Preserves endpoint paths/samples; rewrites body field trees with nested children.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const SPEC = path.resolve(ROOT, '../specification/api/v1');
const OUT = path.join(ROOT, 'src/lib/http-openapi-reference.ts');

const REQUEST_SKIP = new Set([
  'ctime',
  'mtime',
  'etime',
  'rtime',
  'editable',
  'deleteable',
  'total_service_count',
  'total_health_instance_count',
  'total_instance_count',
  'total_config_file_count',
  'healthy_instance_count',
  'file_count',
  'fileCount',
  'md5',
  'create_by',
  'modify_by',
  'active',
  'status',
  'revision',
  'flag',
]);

/** endpointId -> protobuf message for write body (array of message unless noted) */
const BODY_MESSAGE = {
  login: 'LoginRequest',
  'create-namespaces': 'Namespace',
  'update-namespaces': 'Namespace',
  'delete-namespaces': 'Namespace',
  'create-services': 'Service',
  'update-services': 'Service',
  'delete-services': 'Service',
  'create-alias': 'ServiceAlias',
  'create-contract': 'ServiceContract',
  'report-contract': 'ServiceContract',
  'create-instances': 'Instance',
  'update-instances': 'Instance',
  'delete-instances': 'Instance',
  'create-groups': 'ConfigFileGroup',
  'update-groups': 'ConfigFileGroup',
  'create-files': 'ConfigFile',
  'update-files': 'ConfigFile',
  'delete-files': 'ConfigFile',
  'publish-config': 'ConfigFileRelease',
  'stop-beta': 'ConfigFileRelease',
  'rollback-release': 'ConfigFileRelease',
  'promote-gray': 'ConfigFileRelease',
  'routing-create': 'RouteRule',
  'routing-update': 'RouteRule',
  'routing-delete': 'RouteRule',
  'routing-publish': 'RuleRelease',
  'routing-rollback': 'RuleRelease',
  'routing-stopbeta': 'RuleRelease',
  'rate-limit-create': 'RateLimit',
  'rate-limit-update': 'RateLimit',
  'rate-limit-delete': 'RateLimit',
  'rate-limit-publish': 'RuleRelease',
  'rate-limit-rollback': 'RuleRelease',
  'rate-limit-stopbeta': 'RuleRelease',
  'circuit-breaker-create': 'CircuitBreakerRule',
  'circuit-breaker-update': 'CircuitBreakerRule',
  'circuit-breaker-delete': 'CircuitBreakerRule',
  'circuit-breaker-publish': 'RuleRelease',
  'circuit-breaker-rollback': 'RuleRelease',
  'circuit-breaker-stopbeta': 'RuleRelease',
  'fault-detect-create': 'FaultDetectRule',
  'fault-detect-update': 'FaultDetectRule',
  'fault-detect-delete': 'FaultDetectRule',
  'fault-detect-publish': 'RuleRelease',
  'fault-detect-rollback': 'RuleRelease',
  'fault-detect-stopbeta': 'RuleRelease',
  'lane-create': 'LaneGroup',
  'lane-update': 'LaneGroup',
  'lane-delete': 'LaneGroup',
  'lane-publish': 'RuleRelease',
  'lane-rollback': 'RuleRelease',
  'lane-stopbeta': 'RuleRelease',
  'lossless-create': 'LosslessRule',
  'lossless-update': 'LosslessRule',
  'lossless-delete': 'LosslessRule',
  'lossless-publish': 'RuleRelease',
  'lossless-rollback': 'RuleRelease',
  'lossless-stopbeta': 'RuleRelease',
  'traffic-security-create': 'TrafficSecurityRule',
  'traffic-security-update': 'TrafficSecurityRule',
  'traffic-security-delete': 'TrafficSecurityRule',
  'traffic-security-publish': 'RuleRelease',
  'traffic-security-rollback': 'RuleRelease',
  'traffic-security-stopbeta': 'RuleRelease',
  'traffic-mirror-create': 'TrafficMirror',
  'traffic-mirror-update': 'TrafficMirror',
  'traffic-mirror-delete': 'TrafficMirror',
  'traffic-mirror-publish': 'RuleRelease',
  'traffic-mirror-rollback': 'RuleRelease',
  'traffic-mirror-stopbeta': 'RuleRelease',
  'traffic-mock-create': 'TrafficMock',
  'traffic-mock-update': 'TrafficMock',
  'traffic-mock-delete': 'TrafficMock',
  'traffic-mock-publish': 'RuleRelease',
  'traffic-mock-rollback': 'RuleRelease',
  'traffic-mock-stopbeta': 'RuleRelease',
  'create-mcp': 'MCPServer',
  'update-mcp': 'MCPServer',
  'delete-mcp': 'MCPServer',
  'create-a2a': 'A2AAgent',
  'update-a2a': 'A2AAgent',
};

/** endpointId -> query message (fields become query params) */
const QUERY_MESSAGE = {
  'list-a2a': 'A2AAgentQuery',
  'list-mcp': 'MCPServerQuery',
};

/** Go-only registry models (no specification proto yet). */
const MANUAL_MESSAGES = {
  A2AAgent: {
    comment: 'A2A Agent registry entry (control-plane aitypes.A2AAgent).',
    fields: [
      { name: 'id', typeRaw: 'string', repeated: false, comment: 'Agent ID。' },
      { name: 'name', typeRaw: 'string', repeated: false, comment: 'Agent 名称。' },
      { name: 'namespace', typeRaw: 'string', repeated: false, comment: '命名空间。' },
      { name: 'visibility', typeRaw: 'string', repeated: false, comment: '可见性。' },
      { name: 'description', typeRaw: 'string', repeated: false, comment: '描述。' },
      { name: 'version', typeRaw: 'string', repeated: false, comment: 'Agent 版本。' },
      { name: 'protocol_version', typeRaw: 'string', repeated: false, comment: '协议版本。' },
      { name: 'provider_organization', typeRaw: 'string', repeated: false, comment: '提供方组织。' },
      { name: 'provider_url', typeRaw: 'string', repeated: false, comment: '提供方 URL。' },
      { name: 'documentation_url', typeRaw: 'string', repeated: false, comment: '文档 URL。' },
      { name: 'icon_url', typeRaw: 'string', repeated: false, comment: '图标 URL。' },
      { name: 'business', typeRaw: 'string', repeated: false, comment: '业务。' },
      { name: 'department', typeRaw: 'string', repeated: false, comment: '部门。' },
      { name: 'backend_type', typeRaw: 'string', repeated: false, comment: '后端类型：service / address。' },
      { name: 'backend_service_namespace', typeRaw: 'string', repeated: false, comment: 'backend_type=service 时的服务命名空间。' },
      { name: 'backend_service_name', typeRaw: 'string', repeated: false, comment: 'backend_type=service 时的服务名。' },
      { name: 'backend_address', typeRaw: 'string', repeated: false, comment: 'backend_type=address 时的地址。' },
      { name: 'preferred_interface_url', typeRaw: 'string', repeated: false, comment: '首选接口 URL。' },
      { name: 'preferred_protocol_binding', typeRaw: 'string', repeated: false, comment: '首选协议绑定。' },
      { name: 'preferred_protocol_version', typeRaw: 'string', repeated: false, comment: '首选协议版本。' },
      { name: 'streaming', typeRaw: 'bool', repeated: false, comment: '是否支持流式。' },
      { name: 'push_notifications', typeRaw: 'bool', repeated: false, comment: '是否支持推送通知。' },
      { name: 'extended_agent_card', typeRaw: 'bool', repeated: false, comment: '是否扩展 Agent Card。' },
      { name: 'raw_card_json', typeRaw: 'string', repeated: false, comment: '原始 Agent Card JSON。' },
      { name: 'source_type', typeRaw: 'string', repeated: false, comment: '来源类型。' },
      { name: 'source_url', typeRaw: 'string', repeated: false, comment: '来源 URL。' },
      { name: 'metadata', typeRaw: 'map<string,string>', mapKey: 'string', mapVal: 'string', repeated: false, comment: '元数据。' },
      { name: 'interfaces', typeRaw: 'A2AAgentInterface', repeated: true, comment: '接口列表。' },
      { name: 'skills', typeRaw: 'A2AAgentSkill', repeated: true, comment: '技能列表。' },
    ],
  },
  A2AAgentQuery: {
    comment: 'A2A Agent list query.',
    fields: [
      { name: 'name', typeRaw: 'string', repeated: false, comment: '按名称过滤。' },
      { name: 'namespace', typeRaw: 'string', repeated: false, comment: '命名空间。' },
      { name: 'business', typeRaw: 'string', repeated: false, comment: '业务。' },
      { name: 'department', typeRaw: 'string', repeated: false, comment: '部门。' },
      { name: 'protocol_binding', typeRaw: 'string', repeated: false, comment: '协议绑定。' },
      { name: 'skill_tag', typeRaw: 'string', repeated: false, comment: '技能标签。' },
      { name: 'backend_type', typeRaw: 'string', repeated: false, comment: '后端类型。' },
      { name: 'backend_service_namespace', typeRaw: 'string', repeated: false, comment: '后端服务命名空间。' },
      { name: 'backend_service_name', typeRaw: 'string', repeated: false, comment: '后端服务名。' },
      { name: 'streaming', typeRaw: 'bool', repeated: false, comment: '是否流式。' },
      { name: 'push_notifications', typeRaw: 'bool', repeated: false, comment: '是否推送通知。' },
      { name: 'offset', typeRaw: 'uint32', repeated: false, comment: '分页偏移。' },
      { name: 'limit', typeRaw: 'uint32', repeated: false, comment: '分页大小。' },
    ],
  },
  A2AAgentInterface: {
    comment: 'A2A Agent interface.',
    fields: [
      { name: 'id', typeRaw: 'string', repeated: false, comment: '接口 ID。' },
      { name: 'agent_id', typeRaw: 'string', repeated: false, comment: '所属 Agent ID。' },
      { name: 'url', typeRaw: 'string', repeated: false, comment: '接口 URL。' },
      { name: 'protocol_binding', typeRaw: 'string', repeated: false, comment: '协议绑定。' },
      { name: 'protocol_version', typeRaw: 'string', repeated: false, comment: '协议版本。' },
    ],
  },
  A2AAgentSkill: {
    comment: 'A2A Agent skill.',
    fields: [
      { name: 'id', typeRaw: 'string', repeated: false, comment: '记录 ID。' },
      { name: 'agent_id', typeRaw: 'string', repeated: false, comment: '所属 Agent ID。' },
      { name: 'skill_id', typeRaw: 'string', repeated: false, comment: '技能 ID。' },
      { name: 'name', typeRaw: 'string', repeated: false, comment: '技能名称。' },
      { name: 'description', typeRaw: 'string', repeated: false, comment: '描述。' },
      { name: 'tags', typeRaw: 'string', repeated: true, comment: '标签。' },
      { name: 'examples', typeRaw: 'string', repeated: true, comment: '示例。' },
      { name: 'input_modes', typeRaw: 'string', repeated: true, comment: '输入模式。' },
      { name: 'output_modes', typeRaw: 'string', repeated: true, comment: '输出模式。' },
      { name: 'security_requirements_json', typeRaw: 'string', repeated: false, comment: '安全要求 JSON。' },
    ],
  },
};

/** Any-typed fields: expand as union of concrete messages */
const ANY_EXPANSIONS = {
  routing_config: [
    {
      when: 'route_policy=RulePolicy',
      message: 'CustomRoute',
      zh: 'RulePolicy 时 unpack 为 CustomRoute。',
      en: 'When route_policy=RulePolicy, unpack as CustomRoute.',
    },
    {
      when: 'route_policy=MetadataPolicy',
      message: 'MetadataRoutingConfig',
      zh: 'MetadataPolicy 时 unpack 为 MetadataRoutingConfig。',
      en: 'When route_policy=MetadataPolicy, unpack as MetadataRoutingConfig.',
    },
    {
      when: 'route_policy=NearbyPolicy',
      message: 'NearbyRoutingConfig',
      zh: 'NearbyPolicy 时 unpack 为 NearbyRoutingConfig。',
      en: 'When route_policy=NearbyPolicy, unpack as NearbyRoutingConfig.',
    },
  ],
};

function walkProtoFiles(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkProtoFiles(p, acc);
    else if (ent.name.endsWith('.proto')) acc.push(p);
  }
  return acc;
}

function stripComments(block) {
  return block
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
}

function collectLeadingComments(text, index) {
  const before = text.slice(0, index);
  const lines = before.split('\n');
  const comments = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line.startsWith('//')) comments.unshift(line.replace(/^\/\/\s?/, ''));
    else break;
  }
  return comments.join(' ').trim();
}

function parseProtos(files) {
  const messages = new Map();
  const enums = new Map();

  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    // enums (top-level and nested namespaced as Parent.Child via post-process)
    const enumRe = /enum\s+(\w+)\s*\{([^}]*)\}/g;
    let em;
    while ((em = enumRe.exec(text))) {
      const name = em[1];
      const values = [...em[2].matchAll(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*\d+/gm)].map((x) => x[1]);
      enums.set(name, values);
    }

    // messages — iterative for nested
    const msgRe = /message\s+(\w+)\s*\{/g;
    let mm;
    while ((mm = msgRe.exec(text))) {
      const name = mm[1];
      const start = mm.index + mm[0].length;
      let depth = 1;
      let i = start;
      while (i < text.length && depth > 0) {
        if (text[i] === '{') depth++;
        else if (text[i] === '}') depth--;
        i++;
      }
      const body = text.slice(start, i - 1);
      const comment = collectLeadingComments(text, mm.index);
      const fields = parseFields(body, text, start);
      messages.set(name, { name, comment, fields, file });
    }
  }
  for (const [name, def] of Object.entries(MANUAL_MESSAGES)) {
    messages.set(name, { name, comment: def.comment, fields: def.fields, file: 'manual' });
  }
  return { messages, enums };
}

function parseFields(body, fullText, bodyAbsStart) {
  const fields = [];
  // Remove nested message/enum blocks to avoid matching their fields twice at wrong level
  let cleaned = '';
  let depth = 0;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (ch === '{') {
      depth++;
      cleaned += depth === 1 ? '{' : ' ';
      continue;
    }
    if (ch === '}') {
      cleaned += depth === 1 ? '}' : ' ';
      depth--;
      continue;
    }
    cleaned += depth === 0 ? ch : ' ';
  }

  const fieldRe =
    /(?:^|\n)\s*(repeated\s+)?(?:map<\s*([^,>]+)\s*,\s*([^>]+)\s*>|([\w.]+))\s+(\w+)\s*=\s*(\d+)(\s*\[[^\]]*\])?/g;
  let fm;
  while ((fm = fieldRe.exec(cleaned))) {
    const isRepeated = Boolean(fm[1]);
    const mapKey = fm[2]?.trim();
    const mapVal = fm[3]?.trim();
    const typeRaw = mapKey ? `map<${mapKey},${mapVal}>` : fm[4];
    const name = fm[5];
    const opts = fm[7] || '';
    const jsonNameMatch = opts.match(/json_name\s*=\s*"([^"]+)"/);
    const jsonName = jsonNameMatch ? jsonNameMatch[1] : name;
    const needle = mapKey ? `map<` : `${typeRaw} ${name} =`;
    const rel = body.indexOf(mapKey ? `${name} =` : needle);
    let comment = '';
    if (rel >= 0) {
      comment = collectLeadingComments(fullText, bodyAbsStart + rel);
    }
    fields.push({
      name: jsonName,
      protoName: name,
      typeRaw,
      repeated: isRepeated,
      mapKey,
      mapVal,
      comment,
    });
  }
  return fields;
}

function L(zh, en) {
  return { 'zh-CN': zh, en };
}

function fieldDesc(field, enums) {
  const base = field.comment || field.name;
  const zh = base;
  let en = base;
  const typeName = field.mapVal || field.typeRaw;
  if (enums.has(typeName)) {
    const vals = enums.get(typeName).join(' | ');
    return L(`${zh} 枚举：${vals}`, `${en} enum: ${vals}`);
  }
  return L(zh, en);
}

function scalarType(typeRaw) {
  const t = typeRaw.replace(/^google\.protobuf\./, '');
  const map = {
    string: 'string',
    bool: 'bool',
    bytes: 'bytes',
    double: 'number',
    float: 'number',
    int32: 'int32',
    int64: 'int64',
    uint32: 'uint32',
    uint64: 'uint64',
    sint32: 'int32',
    sint64: 'int64',
    fixed32: 'uint32',
    fixed64: 'uint64',
    sfixed32: 'int32',
    sfixed64: 'int64',
    Duration: 'duration',
    Timestamp: 'timestamp',
    Any: 'any',
  };
  return map[t] || typeRaw;
}

function expandMessage(messages, enums, messageName, opts = {}) {
  const {
    location = 'body',
    depth = 0,
    maxDepth = 6,
    stack = [],
    skip = REQUEST_SKIP,
    requiredNames = new Set(),
  } = opts;
  if (!messages.has(messageName) || depth > maxDepth || stack.includes(messageName)) {
    return [];
  }
  const msg = messages.get(messageName);
  const nextStack = [...stack, messageName];
  const params = [];

  for (const field of msg.fields) {
    if (skip.has(field.name) || skip.has(field.protoName)) continue;

    let mapKey = field.mapKey;
    let mapVal = field.mapVal;
    if (!mapKey && /^map</.test(field.typeRaw || '')) {
      const m = field.typeRaw.match(/^map<\s*([^,>]+)\s*,\s*([^>]+)\s*>$/);
      if (m) {
        mapKey = m[1].trim();
        mapVal = m[2].trim();
      }
    }
    if (mapKey) {
      const valType = mapVal;
      const children =
        messages.has(valType) && !['string', 'bool', 'int32', 'uint32', 'int64', 'uint64'].includes(valType)
          ? expandMessage(messages, enums, valType, {
              ...opts,
              depth: depth + 1,
              stack: nextStack,
            })
          : undefined;
      params.push({
        name: field.name,
        type: `map<${mapKey.trim()},${valType.trim()}>`,
        location,
        required: requiredNames.has(field.name),
        description: fieldDesc(field, enums),
        ...(children?.length ? { children } : {}),
      });
      continue;
    }

    if (ANY_EXPANSIONS[field.name] || field.typeRaw === 'google.protobuf.Any') {
      const expansions = ANY_EXPANSIONS[field.name] || [];
      const children = expansions.map((ex) => ({
        name: ex.when,
        type: ex.message,
        location,
        required: false,
        description: L(ex.zh, ex.en),
        children: expandMessage(messages, enums, ex.message, {
          ...opts,
          depth: depth + 1,
          stack: nextStack,
        }),
      }));
      params.push({
        name: field.name,
        type: 'any',
        location,
        required: requiredNames.has(field.name),
        description: L(
          `${field.comment || field.name}（google.protobuf.Any，按策略 unpack）。`,
          `${field.comment || field.name} (google.protobuf.Any; unpack by policy).`,
        ),
        children,
      });
      continue;
    }

    if (field.repeated) {
      const item = field.typeRaw;
      if (messages.has(item)) {
        params.push({
          name: field.name,
          type: `${item}[]`,
          location,
          required: requiredNames.has(field.name),
          description: fieldDesc(field, enums),
          itemType: item,
          children: expandMessage(messages, enums, item, {
            ...opts,
            depth: depth + 1,
            stack: nextStack,
          }),
        });
      } else {
        params.push({
          name: field.name,
          type: `${scalarType(item)}[]`,
          location,
          required: requiredNames.has(field.name),
          description: fieldDesc(field, enums),
        });
      }
      continue;
    }

    if (messages.has(field.typeRaw)) {
      params.push({
        name: field.name,
        type: field.typeRaw,
        location,
        required: requiredNames.has(field.name),
        description: fieldDesc(field, enums),
        children: expandMessage(messages, enums, field.typeRaw, {
          ...opts,
          depth: depth + 1,
          stack: nextStack,
        }),
      });
      continue;
    }

    if (enums.has(field.typeRaw)) {
      params.push({
        name: field.name,
        type: `enum(${field.typeRaw})`,
        location,
        required: requiredNames.has(field.name),
        description: fieldDesc(field, enums),
      });
      continue;
    }

    params.push({
      name: field.name,
      type: scalarType(field.typeRaw),
      location,
      required: requiredNames.has(field.name),
      description: fieldDesc(field, enums),
    });
  }
  return params;
}

function authParam() {
  return {
    name: 'Authorization',
    type: 'string',
    location: 'header',
    required: true,
    description: L('登录返回的 token。', 'Token from login.'),
  };
}

function arrayNote(messageName) {
  return {
    name: '(body)',
    type: `${messageName}[]`,
    location: 'body',
    required: true,
    description: L(
      `请求体为 ${messageName} 的 JSON 数组：[{...}, ...]。下列字段为数组中单条对象的完整字段（含嵌套）。`,
      `Request body is a JSON array of ${messageName}: [{...}, ...]. Fields below are the full per-item schema (including nested).`,
    ),
  };
}

const HEADER = `export type ApiLocale = 'zh-CN' | 'en';

export type ApiParam = {
  name: string;
  type: string;
  required?: boolean;
  location: 'path' | 'query' | 'header' | 'body';
  description: Record<ApiLocale, string>;
  /** Nested fields for object / array-item / map-value schemas. */
  children?: ApiParam[];
  /** When type is Message[], the item message name. */
  itemType?: string;
};

export type ApiCodeSample = {
  lang: 'curl' | 'javascript' | 'go' | 'python';
  label: string;
  code: string;
};

export type ApiEndpointDef = {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  title: Record<ApiLocale, string>;
  description: Record<ApiLocale, string>;
  auth?: boolean;
  params: ApiParam[];
  /** Response payload fields when known (protobuf / Enrich Returns). */
  responseFields?: ApiParam[];
  samples: ApiCodeSample[];
  responseExample: string;
  responseLabel: Record<ApiLocale, string>;
};

export type ApiSectionDef = {
  id: string;
  title: Record<ApiLocale, string>;
  description: Record<ApiLocale, string>;
  endpoints: ApiEndpointDef[];
};

/** Parameter and path catalog aligned with pole-control-plane httpserver + specification protos. */
export const httpOpenApiSections: Record<string, ApiSectionDef> = `;

const FOOTER = `;

export function getHttpOpenApiSection(sectionId: string): ApiSectionDef | undefined {
  return httpOpenApiSections[sectionId];
}
`;

async function main() {
  const files = walkProtoFiles(SPEC);
  const { messages, enums } = parseProtos(files);
  console.log('messages', messages.size, 'enums', enums.size);

  // sanity
  for (const need of ['RateLimit', 'RouteRule', 'Instance', 'ConfigFile', 'CircuitBreakerRule', 'MCPServer']) {
    if (!messages.has(need)) console.warn('missing message', need);
  }

  const mod = await import(pathToFileURL(OUT).href + '?t=' + Date.now());
  const sections = structuredClone(mod.httpOpenApiSections);

  let expanded = 0;
  let missing = [];
  for (const sec of Object.values(sections)) {
    for (const ep of sec.endpoints) {
      const msgName = BODY_MESSAGE[ep.id];
      const headers = ep.params.filter((p) => p.location === 'header');
      const queries = ep.params.filter((p) => p.location === 'query' || p.location === 'path');

      if (!msgName || !messages.has(msgName)) {
        if (msgName) missing.push(ep.id + '->' + msgName);
      } else {
        const isArrayBody = !['login'].includes(ep.id);
        const bodyFields = expandMessage(messages, enums, msgName, {
          location: 'body',
          requiredNames: new Set(),
        });

        for (const f of bodyFields) {
          if (ep.id.includes('create') || ep.id.includes('publish') || ep.id === 'login') {
            if (['name', 'namespace', 'host', 'password'].includes(f.name)) f.required = true;
          }
        }

        const bodyIntro = isArrayBody ? [arrayNote(msgName)] : [];
        const headers = ep.params.filter((p) => p.location === 'header');
        const queries = ep.params.filter((p) => p.location === 'query' || p.location === 'path');
        ep.params = [
          ...(headers.length ? headers : ep.auth === false ? [] : [authParam()]),
          ...queries,
          ...bodyIntro,
          ...bodyFields,
        ];

        ep.responseFields = [
          {
            name: 'code',
            type: 'uint32',
            location: 'body',
            required: true,
            description: L('业务码，成功多为 200000。', 'Business code; success is usually 200000.'),
          },
          {
            name: 'info',
            type: 'string',
            location: 'body',
            required: false,
            description: L('提示信息。', 'Info message.'),
          },
          {
            name: msgName.charAt(0).toLowerCase() + msgName.slice(1),
            type: msgName,
            location: 'body',
            required: false,
            description: L(
              `返回中的 ${msgName} 实体字段（批量接口在 responses[] 内）。`,
              `${msgName} entity fields (batch APIs nest under responses[]).`,
            ),
            children: expandMessage(messages, enums, msgName, {
              location: 'body',
              skip: new Set(),
              maxDepth: 5,
            }),
          },
        ];
        expanded++;
      }

      const qMsg = QUERY_MESSAGE[ep.id];
      if (qMsg && messages.has(qMsg)) {
        const headers = ep.params.filter((p) => p.location === 'header');
        const body = ep.params.filter((p) => p.location === 'body');
        const queryFields = expandMessage(messages, enums, qMsg, {
          location: 'query',
          skip: new Set(),
          maxDepth: 2,
        });
        ep.params = [
          ...(headers.length ? headers : ep.auth === false ? [] : [authParam()]),
          ...queryFields,
          ...body,
        ];
      } else {
        // keep existing query params when no mapping
      }
    }
  }

  // Enrich A2A if message exists under different name
  if (!messages.has('A2AAgent')) {
    const alt = [...messages.keys()].find((k) => /A2A|AgentCard/i.test(k));
    if (alt) console.log('A2A alt message', alt);
  }

  fs.writeFileSync(OUT, HEADER + JSON.stringify(sections, null, 2) + FOOTER);
  console.log('wrote', OUT);
  console.log('expanded endpoints', expanded, 'missing', missing);

  // stats
  let nestedLeaves = 0;
  function count(ps) {
    for (const p of ps || []) {
      nestedLeaves++;
      count(p.children);
    }
  }
  for (const sec of Object.values(sections)) for (const ep of sec.endpoints) count(ep.params);
  console.log('total param nodes', nestedLeaves);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
