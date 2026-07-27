#!/usr/bin/env node
/**
 * Merge all missing control-plane HTTP routes into http-openapi-reference.ts,
 * expand body/query trees from protos, and ensure every console/client/admin route is documented.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = path.resolve(import.meta.dirname, '..');
const SPEC = path.resolve(ROOT, '../specification/api/v1');
const OUT = path.join(ROOT, 'src/lib/http-openapi-reference.ts');

const L = (zh, en) => ({ 'zh-CN': zh, en });

const REQUEST_SKIP = new Set([
  'ctime', 'mtime', 'etime', 'rtime', 'editable', 'deleteable',
  'total_service_count', 'total_health_instance_count', 'total_instance_count',
  'total_config_file_count', 'healthy_instance_count', 'file_count', 'fileCount',
  'md5', 'create_by', 'modify_by', 'active', 'status', 'revision', 'flag',
]);

/** New + gap endpoints to ensure exist. Existing ones with same id are left alone unless force. */
const ADDITIONS = [
  // auth-users (move list into this section conceptually — we also keep list on auth if present; add CRUD here)
  { section: 'auth-users', id: 'list-users', method: 'GET', path: '/auth/v1/users', title: L('查询用户', 'List users'), auth: true, queries: [['id','string'],['name','string'],['offset','integer'],['limit','integer']], body: null },
  { section: 'auth-users', id: 'create-users', method: 'POST', path: '/auth/v1/users', title: L('创建用户', 'Create users'), auth: true, body: 'User', array: true },
  { section: 'auth-users', id: 'update-users', method: 'PUT', path: '/auth/v1/users', title: L('更新用户', 'Update users'), auth: true, body: 'User', array: true },
  { section: 'auth-users', id: 'delete-users', method: 'POST', path: '/auth/v1/users/delete', title: L('删除用户', 'Delete users'), auth: true, body: 'User', array: true },
  { section: 'auth-users', id: 'update-password', method: 'PUT', path: '/auth/v1/user/password', title: L('修改密码', 'Change password'), auth: true, body: 'ModifyUserPassword', array: false },
  { section: 'auth-users', id: 'get-user-token', method: 'GET', path: '/auth/v1/user/token', title: L('获取用户 Token', 'Get user token'), auth: true, queries: [['id','string',true]], body: null },
  { section: 'auth-users', id: 'enable-user-token', method: 'PUT', path: '/auth/v1/user/token/enable', title: L('启用/禁用用户 Token', 'Enable/disable user token'), auth: true, body: 'User', array: false },
  { section: 'auth-users', id: 'refresh-user-token', method: 'PUT', path: '/auth/v1/user/token/refresh', title: L('刷新用户 Token', 'Refresh user token'), auth: true, body: 'User', array: false },

  // auth-groups
  { section: 'auth-groups', id: 'list-groups', method: 'GET', path: '/auth/v1/usergroups', title: L('查询用户组', 'List user groups'), auth: true, queries: [['id','string'],['name','string'],['user_id','string'],['offset','integer'],['limit','integer']], body: null },
  { section: 'auth-groups', id: 'create-groups', method: 'POST', path: '/auth/v1/usergroups', title: L('创建用户组', 'Create user groups'), auth: true, body: 'UserGroup', array: true },
  { section: 'auth-groups', id: 'update-groups', method: 'PUT', path: '/auth/v1/usergroups', title: L('更新用户组', 'Update user groups'), auth: true, body: 'UserGroup', array: true },
  { section: 'auth-groups', id: 'delete-groups', method: 'POST', path: '/auth/v1/usergroups/delete', title: L('删除用户组', 'Delete user groups'), auth: true, body: 'UserGroup', array: true },
  { section: 'auth-groups', id: 'group-detail', method: 'GET', path: '/auth/v1/usergroup/detail', title: L('用户组详情', 'User group detail'), auth: true, queries: [['id','string',true]], body: null },
  { section: 'auth-groups', id: 'get-group-token', method: 'GET', path: '/auth/v1/usergroup/token', title: L('获取用户组 Token', 'Get user group token'), auth: true, queries: [['id','string',true]], body: null },
  { section: 'auth-groups', id: 'enable-group-token', method: 'PUT', path: '/auth/v1/usergroup/token/enable', title: L('启用/禁用用户组 Token', 'Enable/disable group token'), auth: true, body: 'UserGroup', array: false },
  { section: 'auth-groups', id: 'refresh-group-token', method: 'PUT', path: '/auth/v1/usergroup/token/refresh', title: L('刷新用户组 Token', 'Refresh group token'), auth: true, body: 'UserGroup', array: false },

  // auth-roles
  { section: 'auth-roles', id: 'list-roles', method: 'GET', path: '/auth/v1/roles', title: L('查询角色', 'List roles'), auth: true, queries: [['id','string'],['name','string'],['offset','integer'],['limit','integer']], body: null },
  { section: 'auth-roles', id: 'create-roles', method: 'POST', path: '/auth/v1/roles', title: L('创建角色', 'Create roles'), auth: true, body: 'Role', array: true },
  { section: 'auth-roles', id: 'update-roles', method: 'PUT', path: '/auth/v1/roles', title: L('更新角色', 'Update roles'), auth: true, body: 'Role', array: true },
  { section: 'auth-roles', id: 'delete-roles', method: 'POST', path: '/auth/v1/roles/delete', title: L('删除角色', 'Delete roles'), auth: true, body: 'Role', array: true },

  // auth-policies
  { section: 'auth-policies', id: 'list-policies', method: 'GET', path: '/auth/v1/policies', title: L('查询策略', 'List policies'), auth: true, queries: [['id','string'],['name','string'],['default','string'],['res_id','string'],['res_type','string'],['principal_id','string'],['principal_type','string'],['show_detail','string'],['offset','integer'],['limit','integer']], body: null },
  { section: 'auth-policies', id: 'create-policies', method: 'POST', path: '/auth/v1/policies', title: L('创建策略', 'Create policies'), auth: true, body: 'AuthStrategy', array: true },
  { section: 'auth-policies', id: 'update-policies', method: 'PUT', path: '/auth/v1/policies', title: L('更新策略', 'Update policies'), auth: true, body: 'AuthStrategy', array: true },
  { section: 'auth-policies', id: 'delete-policies', method: 'POST', path: '/auth/v1/policies/delete', title: L('删除策略', 'Delete policies'), auth: true, body: 'AuthStrategy', array: true },
  { section: 'auth-policies', id: 'policy-detail', method: 'GET', path: '/auth/v1/policies/detail', title: L('策略详情', 'Policy detail'), auth: true, queries: [['id','string',true]], body: null },
  { section: 'auth-policies', id: 'principal-resources', method: 'GET', path: '/auth/v1/principal/resources', title: L('主体关联资源', 'Principal resources'), auth: true, queries: [['principal_id','string',true],['principal_type','string',true]], body: null },
  { section: 'auth-policies', id: 'resources-principals', method: 'GET', path: '/auth/v1/resources/principals', title: L('资源关联主体', 'Resource principals'), auth: true, queries: [['res_id','string'],['res_type','string']], body: null },
  { section: 'auth-policies', id: 'authorize-resources', method: 'POST', path: '/auth/v1/resources/authorize', title: L('资源授权校验', 'Authorize resources'), auth: true, body: 'AuthorizeResources', array: true },

  // admin
  { section: 'admin', id: 'get-conn', method: 'GET', path: '/admin/v1/apiserver/conn', title: L('查询 APIServer 连接', 'List APIServer connections'), auth: true, queries: [['protocol','string'],['host','string']], body: null },
  { section: 'admin', id: 'get-conn-stats', method: 'GET', path: '/admin/v1/apiserver/conn/stats', title: L('连接统计', 'Connection stats'), auth: true, queries: [['protocol','string'],['host','string'],['amount','integer']], body: null },
  { section: 'admin', id: 'close-conn', method: 'POST', path: '/admin/v1/apiserver/conn/close', title: L('关闭连接', 'Close connections'), auth: true, body: 'ConnReq', array: true },
  { section: 'admin', id: 'free-memory', method: 'POST', path: '/admin/v1/memory/free', title: L('释放 OS 内存', 'Free OS memory'), auth: true, body: null },
  { section: 'admin', id: 'clean-instance', method: 'POST', path: '/admin/v1/instance/clean', title: L('清理实例', 'Clean instance'), auth: true, body: 'Instance', array: false },
  { section: 'admin', id: 'batch-clean-instances', method: 'POST', path: '/admin/v1/instance/batchclean', title: L('批量清理实例', 'Batch clean instances'), auth: true, body: null, bodyFields: [['batch_size','uint32',true,'批量大小','Batch size']] },
  { section: 'admin', id: 'last-heartbeat', method: 'GET', path: '/admin/v1/instance/heartbeat', title: L('最近心跳', 'Last heartbeat'), auth: true, queries: [['id','string'],['service','string'],['namespace','string'],['host','string'],['port','integer'],['vpv_id','string']], body: null },
  { section: 'admin', id: 'get-log-level', method: 'GET', path: '/admin/v1/log/outputlevel', title: L('查询日志级别', 'Get log level'), auth: true, body: null },
  { section: 'admin', id: 'set-log-level', method: 'PUT', path: '/admin/v1/log/outputlevel', title: L('设置日志级别', 'Set log level'), auth: true, body: null, bodyFields: [['scope','string',true,'日志 scope','Log scope'],['level','string',true,'级别','Level']] },
  { section: 'admin', id: 'list-leaders', method: 'GET', path: '/admin/v1/leaders', title: L('Leader 选举列表', 'List leader elections'), auth: true, body: null },
  { section: 'admin', id: 'release-leader', method: 'POST', path: '/admin/v1/leaders/release', title: L('释放 Leader', 'Release leader election'), auth: true, body: null, bodyFields: [['electKey','string',true,'选举 key','Election key']] },
  { section: 'admin', id: 'cmdb-info', method: 'GET', path: '/admin/v1/cmdb/info', title: L('CMDB 信息', 'CMDB info'), auth: true, body: null },
  { section: 'admin', id: 'report-clients', method: 'GET', path: '/admin/v1/report/clients', title: L('上报客户端列表', 'Reported clients'), auth: true, body: null },
  { section: 'admin', id: 'enable-pprof', method: 'POST', path: '/admin/v1/pprof/enable', title: L('开关 pprof', 'Enable/disable pprof'), auth: true, body: null, bodyFields: [['enable','bool',true,'是否开启','Enable']] },
  { section: 'admin', id: 'server-functions', method: 'GET', path: '/admin/v1/server/functions', title: L('服务功能列表', 'Server functions'), auth: true, body: null },
  { section: 'admin', id: 'system-configuration', method: 'GET', path: '/admin/v1/system/configuration', title: L('系统配置', 'System configuration'), auth: true, body: null },
  { section: 'admin', id: 'mainuser-exist', method: 'GET', path: '/admin/v1/mainuser/exist', title: L('主账号是否存在', 'Has main user'), auth: true, body: null },
  { section: 'admin', id: 'mainuser-create', method: 'POST', path: '/admin/v1/mainuser/create', title: L('初始化主账号', 'Init main user'), auth: true, body: 'User', array: false },

  // services gaps
  { section: 'services', id: 'list-services-all', method: 'GET', path: '/naming/v1/services/all', title: L('命名空间下全部服务', 'All services in namespace'), auth: true, queries: [['namespace','string',true]], body: null },
  { section: 'services', id: 'services-count', method: 'GET', path: '/naming/v1/services/count', title: L('服务数量', 'Services count'), auth: true, body: null },
  { section: 'services', id: 'update-alias', method: 'PUT', path: '/naming/v1/service/alias', title: L('更新服务别名', 'Update service alias'), auth: true, body: 'ServiceAlias', array: false },
  { section: 'services', id: 'delete-aliases', method: 'POST', path: '/naming/v1/service/aliases/delete', title: L('删除服务别名', 'Delete service aliases'), auth: true, body: 'ServiceAlias', array: true },

  // contracts gaps
  { section: 'services-contracts', id: 'delete-contracts', method: 'POST', path: '/naming/v1/service/contracts/delete', title: L('删除服务契约', 'Delete service contracts'), auth: true, body: 'ServiceContract', array: true },
  { section: 'services-contracts', id: 'create-contract-methods', method: 'POST', path: '/naming/v1/service/contract/methods', title: L('创建契约方法', 'Create contract methods'), auth: true, body: 'ServiceContract', array: false },
  { section: 'services-contracts', id: 'append-contract-methods', method: 'PUT', path: '/naming/v1/service/contract/methods/append', title: L('追加契约方法', 'Append contract methods'), auth: true, body: 'ServiceContract', array: false },
  { section: 'services-contracts', id: 'delete-contract-methods', method: 'POST', path: '/naming/v1/service/contract/methods/delete', title: L('删除契约方法', 'Delete contract methods'), auth: true, body: 'ServiceContract', array: false },

  // instances
  { section: 'instances', id: 'instances-count', method: 'GET', path: '/naming/v1/instances/count', title: L('实例数量', 'Instances count'), auth: true, body: null },

  // governance releases/delete
  ...['routing','rate-limit','circuit-breaker','fault-detect','lossless','traffic-security','traffic-mirror','traffic-mock'].map((sec) => {
    const pathMap = {
      routing: '/naming/v1/routings/releases/delete',
      'rate-limit': '/naming/v1/ratelimits/releases/delete',
      'circuit-breaker': '/naming/v1/circuitbreakers/releases/delete',
      'fault-detect': '/naming/v1/faultdetectors/releases/delete',
      lossless: '/naming/v1/lossless/releases/delete',
      'traffic-security': '/naming/v1/traffic/security/releases/delete',
      'traffic-mirror': '/naming/v1/traffic/mirrors/releases/delete',
      'traffic-mock': '/naming/v1/traffic/mocks/releases/delete',
    };
    return { section: sec, id: `${sec}-release-delete`, method: 'POST', path: pathMap[sec], title: L('删除发布', 'Delete releases'), auth: true, body: 'RuleRelease', array: true };
  }),

  // lane rules
  { section: 'lane', id: 'lane-rules-create', method: 'POST', path: '/naming/v1/lane/groups/rules', title: L('创建泳道规则', 'Create lane rules'), auth: true, body: 'LaneRule', array: true },
  { section: 'lane', id: 'lane-rules-update', method: 'PUT', path: '/naming/v1/lane/groups/rules', title: L('更新泳道规则', 'Update lane rules'), auth: true, body: 'LaneRule', array: true },
  { section: 'lane', id: 'lane-rules-delete', method: 'POST', path: '/naming/v1/lane/groups/rules/delete', title: L('删除泳道规则', 'Delete lane rules'), auth: true, body: 'LaneRule', array: true },
  { section: 'lane', id: 'lane-release-delete', method: 'POST', path: '/naming/v1/lane/groups/releases/delete', title: L('删除泳道发布', 'Delete lane releases'), auth: true, body: 'RuleRelease', array: true },

  // config groups delete (typo path)
  { section: 'config-groups', id: 'delete-groups', method: 'POST', path: '/config/v1/groups/delette', title: L('删除配置分组', 'Delete config groups'), auth: true, body: 'ConfigFileGroup', array: true, note: L('注意：控制面路径为 delette（历史拼写）。', 'Note: control-plane path is delette (historical typo).') },

  // config files extras
  { section: 'config-files', id: 'export-files', method: 'POST', path: '/config/v1/files/export', title: L('导出配置文件', 'Export config files'), auth: true, body: 'ConfigFileExportRequest', array: false },
  { section: 'config-files', id: 'import-files', method: 'POST', path: '/config/v1/files/import', title: L('导入配置文件', 'Import config files'), auth: true, queries: [['namespace','string'],['group','string']], body: null, note: L('multipart/form-data 上传。', 'multipart/form-data upload.') },
  { section: 'config-files', id: 'encrypt-algorithms', method: 'GET', path: '/config/v1/files/encrypt/algorithms', title: L('加密算法列表', 'Encrypt algorithms'), auth: true, body: null },
  { section: 'config-files', id: 'file-subscribers', method: 'GET', path: '/config/v1/files/subscribers', title: L('配置订阅者', 'Config subscribers'), auth: true, queries: [['namespace','string'],['group','string']], body: null },
  { section: 'config-files', id: 'client-subscription', method: 'GET', path: '/config/v1/files/client/subscription', title: L('客户端订阅', 'Client subscription'), auth: true, queries: [['namespace','string'],['group','string']], body: null },
  { section: 'config-files', id: 'get-file-legacy', method: 'GET', path: '/config/v1/file', title: L('读取配置文件（兼容路径）', 'Get config file (legacy path)'), auth: true, queries: [['namespace','string',true],['group','string',true],['name','string',true]], body: null, note: L('default-read 兼容路径，等同 /files/detail。', 'default-read alias of /files/detail.') },
  { section: 'config-files', id: 'encrypt-algorithm-legacy', method: 'GET', path: '/config/v1/files/encryptalgorithm', title: L('加密算法（兼容路径）', 'Encrypt algorithm (legacy)'), auth: true, body: null, note: L('等同 /files/encrypt/algorithms。', 'Alias of /files/encrypt/algorithms.') },

  // config gray extras
  { section: 'config-gray', id: 'get-release', method: 'GET', path: '/config/v1/files/release', title: L('获取当前发布', 'Get current release'), auth: true, queries: [['namespace','string'],['group','string'],['name','string']], body: null },
  { section: 'config-gray', id: 'delete-releases', method: 'POST', path: '/config/v1/files/releases/delete', title: L('删除发布记录', 'Delete releases'), auth: true, body: 'ConfigFileRelease', array: true },
  { section: 'config-gray', id: 'create-and-publish', method: 'POST', path: '/config/v1/files/createandpub', title: L('创建并发布', 'Create and publish'), auth: true, body: 'ConfigFilePublishInfo', array: false },
  { section: 'config-gray', id: 'op-history', method: 'GET', path: '/config/v1/files/op/history', title: L('操作/发布历史', 'Op / release history'), auth: true, queries: [['namespace','string'],['group','string'],['name','string'],['offset','integer'],['limit','integer']], body: null },
  { section: 'config-gray', id: 'release-history-legacy', method: 'GET', path: '/config/v1/files/release/history', title: L('发布历史（兼容路径）', 'Release history (legacy)'), auth: true, queries: [['namespace','string'],['group','string'],['name','string'],['offset','integer'],['limit','integer']], body: null },

  // config templates
  { section: 'config-templates', id: 'list-templates', method: 'GET', path: '/config/v1/templates', title: L('查询配置模板', 'List config templates'), auth: true, body: null },
  { section: 'config-templates', id: 'create-templates', method: 'POST', path: '/config/v1/templates', title: L('创建配置模板', 'Create config templates'), auth: true, body: 'ConfigFileTemplate', array: true },
  { section: 'config-templates', id: 'update-templates', method: 'PUT', path: '/config/v1/templates', title: L('更新配置模板', 'Update config templates'), auth: true, body: 'ConfigFileTemplate', array: true },

  // mcp
  { section: 'mcp', id: 'update-mcp', method: 'PUT', path: '/ai/mcp/v1/servers', title: L('更新 MCP Server', 'Update MCP servers'), auth: true, body: 'MCPServer', array: true },
  { section: 'mcp', id: 'delete-mcp', method: 'POST', path: '/ai/mcp/v1/servers/delete', title: L('删除 MCP Server', 'Delete MCP servers'), auth: true, body: 'MCPServerDeleteRequest', array: false },
  { section: 'mcp', id: 'mcp-probe', method: 'POST', path: '/ai/mcp/v1/self-capabilities/probe', title: L('自研能力探测', 'Self-capabilities probe'), auth: true, body: null, note: L('内部能力探测接口。', 'Internal capability probe.') },
  { section: 'mcp', id: 'mcp-sse-get', method: 'GET', path: '/ai/mcp/v1/sse', title: L('MCP SSE（GET）', 'MCP SSE (GET)'), auth: true, body: null, note: L('MCP 协议传输通道，非 Console CRUD。', 'MCP transport channel, not Console CRUD.') },
  { section: 'mcp', id: 'mcp-sse-post', method: 'POST', path: '/ai/mcp/v1/sse', title: L('MCP SSE（POST）', 'MCP SSE (POST)'), auth: true, body: null, note: L('MCP 协议传输通道。', 'MCP transport channel.') },
  { section: 'mcp', id: 'mcp-message-get', method: 'GET', path: '/ai/mcp/v1/message', title: L('MCP Message（GET）', 'MCP Message (GET)'), auth: true, body: null, note: L('MCP 协议消息通道。', 'MCP message channel.') },
  { section: 'mcp', id: 'mcp-message-post', method: 'POST', path: '/ai/mcp/v1/message', title: L('MCP Message（POST）', 'MCP Message (POST)'), auth: true, body: null, note: L('MCP 协议消息通道。', 'MCP message channel.') },

  // a2a
  { section: 'a2a', id: 'update-a2a', method: 'PUT', path: '/ai/a2a/v1/agents', title: L('更新 A2A Agent', 'Update A2A agents'), auth: true, body: 'A2AAgent', array: true },
  { section: 'a2a', id: 'delete-a2a', method: 'POST', path: '/ai/a2a/v1/agents/delete', title: L('删除 A2A Agent', 'Delete A2A agents'), auth: true, body: 'A2AAgentDeleteRequest', array: false },

  // client
  { section: 'client', id: 'get-config-metadata-list', method: 'POST', path: '/v1/GetConfigFileMetadataList', title: L('拉取配置元数据列表', 'Get config file metadata list'), auth: false, body: 'ConfigClientRequest', array: false },
];

