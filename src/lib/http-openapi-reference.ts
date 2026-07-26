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

export const httpOpenApiSections: ApiSectionDef[] = [
  {
    id: 'auth',
    title: { 'zh-CN': '鉴权', en: 'Authentication' },
    description: {
      'zh-CN': '管理面登录与鉴权状态。Console / OpenAPI 管理调用先取 token。',
      en: 'Management login and auth status. Console / OpenAPI management calls start with a token.',
    },
    endpoints: [
      {
        id: 'login',
        method: 'POST',
        path: '/auth/v1/user/login',
        title: { 'zh-CN': '用户登录', en: 'User login' },
        description: {
          'zh-CN': '使用用户名与密码换取管理面 token。后续请求在 Header 中携带 `Authorization` 与 `X-Pole-User`。',
          en: 'Exchange username and password for a management token. Later calls send `Authorization` and `X-Pole-User` headers.',
        },
        params: [
          {
            name: 'name',
            type: 'string',
            required: true,
            location: 'body',
            description: {
              'zh-CN': '用户名。',
              en: 'Username.',
            },
          },
          {
            name: 'password',
            type: 'string',
            required: true,
            location: 'body',
            description: {
              'zh-CN': '密码。',
              en: 'Password.',
            },
          },
          {
            name: 'owner',
            type: 'string',
            location: 'body',
            description: {
              'zh-CN': '可选 owner 作用域。',
              en: 'Optional owner scope.',
            },
          },
        ],
        samples: [
          {
            lang: 'curl',
            label: 'cURL',
            code: `curl -sS -X POST '${base}/auth/v1/user/login' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "admin",
    "password": "Pole@123456"
  }'`,
          },
          {
            lang: 'javascript',
            label: 'JavaScript',
            code: `const res = await fetch('${base}/auth/v1/user/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'admin',
    password: 'Pole@123456',
  }),
});
const data = await res.json();
const token = data.loginResponse?.token ?? data.token;
const userId = data.loginResponse?.user_id ?? data.user_id;`,
          },
          {
            lang: 'go',
            label: 'Go',
            code: `body := strings.NewReader(\`{"name":"admin","password":"Pole@123456"}\`)
req, _ := http.NewRequest(http.MethodPost, "${base}/auth/v1/user/login", body)
req.Header.Set("Content-Type", "application/json")
resp, err := http.DefaultClient.Do(req)
if err != nil {
  log.Fatal(err)
}
defer resp.Body.Close()`,
          },
          {
            lang: 'python',
            label: 'Python',
            code: `import requests

resp = requests.post(
    "${base}/auth/v1/user/login",
    json={"name": "admin", "password": "Pole@123456"},
)
data = resp.json()
token = data.get("loginResponse", data).get("token")
user_id = data.get("loginResponse", data).get("user_id")`,
          },
        ],
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: `{
  "code": 200000,
  "info": "execute success",
  "loginResponse": {
    "user_id": "xxx",
    "name": "admin",
    "token": "<jwt-or-token>",
    "role": "admin"
  }
}`,
      },
      {
        id: 'auth-system',
        method: 'GET',
        path: '/auth/v1/system',
        title: { 'zh-CN': '鉴权系统状态', en: 'Auth system status' },
        description: {
          'zh-CN': '查询鉴权是否开启、是否已初始化主用户等系统状态。常用于安装后探测。',
          en: 'Check whether auth is enabled and whether the main user is initialized. Useful after install.',
        },
        params: [],
        samples: [
          {
            lang: 'curl',
            label: 'cURL',
            code: `curl -sS '${base}/auth/v1/system'`,
          },
          {
            lang: 'javascript',
            label: 'JavaScript',
            code: `const res = await fetch('${base}/auth/v1/system');
const status = await res.json();`,
          },
          {
            lang: 'go',
            label: 'Go',
            code: `resp, err := http.Get("${base}/auth/v1/system")
if err != nil {
  log.Fatal(err)
}
defer resp.Body.Close()`,
          },
          {
            lang: 'python',
            label: 'Python',
            code: `import requests
status = requests.get("${base}/auth/v1/system").json()`,
          },
        ],
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: `{
  "code": 200000,
  "info": "execute success",
  "option": {
    "authEnabled": "true",
    "mainUserExist": "true"
  }
}`,
      },
    ],
  },
  {
    id: 'naming',
    title: { 'zh-CN': '服务发现', en: 'Service discovery' },
    description: {
      'zh-CN': '命名空间、服务、实例与客户端 Discover / Register。管理面请求需要鉴权 Header。',
      en: 'Namespaces, services, instances, and client Discover / Register. Management calls need auth headers.',
    },
    endpoints: [
      {
        id: 'list-namespaces',
        method: 'GET',
        path: '/core/v1/namespaces',
        title: { 'zh-CN': '查询命名空间', en: 'List namespaces' },
        description: {
          'zh-CN': '列出命名空间。Namespace 表示运行环境，不是租户。',
          en: 'List namespaces. Namespace means environment, not tenant.',
        },
        auth: true,
        params: [
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
          {
            name: 'name',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '按名称过滤。', en: 'Filter by name.' },
          },
          {
            name: 'offset',
            type: 'integer',
            location: 'query',
            description: { 'zh-CN': '分页偏移，默认 0。', en: 'Page offset, default 0.' },
          },
          {
            name: 'limit',
            type: 'integer',
            location: 'query',
            description: { 'zh-CN': '分页大小，最大 100。', en: 'Page size, max 100.' },
          },
        ],
        samples: [
          {
            lang: 'curl',
            label: 'cURL',
            code: `curl -sS '${base}/core/v1/namespaces?limit=20' \\
  -H "Authorization: $TOKEN" \\
  -H "X-Pole-User: $USER_ID"`,
          },
          {
            lang: 'javascript',
            label: 'JavaScript',
            code: `const res = await fetch('${base}/core/v1/namespaces?limit=20', {
  headers: {
    Authorization: token,
    'X-Pole-User': userId,
  },
});
const data = await res.json();`,
          },
          {
            lang: 'go',
            label: 'Go',
            code: `req, _ := http.NewRequest(http.MethodGet, "${base}/core/v1/namespaces?limit=20", nil)
req.Header.Set("Authorization", token)
req.Header.Set("X-Pole-User", userID)
resp, err := http.DefaultClient.Do(req)`,
          },
          {
            lang: 'python',
            label: 'Python',
            code: `import requests
resp = requests.get(
    "${base}/core/v1/namespaces",
    params={"limit": 20},
    headers={"Authorization": token, "X-Pole-User": user_id},
)`,
          },
        ],
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: `{
  "code": 200000,
  "info": "execute success",
  "amount": 2,
  "namespaces": [
    { "name": "default", "comment": "" },
    { "name": "pole-system", "comment": "system" }
  ]
}`,
      },
      {
        id: 'discover',
        method: 'POST',
        path: '/naming/v1/Discover',
        title: { 'zh-CN': '客户端 Discover', en: 'Client Discover' },
        description: {
          'zh-CN': '客户端拉取实例与治理视图。也可走 gRPC `DiscoverGRPC`（8091）。',
          en: 'Clients pull instance and governance views. Prefer gRPC `DiscoverGRPC` on 8091 when available.',
        },
        params: [
          {
            name: 'type',
            type: 'string',
            required: true,
            location: 'body',
            description: {
              'zh-CN': '发现类型，如 INSTANCE、SERVICE、路由与治理规则类型等。',
              en: 'Discover type such as INSTANCE, SERVICE, or governance rule types.',
            },
          },
          {
            name: 'service.name',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '服务名。', en: 'Service name.' },
          },
          {
            name: 'service.namespace',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '命名空间（环境）。', en: 'Namespace (environment).' },
          },
        ],
        samples: [
          {
            lang: 'curl',
            label: 'cURL',
            code: `curl -sS -X POST '${base}/naming/v1/Discover' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "type": "INSTANCE",
    "service": {
      "name": "payment",
      "namespace": "default"
    }
  }'`,
          },
          {
            lang: 'javascript',
            label: 'JavaScript',
            code: `const res = await fetch('${base}/naming/v1/Discover', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'INSTANCE',
    service: { name: 'payment', namespace: 'default' },
  }),
});`,
          },
          {
            lang: 'go',
            label: 'Go',
            code: `body := strings.NewReader(\`{
  "type":"INSTANCE",
  "service":{"name":"payment","namespace":"default"}
}\`)
req, _ := http.NewRequest(http.MethodPost, "${base}/naming/v1/Discover", body)
req.Header.Set("Content-Type", "application/json")
resp, err := http.DefaultClient.Do(req)`,
          },
          {
            lang: 'python',
            label: 'Python',
            code: `import requests
requests.post(
    "${base}/naming/v1/Discover",
    json={
        "type": "INSTANCE",
        "service": {"name": "payment", "namespace": "default"},
    },
)`,
          },
        ],
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: `{
  "code": 200000,
  "info": "execute success",
  "type": "INSTANCE",
  "service": {
    "name": "payment",
    "namespace": "default",
    "revision": "..."
  },
  "instances": [
    { "id": "...", "host": "10.0.0.8", "port": 8080, "healthy": true }
  ]
}`,
      },
      {
        id: 'register-instance',
        method: 'POST',
        path: '/naming/v1/RegisterInstance',
        title: { 'zh-CN': '注册实例', en: 'Register instance' },
        description: {
          'zh-CN': '客户端注册服务实例。生产环境更推荐 gRPC 注册与心跳。',
          en: 'Register a service instance. Prefer gRPC register/heartbeat in production.',
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
            description: { 'zh-CN': '实例主机。', en: 'Instance host.' },
          },
          {
            name: 'port',
            type: 'integer',
            required: true,
            location: 'body',
            description: { 'zh-CN': '实例端口。', en: 'Instance port.' },
          },
        ],
        samples: [
          {
            lang: 'curl',
            label: 'cURL',
            code: `curl -sS -X POST '${base}/naming/v1/RegisterInstance' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "service": "payment",
    "namespace": "default",
    "host": "10.0.0.8",
    "port": 8080,
    "protocol": "http",
    "weight": 100
  }'`,
          },
          {
            lang: 'javascript',
            label: 'JavaScript',
            code: `await fetch('${base}/naming/v1/RegisterInstance', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    service: 'payment',
    namespace: 'default',
    host: '10.0.0.8',
    port: 8080,
    protocol: 'http',
    weight: 100,
  }),
});`,
          },
          {
            lang: 'go',
            label: 'Go',
            code: `body := strings.NewReader(\`{
  "service":"payment","namespace":"default",
  "host":"10.0.0.8","port":8080,"protocol":"http","weight":100
}\`)
req, _ := http.NewRequest(http.MethodPost, "${base}/naming/v1/RegisterInstance", body)
req.Header.Set("Content-Type", "application/json")
resp, err := http.DefaultClient.Do(req)`,
          },
          {
            lang: 'python',
            label: 'Python',
            code: `import requests
requests.post(
    "${base}/naming/v1/RegisterInstance",
    json={
        "service": "payment",
        "namespace": "default",
        "host": "10.0.0.8",
        "port": 8080,
        "protocol": "http",
        "weight": 100,
    },
)`,
          },
        ],
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: `{
  "code": 200000,
  "info": "execute success",
  "instance": { "id": "instance-id-..." }
}`,
      },
    ],
  },
  {
    id: 'config',
    title: { 'zh-CN': '配置中心', en: 'Configuration' },
    description: {
      'zh-CN': '管理面发布走 `/config/v1`；客户端拉取可用 `/v1/GetConfigFile`（client 分组）。',
      en: 'Management publish uses `/config/v1`; clients can pull via `/v1/GetConfigFile` (client group).',
    },
    endpoints: [
      {
        id: 'config-release',
        method: 'POST',
        path: '/config/v1/files/release',
        title: { 'zh-CN': '发布配置', en: 'Publish config' },
        description: {
          'zh-CN': '发布全量（`normal`）或灰度（`gray`）。多条 active gray 可并存，客户端按标签命中。',
          en: 'Publish a full (`normal`) or gray (`gray`) release. Multiple active grays can coexist; clients match by tags.',
        },
        auth: true,
        params: [
          {
            name: 'Authorization',
            type: 'string',
            required: true,
            location: 'header',
            description: { 'zh-CN': '管理 token。', en: 'Management token.' },
          },
          {
            name: 'X-Pole-User',
            type: 'string',
            required: true,
            location: 'header',
            description: { 'zh-CN': '用户 ID。', en: 'User id.' },
          },
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
            description: { 'zh-CN': '配置分组。', en: 'Config group.' },
          },
          {
            name: 'file_name',
            type: 'string',
            required: true,
            location: 'body',
            description: { 'zh-CN': '配置文件名。', en: 'Config file name.' },
          },
          {
            name: 'release_type',
            type: 'string',
            required: true,
            location: 'body',
            description: {
              'zh-CN': '`normal` 或 `gray`。',
              en: '`normal` or `gray`.',
            },
          },
          {
            name: 'beta_labels',
            type: 'array',
            location: 'body',
            description: {
              'zh-CN': '灰度标签匹配规则；`gray` 时使用。',
              en: 'Gray label match rules; used when `release_type=gray`.',
            },
          },
        ],
        samples: [
          {
            lang: 'curl',
            label: 'cURL',
            code: `curl -sS -X POST '${base}/config/v1/files/release' \\
  -H "Authorization: $TOKEN" \\
  -H "X-Pole-User: $USER_ID" \\
  -H 'Content-Type: application/json' \\
  -d '{
    "namespace": "default",
    "group": "docs-multi-gray",
    "file_name": "app.yaml",
    "name": "gray-env-a",
    "release_type": "gray",
    "beta_labels": [
      {"key":"env","value":{"type":0,"value":"gray-a","value_type":0}}
    ]
  }'`,
          },
          {
            lang: 'javascript',
            label: 'JavaScript',
            code: `await fetch('${base}/config/v1/files/release', {
  method: 'POST',
  headers: {
    Authorization: token,
    'X-Pole-User': userId,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    namespace: 'default',
    group: 'docs-multi-gray',
    file_name: 'app.yaml',
    name: 'gray-env-a',
    release_type: 'gray',
    beta_labels: [
      { key: 'env', value: { type: 0, value: 'gray-a', value_type: 0 } },
    ],
  }),
});`,
          },
          {
            lang: 'go',
            label: 'Go',
            code: `req, _ := http.NewRequest(http.MethodPost, "${base}/config/v1/files/release", body)
req.Header.Set("Authorization", token)
req.Header.Set("X-Pole-User", userID)
req.Header.Set("Content-Type", "application/json")
resp, err := http.DefaultClient.Do(req)`,
          },
          {
            lang: 'python',
            label: 'Python',
            code: `import requests
requests.post(
    "${base}/config/v1/files/release",
    headers={"Authorization": token, "X-Pole-User": user_id},
    json={
        "namespace": "default",
        "group": "docs-multi-gray",
        "file_name": "app.yaml",
        "name": "gray-env-a",
        "release_type": "gray",
        "beta_labels": [
            {"key": "env", "value": {"type": 0, "value": "gray-a", "value_type": 0}}
        ],
    },
)`,
          },
        ],
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: `{
  "code": 200000,
  "info": "execute success"
}`,
      },
      {
        id: 'get-config-file',
        method: 'GET',
        path: '/v1/GetConfigFile',
        title: { 'zh-CN': '客户端拉取配置', en: 'Client get config file' },
        description: {
          'zh-CN': '客户端读配置。`tags` 为 `key=value`，可重复；未命中灰度时回落当前全量。',
          en: 'Client config pull. `tags` are `key=value` and repeatable; unmatched clients fall back to the active normal release.',
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
            description: { 'zh-CN': '配置分组。', en: 'Config group.' },
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
            description: {
              'zh-CN': '客户端标签，如 `env=gray-a`；可传多个。',
              en: 'Client tags such as `env=gray-a`; repeatable.',
            },
          },
        ],
        samples: [
          {
            lang: 'curl',
            label: 'cURL',
            code: `curl -sS '${base}/v1/GetConfigFile?namespace=default&group=docs-multi-gray&fileName=app.yaml&version=0&tags=env%3Dgray-a'`,
          },
          {
            lang: 'javascript',
            label: 'JavaScript',
            code: `const url = new URL('${base}/v1/GetConfigFile');
url.searchParams.set('namespace', 'default');
url.searchParams.set('group', 'docs-multi-gray');
url.searchParams.set('fileName', 'app.yaml');
url.searchParams.set('version', '0');
url.searchParams.append('tags', 'env=gray-a');
const data = await fetch(url).then((r) => r.json());`,
          },
          {
            lang: 'go',
            label: 'Go',
            code: `u := "${base}/v1/GetConfigFile?namespace=default&group=docs-multi-gray&fileName=app.yaml&version=0&tags=env%3Dgray-a"
resp, err := http.Get(u)`,
          },
          {
            lang: 'python',
            label: 'Python',
            code: `import requests
requests.get(
    "${base}/v1/GetConfigFile",
    params={
        "namespace": "default",
        "group": "docs-multi-gray",
        "fileName": "app.yaml",
        "version": 0,
        "tags": "env=gray-a",
    },
)`,
          },
        ],
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: `{
  "code": 200000,
  "file": {
    "name": "app.yaml",
    "release_type": "gray",
    "content": "mode: gray-a\\n"
  }
}`,
      },
    ],
  },
  {
    id: 'ai-registry',
    title: { 'zh-CN': 'AI Registry', en: 'AI Registry' },
    description: {
      'zh-CN': 'MCP / A2A 仅注册发现元数据，不是 Agent Runtime。',
      en: 'MCP / A2A are registry metadata only—not an Agent runtime.',
    },
    endpoints: [
      {
        id: 'list-mcp',
        method: 'GET',
        path: '/ai/mcp/v1/servers',
        title: { 'zh-CN': '列出 MCP Server', en: 'List MCP servers' },
        description: {
          'zh-CN': '查询 MCP Server Registry 列表。',
          en: 'List MCP servers from the registry.',
        },
        auth: true,
        params: [
          {
            name: 'Authorization',
            type: 'string',
            required: true,
            location: 'header',
            description: { 'zh-CN': '管理 token。', en: 'Management token.' },
          },
          {
            name: 'X-Pole-User',
            type: 'string',
            required: true,
            location: 'header',
            description: { 'zh-CN': '用户 ID。', en: 'User id.' },
          },
          {
            name: 'namespace',
            type: 'string',
            location: 'query',
            description: { 'zh-CN': '按命名空间过滤。', en: 'Filter by namespace.' },
          },
        ],
        samples: [
          {
            lang: 'curl',
            label: 'cURL',
            code: `curl -sS '${base}/ai/mcp/v1/servers?namespace=default' \\
  -H "Authorization: $TOKEN" \\
  -H "X-Pole-User: $USER_ID"`,
          },
          {
            lang: 'javascript',
            label: 'JavaScript',
            code: `const res = await fetch('${base}/ai/mcp/v1/servers?namespace=default', {
  headers: { Authorization: token, 'X-Pole-User': userId },
});`,
          },
          {
            lang: 'go',
            label: 'Go',
            code: `req, _ := http.NewRequest(http.MethodGet, "${base}/ai/mcp/v1/servers?namespace=default", nil)
req.Header.Set("Authorization", token)
req.Header.Set("X-Pole-User", userID)
resp, err := http.DefaultClient.Do(req)`,
          },
          {
            lang: 'python',
            label: 'Python',
            code: `import requests
requests.get(
    "${base}/ai/mcp/v1/servers",
    params={"namespace": "default"},
    headers={"Authorization": token, "X-Pole-User": user_id},
)`,
          },
        ],
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: `{
  "code": 200000,
  "servers": [
    { "id": "...", "name": "docs-mcp", "namespace": "default" }
  ]
}`,
      },
      {
        id: 'list-a2a',
        method: 'GET',
        path: '/ai/a2a/v1/agents',
        title: { 'zh-CN': '列出 A2A Agent', en: 'List A2A agents' },
        description: {
          'zh-CN': '查询 A2A Agent Registry。控制面不提供数据面代理。',
          en: 'List A2A agents. The control plane does not proxy the data plane.',
        },
        auth: true,
        params: [
          {
            name: 'Authorization',
            type: 'string',
            required: true,
            location: 'header',
            description: { 'zh-CN': '管理 token。', en: 'Management token.' },
          },
          {
            name: 'X-Pole-User',
            type: 'string',
            required: true,
            location: 'header',
            description: { 'zh-CN': '用户 ID。', en: 'User id.' },
          },
        ],
        samples: [
          {
            lang: 'curl',
            label: 'cURL',
            code: `curl -sS '${base}/ai/a2a/v1/agents' \\
  -H "Authorization: $TOKEN" \\
  -H "X-Pole-User: $USER_ID"`,
          },
          {
            lang: 'javascript',
            label: 'JavaScript',
            code: `const res = await fetch('${base}/ai/a2a/v1/agents', {
  headers: { Authorization: token, 'X-Pole-User': userId },
});`,
          },
          {
            lang: 'go',
            label: 'Go',
            code: `req, _ := http.NewRequest(http.MethodGet, "${base}/ai/a2a/v1/agents", nil)
req.Header.Set("Authorization", token)
req.Header.Set("X-Pole-User", userID)
resp, err := http.DefaultClient.Do(req)`,
          },
          {
            lang: 'python',
            label: 'Python',
            code: `import requests
requests.get(
    "${base}/ai/a2a/v1/agents",
    headers={"Authorization": token, "X-Pole-User": user_id},
)`,
          },
        ],
        responseLabel: { 'zh-CN': '响应示例', en: 'Response example' },
        responseExample: `{
  "code": 200000,
  "agents": [
    { "id": "...", "name": "support-agent", "namespace": "default" }
  ]
}`,
      },
    ],
  },
];
