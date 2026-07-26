export type ApiLocale = 'zh-CN' | 'en';

export type ApiParam = {
  name: string;
  type: string;
  required?: boolean;
  location: 'path' | 'query' | 'header' | 'body';
  description: Record<ApiLocale, string>;
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

const base = 'http://127.0.0.1:8090';

const authHeaders: ApiParam[] = [
  {
    name: 'Authorization',
    type: 'string',
    required: true,
    location: 'header',
    description: { 'zh-CN': '登录返回的 token。', en: 'Token from login.' },
  },
  {
    name: 'X-Pole-User',
    type: 'string',
    required: true,
    location: 'header',
    description: { 'zh-CN': '登录返回的 user_id。', en: 'user_id from login.' },
  },
];

function curlGet(path: string, auth = true): string {
  const headers = auth
    ? ` \\\n  -H "Authorization: $TOKEN" \\\n  -H "X-Pole-User: $USER_ID"`
    : '';
  return `curl -sS '${base}${path}'${headers}`;
}

function curlPost(path: string, body: string, auth = true): string {
  const headers = auth
    ? ` \\\n  -H "Authorization: $TOKEN" \\\n  -H "X-Pole-User: $USER_ID"`
    : '';
  return `curl -sS -X POST '${base}${path}'${headers} \\\n  -H 'Content-Type: application/json' \\\n  -d '${body}'`;
}

function samplesGet(path: string, auth = true): ApiCodeSample[] {
  return [
    { lang: 'curl', label: 'cURL', code: curlGet(path, auth) },
    {
      lang: 'javascript',
      label: 'JavaScript',
      code: auth
        ? `const res = await fetch('${base}${path}', {\n  headers: { Authorization: token, 'X-Pole-User': userId },\n});\nconst data = await res.json();`
        : `const data = await fetch('${base}${path}').then((r) => r.json());`,
    },
    {
      lang: 'go',
      label: 'Go',
      code: auth
        ? `req, _ := http.NewRequest(http.MethodGet, "${base}${path}", nil)\nreq.Header.Set("Authorization", token)\nreq.Header.Set("X-Pole-User", userID)\nresp, err := http.DefaultClient.Do(req)`
        : `resp, err := http.Get("${base}${path}")`,
    },
    {
      lang: 'python',
      label: 'Python',
      code: auth
        ? `import requests\ndata = requests.get("${base}${path}", headers={"Authorization": token, "X-Pole-User": user_id}).json()`
        : `import requests\ndata = requests.get("${base}${path}").json()`,
    },
  ];
}

function samplesPost(path: string, body: string, auth = true): ApiCodeSample[] {
  return [
    { lang: 'curl', label: 'cURL', code: curlPost(path, body, auth) },
    {
      lang: 'javascript',
      label: 'JavaScript',
      code: auth
        ? `await fetch('${base}${path}', {\n  method: 'POST',\n  headers: {\n    Authorization: token,\n    'X-Pole-User': userId,\n    'Content-Type': 'application/json',\n  },\n  body: JSON.stringify(${body}),\n});`
        : `await fetch('${base}${path}', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify(${body}),\n});`,
    },
    {
      lang: 'go',
      label: 'Go',
      code: auth
        ? `body := strings.NewReader(\`${body}\`)\nreq, _ := http.NewRequest(http.MethodPost, "${base}${path}", body)\nreq.Header.Set("Authorization", token)\nreq.Header.Set("X-Pole-User", userID)\nreq.Header.Set("Content-Type", "application/json")\nresp, err := http.DefaultClient.Do(req)`
        : `body := strings.NewReader(\`${body}\`)\nreq, _ := http.NewRequest(http.MethodPost, "${base}${path}", body)\nreq.Header.Set("Content-Type", "application/json")\nresp, err := http.DefaultClient.Do(req)`,
    },
    {
      lang: 'python',
      label: 'Python',
      code: auth
        ? `import requests\nrequests.post("${base}${path}", json=${body}, headers={"Authorization": token, "X-Pole-User": user_id})`
        : `import requests\nrequests.post("${base}${path}", json=${body})`,
    },
  ];
}

function okResponse(extra = '"amount": 1'): string {
  return `{\n  "code": 200000,\n  "info": "execute success",\n  ${extra}\n}`;
}

function governanceSection(
  id: string,
  titleZh: string,
  titleEn: string,
  listPath: string,
  createPath: string,
  releasePath: string,
  createBody: string,
): ApiSectionDef {
  return {
    id,
    title: { 'zh-CN': titleZh, en: titleEn },
    description: {
      'zh-CN': `${titleZh}的查询、创建与发布。写入后通过 releases 发布为 active。`,
      en: `Query, create, and publish ${titleEn.toLowerCase()}. Publish via releases to make rules active.`,
    },
    endpoints: [
      {
        id: `${id}-list`,
        method: 'GET',
        path: listPath,
        title: { 'zh-CN': `查询${titleZh}`, en: `List ${titleEn.toLowerCase()}` },
        description: {
          'zh-CN': `分页查询${titleZh}。`,
          en: `Paginated list of ${titleEn.toLowerCase()}.`,
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'namespace',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '按命名空间过滤。', en: 'Filter by namespace.' },
          },
          {
            name: 'limit',
            type: 'integer',
            location: 'query',
            description: { 'zh-CN': '分页大小。', en: 'Page size.' },
          },
        ],
        samples: samplesGet(`${listPath}?limit=20`),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse('"data": [{ "id": "...", "name": "demo", "enable": true }]'),
      },
      {
        id: `${id}-create`,
        method: 'POST',
        path: createPath,
        title: { 'zh-CN': `创建${titleZh}`, en: `Create ${titleEn.toLowerCase()}` },
        description: {
          'zh-CN': `创建${titleZh}草稿/规则资源。`,
          en: `Create ${titleEn.toLowerCase()} resources.`,
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'body',
            type: 'object | array',
            required: true,
            location: 'body',
            description: {
              'zh-CN': '规则对象；字段以 specification / 控制面注解为准。',
              en: 'Rule object(s); fields follow specification / control-plane annotations.',
            },
          },
        ],
        samples: samplesPost(createPath, createBody),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(),
      },
      {
        id: `${id}-publish`,
        method: 'POST',
        path: releasePath,
        title: { 'zh-CN': `发布${titleZh}`, en: `Publish ${titleEn.toLowerCase()}` },
        description: {
          'zh-CN': `发布 release，使客户端读到 active 视图。`,
          en: 'Publish a release so clients observe the active view.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'body',
            type: 'object | array',
            required: true,
            location: 'body',
            description: {
              'zh-CN': '发布请求，含规则 ID / release 元数据。',
              en: 'Publish request with rule IDs / release metadata.',
            },
          },
        ],
        samples: samplesPost(releasePath, '[{"id":"<rule-id>","release_type":"normal"}]'),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(),
      },
    ],
  };
}