const SECTION_META = {
  auth: { title: L('鉴权 · 登录', 'Auth · Login'), description: L('登录与鉴权系统状态。', 'Login and auth system status.') },
  'auth-users': { title: L('鉴权 · 用户', 'Auth · Users'), description: L('用户 CRUD 与 Token/密码管理。', 'User CRUD and token/password management.') },
  'auth-groups': { title: L('鉴权 · 用户组', 'Auth · Groups'), description: L('用户组 CRUD 与 Token 管理。', 'User-group CRUD and token management.') },
  'auth-roles': { title: L('鉴权 · 角色', 'Auth · Roles'), description: L('角色 CRUD。', 'Role CRUD.') },
  'auth-policies': { title: L('鉴权 · 策略', 'Auth · Policies'), description: L('鉴权策略与资源授权。', 'Auth policies and resource authorization.') },
  admin: { title: L('管理面 Admin', 'Admin APIs'), description: L('运维管理接口：连接、Leader、日志、清理等。', 'Ops APIs: connections, leaders, logs, cleanup, etc.') },
  'config-templates': { title: L('配置模板', 'Config templates'), description: L('配置文件模板管理。', 'Config file template management.') },
};

const MANUAL_MESSAGES = {
  ConnReq: {
    comment: 'Connection close request.',
    fields: [
      { name: 'protocol', typeRaw: 'string', repeated: false, comment: '协议。' },
      { name: 'host', typeRaw: 'string', repeated: false, comment: '主机。' },
      { name: 'port', typeRaw: 'uint32', repeated: false, comment: '端口。' },
    ],
  },
  AuthorizeResources: {
    comment: 'Authorize resources request.',
    fields: [
      { name: 'principal_id', typeRaw: 'string', repeated: false, comment: '主体 ID。' },
      { name: 'principal_type', typeRaw: 'string', repeated: false, comment: '主体类型。' },
      { name: 'resources', typeRaw: 'string', repeated: true, comment: '资源列表。' },
    ],
  },
  MCPServerDeleteRequest: {
    comment: 'Delete MCP servers.',
    fields: [
      { name: 'ids', typeRaw: 'string', repeated: true, comment: 'MCP Server ID 列表。' },
      { name: 'namespace', typeRaw: 'string', repeated: false, comment: '命名空间。' },
    ],
  },
  A2AAgentDeleteRequest: {
    comment: 'Delete A2A agents.',
    fields: [
      { name: 'agent_ids', typeRaw: 'string', repeated: true, comment: 'Agent ID 列表。' },
    ],
  },
  A2AAgent: {
    comment: 'A2A Agent registry entry.',
    fields: [
      { name: 'id', typeRaw: 'string', repeated: false, comment: 'Agent ID。' },
      { name: 'name', typeRaw: 'string', repeated: false, comment: '名称。' },
      { name: 'namespace', typeRaw: 'string', repeated: false, comment: '命名空间。' },
      { name: 'description', typeRaw: 'string', repeated: false, comment: '描述。' },
      { name: 'backend_type', typeRaw: 'string', repeated: false, comment: '后端类型。' },
      { name: 'backend_address', typeRaw: 'string', repeated: false, comment: '后端地址。' },
      { name: 'backend_service_namespace', typeRaw: 'string', repeated: false, comment: '后端服务命名空间。' },
      { name: 'backend_service_name', typeRaw: 'string', repeated: false, comment: '后端服务名。' },
      { name: 'raw_card_json', typeRaw: 'string', repeated: false, comment: '原始 Card JSON。' },
      { name: 'metadata', typeRaw: 'map<string,string>', mapKey: 'string', mapVal: 'string', repeated: false, comment: '元数据。' },
    ],
  },
  ConfigClientRequest: {
    comment: 'Client config metadata list request (approximate).',
    fields: [
      { name: 'namespace', typeRaw: 'string', repeated: false, comment: '命名空间。' },
      { name: 'group', typeRaw: 'string', repeated: false, comment: '分组。' },
      { name: 'revision', typeRaw: 'string', repeated: false, comment: '修订版本。' },
    ],
  },
};

// Reuse proto parsing from generate script by dynamic import of shared logic — inline minimal copy:
function walkProtoFiles(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkProtoFiles(p, acc);
    else if (ent.name.endsWith('.proto')) acc.push(p);
  }
  return acc;
}

function collectLeadingComments(text, index) {
  const lines = text.slice(0, index).split('\n');
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
    let em;
    const enumRe = /enum\s+(\w+)\s*\{([^}]*)\}/g;
    while ((em = enumRe.exec(text))) {
      enums.set(em[1], [...em[2].matchAll(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*\d+/gm)].map((x) => x[1]));
    }
    const msgRe = /message\s+(\w+)\s*\{/g;
    let mm;
    while ((mm = msgRe.exec(text))) {
      const name = mm[1];
      const start = mm.index + mm[0].length;
      let depth = 1, i = start;
      while (i < text.length && depth > 0) {
        if (text[i] === '{') depth++;
        else if (text[i] === '}') depth--;
        i++;
      }
      const body = text.slice(start, i - 1);
      let cleaned = '';
      depth = 0;
      for (let j = 0; j < body.length; j++) {
        const ch = body[j];
        if (ch === '{') { depth++; cleaned += depth === 1 ? '{' : ' '; continue; }
        if (ch === '}') { cleaned += depth === 1 ? '}' : ' '; depth--; continue; }
        cleaned += depth === 0 ? ch : ' ';
      }
      const fields = [];
      const fieldRe = /(?:^|\n)\s*(repeated\s+)?(?:map<\s*([^,>]+)\s*,\s*([^>]+)\s*>|([\w.]+))\s+(\w+)\s*=\s*(\d+)(\s*\[[^\]]*\])?/g;
      let fm;
      while ((fm = fieldRe.exec(cleaned))) {
        const mapKey = fm[2]?.trim();
        const mapVal = fm[3]?.trim();
        const typeRaw = mapKey ? `map<${mapKey},${mapVal}>` : fm[4];
        const fname = fm[5];
        const opts = fm[7] || '';
        const jsonName = opts.match(/json_name\s*=\s*"([^"]+)"/)?.[1] || fname;
        const rel = body.indexOf(`${fname} =`);
        fields.push({
          name: jsonName,
          protoName: fname,
          typeRaw,
          repeated: Boolean(fm[1]),
          mapKey,
          mapVal,
          comment: rel >= 0 ? collectLeadingComments(text, start + rel) : '',
        });
      }
      messages.set(name, { name, comment: collectLeadingComments(text, mm.index), fields, file });
    }
  }
  for (const [name, def] of Object.entries(MANUAL_MESSAGES)) {
    messages.set(name, { name, comment: def.comment, fields: def.fields, file: 'manual' });
  }
  return { messages, enums };
}