export const httpOpenApiSections: Record<string, ApiSectionDef> = {
  auth: {
    id: 'auth',
    title: { 'zh-CN': '鉴权', en: 'Authentication' },
    description: {
      'zh-CN': '管理面登录与鉴权状态。',
      en: 'Management login and auth status.',
    },
    endpoints: [
      {
        id: 'login',
        method: 'POST',
        path: '/auth/v1/user/login',
        title: { 'zh-CN': '用户登录', en: 'User login' },
        description: {
          'zh-CN': '换取管理面 token；后续请求携带 Authorization 与 X-Pole-User。',
          en: 'Exchange credentials for a management token; later calls send Authorization and X-Pole-User.',
        },
        params: [
          {
            name: 'name',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '用户名。', en: 'Username.' },
          },
          {
            name: 'password',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '密码。', en: 'Password.' },
          },
        ],
        samples: samplesPost('/auth/v1/user/login', '{"name":"admin","password":"Pole@123456"}', false),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(
          '"loginResponse": { "user_id": "xxx", "token": "<token>", "name": "admin" }',
        ),
      },
      {
        id: 'auth-system',
        method: 'GET',
        path: '/auth/v1/system',
        title: { 'zh-CN': '鉴权系统状态', en: 'Auth system status' },
        description: {
          'zh-CN': '查询鉴权是否开启、主用户是否已初始化。',
          en: 'Check whether auth is enabled and the main user exists.',
        },
        params: [],
        samples: samplesGet('/auth/v1/system', false),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse('"option": { "authEnabled": "true", "mainUserExist": "true" }'),
      },
    ],
  },

  namespaces: {
    id: 'namespaces',
    title: { 'zh-CN': '命名空间', en: 'Namespaces' },
    description: {
      'zh-CN': 'Namespace = 运行环境，不是租户。',
      en: 'Namespace means environment, not tenant.',
    },
    endpoints: [
      {
        id: 'list-namespaces',
        method: 'GET',
        path: '/core/v1/namespaces',
        title: { 'zh-CN': '查询命名空间', en: 'List namespaces' },
        description: {
          'zh-CN': '列出命名空间。',
          en: 'List namespaces.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'name',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '按名称过滤。', en: 'Filter by name.' },
          },
          {
            name: 'limit',
            type: 'integer',
            location: 'query',
            description: { 'zh-CN': '分页大小。', en: 'Page size.' },
          },
        ],
        samples: samplesGet('/core/v1/namespaces?limit=20'),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(
          '"namespaces": [{ "name": "default" }, { "name": "pole-system" }]',
        ),
      },
      {
        id: 'create-namespaces',
        method: 'POST',
        path: '/core/v1/namespaces',
        title: { 'zh-CN': '创建命名空间', en: 'Create namespaces' },
        description: {
          'zh-CN': '创建环境命名空间。',
          en: 'Create environment namespaces.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'name',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '命名空间名称。', en: 'Namespace name.' },
          },
          {
            name: 'comment',
            type: 'string',
            location: 'body',
            description: { 'zh-CN': '备注。', en: 'Comment.' },
          },
        ],
        samples: samplesPost('/core/v1/namespaces', '[{"name":"staging","comment":"pre-prod"}]'),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(),
      },
    ],
  },

  services: {
    id: 'services',
    title: { 'zh-CN': '服务基本信息', en: 'Service basics' },
    description: {
      'zh-CN': '服务创建、查询与更新。',
      en: 'Create, query, and update services.',
    },
    endpoints: [
      {
        id: 'list-services',
        method: 'GET',
        path: '/naming/v1/services',
        title: { 'zh-CN': '查询服务', en: 'List services' },
        description: {
          'zh-CN': '按命名空间分页查询服务。',
          en: 'Paginated service list by namespace.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'namespace',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
          {
            name: 'name',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '服务名过滤。', en: 'Service name filter.' },
          },
          {
            name: 'limit',
            type: 'integer',
            location: 'query',
            description: { 'zh-CN': '分页大小。', en: 'Page size.' },
          },
        ],
        samples: samplesGet('/naming/v1/services?namespace=default&limit=20'),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(
          '"services": [{ "name": "payment", "namespace": "default" }]',
        ),
      },
      {
        id: 'create-services',
        method: 'POST',
        path: '/naming/v1/services',
        title: { 'zh-CN': '创建服务', en: 'Create services' },
        description: {
          'zh-CN': '在指定命名空间创建服务。',
          en: 'Create services in a namespace.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'name',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '服务名。', en: 'Service name.' },
          },
          {
            name: 'namespace',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
        ],
        samples: samplesPost(
          '/naming/v1/services',
          '[{"name":"payment","namespace":"default"}]',
        ),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(),
      },
    ],
  },

  'services-contracts': {
    id: 'services-contracts',
    title: { 'zh-CN': '服务契约', en: 'Service contracts' },
    description: {
      'zh-CN': '查询服务契约；客户端可上报 OpenAPI / proto 等契约原文。',
      en: 'Query service contracts; clients may report OpenAPI / proto contract text.',
    },
    endpoints: [
      {
        id: 'list-contracts',
        method: 'GET',
        path: '/naming/v1/service/contracts',
        title: { 'zh-CN': '查询服务契约', en: 'List service contracts' },
        description: {
          'zh-CN': '按服务查询已上报契约。',
          en: 'List reported contracts for a service.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'namespace',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
          {
            name: 'service',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '服务名。', en: 'Service name.' },
          },
        ],
        samples: samplesGet('/naming/v1/service/contracts?namespace=default&service=payment'),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse('"data": [{ "name": "payment", "protocol": "http" }]'),
      },
      {
        id: 'report-contract',
        method: 'POST',
        path: '/v1/ReportServiceContract',
        title: { 'zh-CN': '上报服务契约', en: 'Report service contract' },
        description: {
          'zh-CN': '客户端上报契约（可含 OpenAPI 3.x 原文）。这不是控制面自身 OpenAPI。',
          en: 'Clients report contracts (may include OpenAPI 3.x text). Not the control-plane OpenAPI itself.',
        },
        params: [
          {
            name: 'name',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '服务名。', en: 'Service name.' },
          },
          {
            name: 'namespace',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
          {
            name: 'protocol',
            type: 'string',
            location: 'body',
            description: { 'zh-CN': '协议，如 http / grpc。', en: 'Protocol such as http / grpc.' },
          },
          {
            name: 'content',
            type: 'string',
            location: 'body',
            description: { 'zh-CN': '契约原文。', en: 'Contract payload text.' },
          },
        ],
        samples: samplesPost(
          '/v1/ReportServiceContract',
          '{"name":"payment","namespace":"default","protocol":"http","content":"openapi: 3.0.3"}',
          false,
        ),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(),
      },
    ],
  },

  'services-topology': {
    id: 'services-topology',
    title: { 'zh-CN': '调用拓扑', en: 'Call topology' },
    description: {
      'zh-CN': '通过服务订阅者查看调用关系（谁在消费该服务）。',
      en: 'Inspect call relations via service subscribers (who consumes the service).',
    },
    endpoints: [
      {
        id: 'service-subscribers',
        method: 'GET',
        path: '/v1/subscribers',
        title: { 'zh-CN': '查询服务订阅者', en: 'List service subscribers' },
        description: {
          'zh-CN': '客户端口：列出订阅/发现某服务的客户端，用于调用拓扑。',
          en: 'Client API: list clients that subscribe/discover a service—used for call topology.',
        },
        params: [
          {
            name: 'namespace',
            type: 'string',
            required: true,
            location: 'query',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
          {
            name: 'service',
            type: 'string',
            required: true,
            location: 'query',
            description: { 'zh-CN': '被订阅的服务名。', en: 'Subscribed service name.' },
          },
        ],
        samples: samplesGet('/v1/subscribers?namespace=default&service=payment', false),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(
          '"subscribers": [{ "host": "10.0.0.3", "version": "1.2.0" }]',
        ),
      },
    ],
  },

  instances: {
    id: 'instances',
    title: { 'zh-CN': '实例', en: 'Instances' },
    description: {
      'zh-CN': '服务实例的查询与管理面创建；客户端注册见「客户端接口」。',
      en: 'Query/manage instances; client registration is under Client APIs.',
    },
    endpoints: [
      {
        id: 'list-instances',
        method: 'GET',
        path: '/naming/v1/instances',
        title: { 'zh-CN': '查询实例', en: 'List instances' },
        description: {
          'zh-CN': '按服务查询实例列表。',
          en: 'List instances for a service.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'namespace',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
          {
            name: 'service',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '服务名。', en: 'Service name.' },
          },
          {
            name: 'healthy',
            type: 'boolean',
            location: 'query',
            description: { 'zh-CN': '健康状态过滤。', en: 'Healthy filter.' },
          },
        ],
        samples: samplesGet('/naming/v1/instances?namespace=default&service=payment'),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(
          '"instances": [{ "host": "10.0.0.8", "port": 8080, "healthy": true }]',
        ),
      },
      {
        id: 'create-instances',
        method: 'POST',
        path: '/naming/v1/instances',
        title: { 'zh-CN': '创建实例', en: 'Create instances' },
        description: {
          'zh-CN': '管理面批量创建实例。',
          en: 'Create instances from the management surface.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'service',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '服务名。', en: 'Service name.' },
          },
          {
            name: 'namespace',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
          {
            name: 'host',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '主机。', en: 'Host.' },
          },
          {
            name: 'port',
            type: 'integer',
            required: true,
            location: 'body',
            description: { 'zh-CN': '端口。', en: 'Port.' },
          },
        ],
        samples: samplesPost(
          '/naming/v1/instances',
          '[{"service":"payment","namespace":"default","host":"10.0.0.8","port":8080,"weight":100}]',
        ),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(),
      },
    ],
  },

  'config-groups': {
    id: 'config-groups',
    title: { 'zh-CN': '配置分组', en: 'Config groups' },
    description: {
      'zh-CN': '配置分组是文件的组织单元。',
      en: 'Config groups organize config files.',
    },
    endpoints: [
      {
        id: 'list-groups',
        method: 'GET',
        path: '/config/v1/groups',
        title: { 'zh-CN': '查询配置分组', en: 'List config groups' },
        description: {
          'zh-CN': '按命名空间查询配置分组。',
          en: 'List config groups by namespace.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'namespace',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
        ],
        samples: samplesGet('/config/v1/groups?namespace=default'),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse('"configFileGroups": [{ "name": "docs-multi-gray" }]'),
      },
      {
        id: 'create-groups',
        method: 'POST',
        path: '/config/v1/groups',
        title: { 'zh-CN': '创建配置分组', en: 'Create config groups' },
        description: {
          'zh-CN': '创建配置分组。',
          en: 'Create config groups.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'name',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '分组名。', en: 'Group name.' },
          },
          {
            name: 'namespace',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
        ],
        samples: samplesPost(
          '/config/v1/groups',
          '{"name":"docs-multi-gray","namespace":"default"}',
        ),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(),
      },
    ],
  },

  'config-files': {
    id: 'config-files',
    title: { 'zh-CN': '配置文件', en: 'Config files' },
    description: {
      'zh-CN': '配置文件读写与搜索。发布见「配置灰度」。',
      en: 'Read/write/search config files. Publishing is under Config gray.',
    },
    endpoints: [
      {
        id: 'get-file',
        method: 'GET',
        path: '/config/v1/files/detail',
        title: { 'zh-CN': '读取配置文件', en: 'Get config file' },
        description: {
          'zh-CN': '管理面读取配置文件内容（亦有只读别名 `/config/v1/file`）。',
          en: 'Read a config file from the management surface (read-only alias `/config/v1/file` also exists).',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'namespace',
            type: 'string',
            required: true,
            location: 'query',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
          {
            name: 'group',
            type: 'string',
            required: true,
            location: 'query',
            description: { 'zh-CN': '分组。', en: 'Group.' },
          },
          {
            name: 'fileName',
            type: 'string',
            required: true,
            location: 'query',
            description: { 'zh-CN': '文件名。', en: 'File name.' },
          },
        ],
        samples: samplesGet(
          '/config/v1/files/detail?namespace=default&group=docs-multi-gray&fileName=app.yaml',
        ),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse('"configFile": { "name": "app.yaml", "content": "mode: baseline" }'),
      },
      {
        id: 'create-files',
        method: 'POST',
        path: '/config/v1/files',
        title: { 'zh-CN': '创建配置文件', en: 'Create config files' },
        description: {
          'zh-CN': '创建或写入配置文件草稿内容。',
          en: 'Create or write draft config file content.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'namespace',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
          {
            name: 'group',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '分组。', en: 'Group.' },
          },
          {
            name: 'name',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '文件名。', en: 'File name.' },
          },
          {
            name: 'content',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '文件内容。', en: 'File content.' },
          },
        ],
        samples: samplesPost(
          '/config/v1/files',
          '{"namespace":"default","group":"docs-multi-gray","name":"app.yaml","content":"mode: baseline\\n"}',
        ),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(),
      },
    ],
  },

  'config-gray': {
    id: 'config-gray',
    title: { 'zh-CN': '配置灰度', en: 'Config gray release' },
    description: {
      'zh-CN': '全量（normal）与灰度（gray）发布；多条 active gray 可并存。',
      en: 'Normal and gray publish; multiple active grays can coexist.',
    },
    endpoints: [
      {
        id: 'publish-config',
        method: 'POST',
        path: '/config/v1/files/release',
        title: { 'zh-CN': '发布配置', en: 'Publish config' },
        description: {
          'zh-CN': 'release_type 为 normal 或 gray；gray 需 beta_labels。',
          en: 'release_type is normal or gray; gray needs beta_labels.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'namespace',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
          {
            name: 'group',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '分组。', en: 'Group.' },
          },
          {
            name: 'file_name',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '文件名。', en: 'File name.' },
          },
          {
            name: 'release_type',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '`normal` 或 `gray`。', en: '`normal` or `gray`.' },
          },
          {
            name: 'beta_labels',
            type: 'array',
            location: 'body',
            description: {
              'zh-CN': '灰度标签匹配；gray 时使用。',
              en: 'Gray label matchers; used for gray releases.',
            },
          },
        ],
        samples: samplesPost(
          '/config/v1/files/release',
          '{"namespace":"default","group":"docs-multi-gray","file_name":"app.yaml","name":"gray-env-a","release_type":"gray","beta_labels":[{"key":"env","value":{"type":0,"value":"gray-a","value_type":0}}]}',
        ),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(),
      },
      {
        id: 'list-releases',
        method: 'GET',
        path: '/config/v1/files/releases',
        title: { 'zh-CN': '查询发布记录', en: 'List config releases' },
        description: {
          'zh-CN': '查看全量与灰度发布列表。',
          en: 'List normal and gray releases.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'namespace',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
          {
            name: 'group',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '分组。', en: 'Group.' },
          },
          {
            name: 'file_name',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '文件名。', en: 'File name.' },
          },
        ],
        samples: samplesGet(
          '/config/v1/files/releases?namespace=default&group=docs-multi-gray&file_name=app.yaml',
        ),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(
          '"data": [{ "name": "gray-env-a", "release_type": "gray", "active": true }]',
        ),
      },
      {
        id: 'stop-gray',
        method: 'POST',
        path: '/config/v1/files/releases/stopbeta',
        title: { 'zh-CN': '停止灰度', en: 'Stop gray release' },
        description: {
          'zh-CN': '按版本停止某条灰度，不影响其它 active gray。',
          en: 'Stop one gray release by version without affecting other active grays.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'body',
            type: 'object | array',
            required: true,
            location: 'body',
            description: {
              'zh-CN': '要停止的灰度 release 标识。',
              en: 'Identifiers of gray releases to stop.',
            },
          },
        ],
        samples: samplesPost(
          '/config/v1/files/releases/stopbeta',
          '[{"namespace":"default","group":"docs-multi-gray","file_name":"app.yaml","name":"gray-env-a"}]',
        ),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(),
      },
    ],
  },

  routing: governanceSection(
    'routing',
    '路由',
    'Routing',
    '/naming/v1/routings',
    '/naming/v1/routings',
    '/naming/v1/routings/releases',
    '[{"name":"demo-route","enable":true}]',
  ),
  'rate-limit': governanceSection(
    'rate-limit',
    '限流',
    'Rate limit',
    '/naming/v1/ratelimits',
    '/naming/v1/ratelimits',
    '/naming/v1/ratelimits/releases',
    '[{"name":"demo-limit","enable":true}]',
  ),
  'circuit-breaker': governanceSection(
    'circuit-breaker',
    '熔断',
    'Circuit breaker',
    '/naming/v1/circuitbreakers',
    '/naming/v1/circuitbreakers',
    '/naming/v1/circuitbreakers/releases',
    '[{"name":"demo-cb","enable":true}]',
  ),
  'fault-detect': governanceSection(
    'fault-detect',
    '故障探测',
    'Fault detect',
    '/naming/v1/faultdetectors',
    '/naming/v1/faultdetectors',
    '/naming/v1/faultdetectors/releases',
    '[{"name":"demo-fd","enable":true}]',
  ),
  lane: governanceSection(
    'lane',
    '泳道',
    'Lane',
    '/naming/v1/lane/groups',
    '/naming/v1/lane/groups',
    '/naming/v1/lane/groups/releases',
    '[{"name":"demo-lane","enable":true}]',
  ),
  lossless: governanceSection(
    'lossless',
    '无损上下线',
    'Lossless',
    '/naming/v1/lossless',
    '/naming/v1/lossless',
    '/naming/v1/lossless/releases',
    '[{"name":"demo-lossless","enable":true}]',
  ),
  'traffic-security': governanceSection(
    'traffic-security',
    '流量鉴权',
    'Traffic security',
    '/naming/v1/traffic/security',
    '/naming/v1/traffic/security',
    '/naming/v1/traffic/security/releases',
    '[{"name":"demo-security","enable":true}]',
  ),
  'traffic-mirror': governanceSection(
    'traffic-mirror',
    '流量镜像',
    'Traffic mirror',
    '/naming/v1/traffic/mirrors',
    '/naming/v1/traffic/mirrors',
    '/naming/v1/traffic/mirrors/releases',
    '[{"name":"demo-mirror","enable":true}]',
  ),
  'traffic-mock': governanceSection(
    'traffic-mock',
    '流量 Mock',
    'Traffic mock',
    '/naming/v1/traffic/mocks',
    '/naming/v1/traffic/mocks',
    '/naming/v1/traffic/mocks/releases',
    '[{"name":"demo-mock","enable":true}]',
  ),

  mcp: {
    id: 'mcp',
    title: { 'zh-CN': 'MCP Registry', en: 'MCP Registry' },
    description: {
      'zh-CN': 'MCP Server / Tool 注册发现元数据，不是执行引擎。',
      en: 'MCP Server / Tool registry metadata—not an execution engine.',
    },
    endpoints: [
      {
        id: 'list-mcp',
        method: 'GET',
        path: '/ai/mcp/v1/servers',
        title: { 'zh-CN': '列出 MCP Server', en: 'List MCP servers' },
        description: {
          'zh-CN': '查询 MCP Server 列表。',
          en: 'List MCP servers.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'namespace',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
        ],
        samples: samplesGet('/ai/mcp/v1/servers?namespace=default'),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse('"servers": [{ "name": "docs-mcp", "namespace": "default" }]'),
      },
      {
        id: 'list-mcp-tools',
        method: 'GET',
        path: '/ai/mcp/v1/server/tools',
        title: { 'zh-CN': '列出 MCP Tool', en: 'List MCP tools' },
        description: {
          'zh-CN': '查询某 MCP Server 下的 Tool。',
          en: 'List tools under an MCP server.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'server_id',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': 'MCP Server ID。', en: 'MCP Server ID.' },
          },
        ],
        samples: samplesGet('/ai/mcp/v1/server/tools?server_id=<id>'),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse('"tools": [{ "name": "search_docs" }]'),
      },
    ],
  },

  a2a: {
    id: 'a2a',
    title: { 'zh-CN': 'A2A Registry', en: 'A2A Registry' },
    description: {
      'zh-CN': 'A2A Agent / Skill 注册发现；控制面不提供数据面代理。',
      en: 'A2A Agent / Skill registry; control plane does not proxy the data plane.',
    },
    endpoints: [
      {
        id: 'list-a2a',
        method: 'GET',
        path: '/ai/a2a/v1/agents',
        title: { 'zh-CN': '列出 A2A Agent', en: 'List A2A agents' },
        description: {
          'zh-CN': '查询 Agent Registry。',
          en: 'List agents from the registry.',
        },
        auth: true,
        params: [...authHeaders],
        samples: samplesGet('/ai/a2a/v1/agents'),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse('"agents": [{ "name": "support-agent" }]'),
      },
      {
        id: 'agent-card',
        method: 'GET',
        path: '/ai/a2a/v1/agents/{id}/card',
        title: { 'zh-CN': '获取 Agent Card', en: 'Get Agent Card' },
        description: {
          'zh-CN': '读取 Agent Card 元数据。',
          en: 'Read Agent Card metadata.',
        },
        auth: true,
        params: [
          ...authHeaders,
          {
            name: 'id',
            type: 'string',
            required: true,
            location: 'path',
            description: { 'zh-CN': 'Agent ID。', en: 'Agent ID.' },
          },
        ],
        samples: samplesGet('/ai/a2a/v1/agents/<id>/card'),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse('"card": { "name": "support-agent", "url": "https://..." }'),
      },
    ],
  },

  client: {
    id: 'client',
    title: { 'zh-CN': '客户端接口', en: 'Client APIs' },
    description: {
      'zh-CN': 'Discover / Register / Heartbeat 与客户端拉配置；生产更推荐 gRPC。',
      en: 'Discover / Register / Heartbeat and client config pull; prefer gRPC in production.',
    },
    endpoints: [
      {
        id: 'discover',
        method: 'POST',
        path: '/v1/Discover',
        title: { 'zh-CN': 'Discover', en: 'Discover' },
        description: {
          'zh-CN': '客户端口：拉取实例或治理视图。',
          en: 'Client API: pull instance or governance views.',
        },
        params: [
          {
            name: 'type',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '发现类型，如 INSTANCE。', en: 'Discover type, e.g. INSTANCE.' },
          },
          {
            name: 'service',
            type: 'object',
            required: true,
            location: 'body',
            description: { 'zh-CN': '含 name / namespace。', en: 'Includes name / namespace.' },
          },
        ],
        samples: samplesPost(
          '/v1/Discover',
          '{"type":"INSTANCE","service":{"name":"payment","namespace":"default"}}',
          false,
        ),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(
          '"instances": [{ "host": "10.0.0.8", "port": 8080, "healthy": true }]',
        ),
      },
      {
        id: 'register',
        method: 'POST',
        path: '/v1/RegisterInstance',
        title: { 'zh-CN': '注册实例', en: 'Register instance' },
        description: {
          'zh-CN': '客户端口：注册实例。',
          en: 'Client API: register an instance.',
        },
        params: [
          {
            name: 'service',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '服务名。', en: 'Service name.' },
          },
          {
            name: 'namespace',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
          {
            name: 'host',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '主机。', en: 'Host.' },
          },
          {
            name: 'port',
            type: 'integer',
            required: true,
            location: 'body',
            description: { 'zh-CN': '端口。', en: 'Port.' },
          },
        ],
        samples: samplesPost(
          '/v1/RegisterInstance',
          '{"service":"payment","namespace":"default","host":"10.0.0.8","port":8080,"weight":100}',
          false,
        ),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse('"instance": { "id": "..." }'),
      },
      {
        id: 'get-config-client',
        method: 'GET',
        path: '/v1/GetConfigFile',
        title: { 'zh-CN': '客户端拉配置', en: 'Client get config file' },
        description: {
          'zh-CN': 'tags 为 key=value，可重复；未命中灰度回落全量。',
          en: 'tags are key=value and repeatable; unmatched clients fall back to normal.',
        },
        params: [
          {
            name: 'namespace',
            type: 'string',
            required: true,
            location: 'query',
            description: { 'zh-CN': '命名空间。', en: 'Namespace.' },
          },
          {
            name: 'group',
            type: 'string',
            required: true,
            location: 'query',
            description: { 'zh-CN': '分组。', en: 'Group.' },
          },
          {
            name: 'fileName',
            type: 'string',
            required: true,
            location: 'query',
            description: { 'zh-CN': '文件名。', en: 'File name.' },
          },
          {
            name: 'tags',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '客户端标签，如 env=gray-a。', en: 'Client tags such as env=gray-a.' },
          },
        ],
        samples: samplesGet(
          '/v1/GetConfigFile?namespace=default&group=docs-multi-gray&fileName=app.yaml&tags=env%3Dgray-a',
          false,
        ),
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: okResponse(
          '"file": { "name": "app.yaml", "release_type": "gray", "content": "mode: gray-a\\n" }',
        ),
      },
    ],
  },
};

export function getHttpOpenApiSection(sectionId: string): ApiSectionDef | undefined {
  return httpOpenApiSections[sectionId];
}