function fieldDesc(field, enums) {
  const base = field.comment || field.name;
  const typeName = field.mapVal || field.typeRaw;
  if (enums.has(typeName)) {
    const vals = enums.get(typeName).join(' | ');
    return L(`${base} 枚举：${vals}`, `${base} enum: ${vals}`);
  }
  return L(base, base);
}

function scalarType(typeRaw) {
  const t = typeRaw.replace(/^google\.protobuf\./, '');
  return ({ string: 'string', bool: 'bool', bytes: 'bytes', double: 'number', float: 'number', int32: 'int32', int64: 'int64', uint32: 'uint32', uint64: 'uint64', Duration: 'duration', Any: 'any' })[t] || typeRaw;
}

function expandMessage(messages, enums, messageName, opts = {}) {
  const { location = 'body', depth = 0, maxDepth = 5, stack = [], skip = REQUEST_SKIP } = opts;
  if (!messages.has(messageName) || depth > maxDepth || stack.includes(messageName)) return [];
  const msg = messages.get(messageName);
  const nextStack = [...stack, messageName];
  const params = [];
  for (const field of msg.fields) {
    if (skip.has(field.name) || skip.has(field.protoName)) continue;
    let mapKey = field.mapKey, mapVal = field.mapVal;
    if (!mapKey && /^map</.test(field.typeRaw || '')) {
      const m = field.typeRaw.match(/^map<\s*([^,>]+)\s*,\s*([^>]+)\s*>$/);
      if (m) { mapKey = m[1].trim(); mapVal = m[2].trim(); }
    }
    if (mapKey) {
      params.push({ name: field.name, type: `map<${mapKey},${mapVal}>`, location, required: false, description: fieldDesc(field, enums) });
      continue;
    }
    if (field.repeated) {
      if (messages.has(field.typeRaw)) {
        params.push({ name: field.name, type: `${field.typeRaw}[]`, location, required: false, description: fieldDesc(field, enums), itemType: field.typeRaw, children: expandMessage(messages, enums, field.typeRaw, { ...opts, depth: depth + 1, stack: nextStack }) });
      } else {
        params.push({ name: field.name, type: `${scalarType(field.typeRaw)}[]`, location, required: false, description: fieldDesc(field, enums) });
      }
      continue;
    }
    if (messages.has(field.typeRaw)) {
      params.push({ name: field.name, type: field.typeRaw, location, required: false, description: fieldDesc(field, enums), children: expandMessage(messages, enums, field.typeRaw, { ...opts, depth: depth + 1, stack: nextStack }) });
      continue;
    }
    if (enums.has(field.typeRaw)) {
      params.push({ name: field.name, type: `enum(${field.typeRaw})`, location, required: false, description: fieldDesc(field, enums) });
      continue;
    }
    params.push({ name: field.name, type: scalarType(field.typeRaw), location, required: false, description: fieldDesc(field, enums) });
  }
  return params;
}

function authHeader() {
  return { name: 'Authorization', type: 'string', location: 'header', required: true, description: L('登录返回的 token。', 'Token from login.') };
}

function samples(method, path, hasBody, auth) {
  const url = `http://127.0.0.1:8090${path}`;
  const authH = auth ? ` \\\n  -H "Authorization: $TOKEN"` : '';
  const authJs = auth ? `\n    Authorization: token,` : '';
  const bodyCurl = hasBody ? ` \\\n  -H 'Content-Type: application/json' \\\n  -d '[]'` : '';
  const bodyJs = hasBody ? `,\n  body: JSON.stringify([]),` : '';
  return [
    { lang: 'curl', label: 'cURL', code: `curl -sS -X ${method} '${url}'${authH}${bodyCurl}` },
    { lang: 'javascript', label: 'JavaScript', code: `await fetch('${url}', {\n  method: '${method}',\n  headers: {${authJs}${hasBody ? `\n    'Content-Type': 'application/json',` : ''}\n  }${bodyJs}\n});` },
    { lang: 'go', label: 'Go', code: hasBody
      ? `body := strings.NewReader(\`[]\`)\nreq, _ := http.NewRequest(http.Method${method[0]+method.slice(1).toLowerCase()}, "${url}", body)\n${auth ? 'req.Header.Set("Authorization", token)\n' : ''}req.Header.Set("Content-Type", "application/json")\nresp, err := http.DefaultClient.Do(req)`
      : `req, _ := http.NewRequest(http.Method${method[0]+method.slice(1).toLowerCase()}, "${url}", nil)\n${auth ? 'req.Header.Set("Authorization", token)\n' : ''}resp, err := http.DefaultClient.Do(req)` },
    { lang: 'python', label: 'Python', code: hasBody
      ? `import requests\nrequests.${method.toLowerCase()}("${url}", json=[]${auth ? ', headers={"Authorization": token}' : ''})`
      : `import requests\nrequests.${method.toLowerCase()}("${url}"${auth ? ', headers={"Authorization": token}' : ''})` },
  ];
}

function buildEndpoint(def, messages, enums) {
  const params = [];
  if (def.auth !== false) params.push(authHeader());
  for (const q of def.queries || []) {
    const [name, type, required] = q;
    params.push({ name, type, location: 'query', required: !!required, description: L(name, name) });
  }
  if (def.note) {
    // keep note in description
  }
  if (def.bodyFields) {
    if (def.array !== false && def.body) {
      params.push({ name: '(body)', type: `${def.body}[]`, location: 'body', required: true, description: L(`请求体为数组。`, `Request body is an array.`) });
    }
    for (const [name, type, required, zh, en] of def.bodyFields) {
      params.push({ name, type, location: 'body', required: !!required, description: L(zh, en) });
    }
  } else if (def.body && messages.has(def.body)) {
    const isArray = def.array !== false;
    if (isArray) {
      params.push({ name: '(body)', type: `${def.body}[]`, location: 'body', required: true, description: L(`请求体为 ${def.body} 的 JSON 数组；下列为单条字段。`, `JSON array of ${def.body}; fields below are per-item.`) });
    }
    params.push(...expandMessage(messages, enums, def.body, { location: 'body' }));
  } else if (def.body) {
    params.push({ name: '(body)', type: def.array === false ? def.body : `${def.body}[]`, location: 'body', required: true, description: L(`见 ${def.body}。`, `See ${def.body}.`) });
  }

  const desc = def.note || L(`${def.title['zh-CN']}。`, `${def.title.en}.`);
  return {
    id: def.id,
    method: def.method,
    path: def.path,
    title: def.title,
    description: desc,
    auth: def.auth !== false,
    params,
    samples: samples(def.method, def.path, Boolean(def.body || def.bodyFields), def.auth !== false),
    responseExample: '{\n  "code": 200000,\n  "info": "execute success"\n}',
    responseLabel: L('响应示例', 'Response example'),
    ...(def.body && messages.has(def.body) ? {
      responseFields: [
        { name: 'code', type: 'uint32', location: 'body', required: true, description: L('业务码。', 'Business code.') },
        { name: 'info', type: 'string', location: 'body', required: false, description: L('提示信息。', 'Info.') },
        { name: def.body, type: def.body, location: 'body', required: false, description: L('实体字段。', 'Entity fields.'), children: expandMessage(messages, enums, def.body, { location: 'body', skip: new Set(), maxDepth: 4 }) },
      ],
    } : {}),
  };
}

const HEADER = `export type ApiLocale = 'zh-CN' | 'en';

export type ApiParam = {
  name: string;
  type: string;
  required?: boolean;
  location: 'path' | 'query' | 'header' | 'body';
  description: Record<ApiLocale, string>;
  children?: ApiParam[];
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
  const { messages, enums } = parseProtos(walkProtoFiles(SPEC));
  const mod = await import(pathToFileURL(OUT).href + '?t=' + Date.now());
  const sections = structuredClone(mod.httpOpenApiSections);

  // Move list-users from auth to auth-users if present
  if (sections.auth) {
    const kept = [];
    for (const ep of sections.auth.endpoints) {
      if (ep.id === 'list-users' || ep.path === '/auth/v1/users') continue;
      kept.push(ep);
    }
    sections.auth.endpoints = kept;
    sections.auth.title = SECTION_META.auth.title;
    sections.auth.description = SECTION_META.auth.description;
  }

  let added = 0;
  for (const def of ADDITIONS) {
    if (!sections[def.section]) {
      const meta = SECTION_META[def.section] || { title: L(def.section, def.section), description: L('', '') };
      sections[def.section] = { id: def.section, title: meta.title, description: meta.description, endpoints: [] };
    }
    const exists = sections[def.section].endpoints.some((e) => e.method === def.method && e.path === def.path);
    if (exists) continue;
    sections[def.section].endpoints.push(buildEndpoint(def, messages, enums));
    added++;
  }

  fs.writeFileSync(OUT, HEADER + JSON.stringify(sections, null, 2) + FOOTER);
  const total = Object.values(sections).reduce((n, s) => n + s.endpoints.length, 0);
  console.log('added', added, 'total endpoints', total, 'sections', Object.keys(sections).length);
}

main().catch((e) => { console.error(e); process.exit(1); });
