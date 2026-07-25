export type ArchitectureLocale = 'zh-CN' | 'en';

export const DEFAULT_ARCHITECTURE_LOCALE: ArchitectureLocale = 'zh-CN';

const architectureCopy = {
  'zh-CN': {
    flow: {
      kicker: '组织架构',
      title: '治理与组件全景',
      topicSelector: '选择架构主题',
      languageSelector: '切换架构图语言',
      frameStatus: (current: number, total: number, label: string) =>
        `第 ${current} / ${total} 帧：${label}`,
      viewArchitecture: '查看完整架构',
      slides: {
        governance: {
          label: '治理生效',
          title: '让已接入的 AI 服务，沿调用链执行同一套治理意图。',
          detail:
            '以承载 Agent 的 Pole Service 为例：A/B 路由、限流、熔断、镜像与 Mock 由已接入数据面按支持范围执行；Pole Agent 的 Prompt 与模型凭据则独立发布和托管。',
        },
        collaboration: {
          label: '组件协作',
          title: '一个控制面，连接不同接入与执行组件。',
          detail:
            'Console 管理变化，Controller 连接 Kubernetes；已接入的 SDK 与代理运行时按部署形态消费控制面能力。',
        },
      },
    },
    collaboration: {
      aria:
        'Lattice.Hub 组织组件沉浸式全景协作图：Console 和 Kubernetes Controller 连接 Control Plane；Rust SDK、Limiter Server 与 Envoy 或 Gateway 使用当前已接入路径；Pole Sidecar 以虚线表示演进接入；Specification 是共享契约底座。',
      planes: {
        managementCluster: '管理与集群',
        management: '管理入口',
        controlPlane: '统一控制面',
        runtimeIntegration: '运行时与集成',
        runtime: '运行时',
      },
      nodes: {
        console: { label: 'Console', meta: '管理 · 审阅', shortMeta: '管理' },
        controller: { label: 'K8s Controller', shortLabel: 'Controller', meta: '资源同步', shortMeta: '同步' },
        rustSdk: { label: 'Rust SDK', meta: '无代理接入', shortMeta: '无代理' },
        envoy: { label: 'Envoy / Gateway', meta: '外部运行时', shortMeta: '外部' },
        sidecar: { label: 'Pole Sidecar', meta: '演进接入', shortMeta: '演进中' },
        limiter: { label: 'Limiter Server', shortLabel: 'Limiter', meta: '分布式限流', shortMeta: '限流' },
      },
      contract: {
        label: 'SPECIFICATION',
        meta: '跨组件共享契约',
        shortMeta: '共享契约',
      },
      flow: {
        manage: '管理',
        distribute: '分发',
        execute: '执行',
      },
      legend: {
        current: '当前协作',
        evolving: '契约 / 可选 / 演进接入',
      },
    },
    governance: {
      aria:
        'AI 服务治理沉浸式全景生效示意图：平台工程师通过 Console 或 API 发布治理视图；示例性的 Agent Gateway 经已接入 SDK 或代理执行条件与权重路由、限流和熔断，并按执行组件支持范围旁路镜像流量、返回 Mock 或切换降级路径。Pole Agent 的 Prompt 使用版本化发布；模型凭据由 Pole Secret 托管，只在 Provider Adapter 运行时解析，不进入浏览器、日志或模型上下文。A2A Registry 不承载 Agent 任务流量。',
      planes: {
        managementControl: '管理与控制',
        aiTrafficExample: 'AI 服务流量 · 示例',
      },
      nodes: {
        engineer: { label: '平台工程师', shortLabel: '工程师', meta: '定义 · 审阅', shortMeta: '定义' },
        consoleApi: { label: 'Console / API', meta: '统一发布', shortMeta: '发布' },
        userRequest: { label: '用户请求', meta: 'AGENT 调用', shortMeta: 'AGENT 调用' },
        agentGateway: { label: 'Agent 网关', meta: 'POLE SERVICE · SDK / 代理', shortMeta: 'POLE SERVICE' },
        agentServiceA: { label: 'Agent 服务 A', meta: 'POLE SERVICE · 稳定版', shortMeta: '稳定版' },
        agentServiceB: { label: 'Agent 服务 B', meta: 'POLE SERVICE · 候选版', shortMeta: '候选版' },
        agentService: { label: 'Agent 服务', meta: 'POLE SERVICE · 多版本', shortMeta: '多版本' },
        providerAdapter: { label: '模型适配器', meta: '运行时边界', shortMeta: '运行时' },
        primaryModel: { label: '主模型', meta: '主路径', shortMeta: '主路径' },
        fallbackModel: { label: '备用模型', meta: '按能力支持', shortMeta: '按需' },
        shadowEval: { label: '影子评估', meta: '不进入响应路径', shortMeta: '旁路' },
        mockResponse: { label: 'Mock 响应', meta: '按能力支持', shortMeta: '按需' },
      },
      governanceBand: {
        label: 'A/B 路由 · 限流 · 熔断 · 镜像 · MOCK',
        shortLabel: 'A/B · 限流 · 熔断',
        meta: '服务治理 · 执行范围取决于已接入数据面',
        shortMeta: '镜像 · MOCK · 数据面支持',
      },
      promptBand: {
        label: 'POLE AGENT PROMPT → 版本化发布',
        shortLabel: 'POLE AGENT PROMPT',
        meta: '内置提示词 + 操作指令 · 受控热更新',
        shortMeta: '版本化发布',
      },
      secretBand: {
        label: 'POLE SECRET → 仅供 PROVIDER ADAPTER',
        shortLabel: 'POLE SECRET',
        meta: '运行时解析 · 不进入模型上下文',
        shortMeta: '不进入模型上下文',
      },
      flow: {
        governanceView: '治理视图',
        request: '请求',
        mirrorMock: '镜像 / MOCK',
      },
      boundary: {
        desktop: 'A2A REGISTRY · 仅用于发现 · 不进入请求路径',
        mobileLine1: 'A2A REGISTRY · 仅用于发现',
        mobileLine2: '不进入请求路径',
      },
      legend: {
        governance: '治理视图',
        traffic: '请求流量',
        shadow: '镜像 / 旁路',
      },
    },
  },
  en: {
    flow: {
      kicker: 'ORGANIZATION ARCHITECTURE',
      title: 'Governance and component panorama',
      topicSelector: 'Choose an architecture topic',
      languageSelector: 'Switch architecture diagram language',
      frameStatus: (current: number, total: number, label: string) =>
        `Frame ${current} of ${total}: ${label}`,
      viewArchitecture: 'View full architecture',
      slides: {
        governance: {
          label: 'Governance flow',
          title: 'Apply one governance intent across connected AI service calls.',
          detail:
            'For an Agent hosted by Pole Service, connected data planes apply A/B routing, rate limiting, circuit breaking, mirroring, and mocks within their supported scope. Pole Agent prompts and model credentials follow separate release and custody paths.',
        },
        collaboration: {
          label: 'Components',
          title: 'One control plane connects multiple integration and execution paths.',
          detail:
            'Console manages change and Controller connects Kubernetes. Connected SDK and proxy runtimes consume control-plane capabilities according to their deployment model.',
        },
      },
    },
    collaboration: {
      aria:
        'Immersive Lattice.Hub component panorama. Console and Kubernetes Controller connect to Control Plane. Rust SDK, Limiter Server, and Envoy or Gateway use connected paths. A dashed line marks the evolving Pole Sidecar integration, while Specification forms the shared contract foundation.',
      planes: {
        managementCluster: 'MANAGEMENT & CLUSTER',
        management: 'MANAGEMENT',
        controlPlane: 'UNIFIED CONTROL PLANE',
        runtimeIntegration: 'RUNTIME & INTEGRATION',
        runtime: 'RUNTIME',
      },
      nodes: {
        console: { label: 'Console', meta: 'MANAGE · REVIEW', shortMeta: 'MANAGE' },
        controller: { label: 'K8s Controller', shortLabel: 'Controller', meta: 'RESOURCE SYNC', shortMeta: 'SYNC' },
        rustSdk: { label: 'Rust SDK', meta: 'PROXYLESS', shortMeta: 'PROXYLESS' },
        envoy: { label: 'Envoy / Gateway', meta: 'EXTERNAL RUNTIME', shortMeta: 'EXTERNAL' },
        sidecar: { label: 'Pole Sidecar', meta: 'EVOLVING PATH', shortMeta: 'EVOLVING' },
        limiter: { label: 'Limiter Server', shortLabel: 'Limiter', meta: 'DISTRIBUTED LIMITING', shortMeta: 'RUNTIME' },
      },
      contract: {
        label: 'SPECIFICATION',
        meta: 'SHARED CONTRACT ACROSS COMPONENTS',
        shortMeta: 'SHARED CONTRACT',
      },
      flow: {
        manage: 'MANAGE',
        distribute: 'DISTRIBUTE',
        execute: 'EXECUTE',
      },
      legend: {
        current: 'Connected today',
        evolving: 'Contract / optional / evolving',
      },
    },
    governance: {
      aria:
        'Immersive AI service governance panorama. A platform engineer publishes a governance view through Console or API. A sample Agent Gateway uses a connected SDK or proxy to apply conditional and weighted routing, rate limiting, and circuit breaking, with mirroring, mocks, or fallback paths where supported. Pole Agent prompts use versioned release. Pole Secret credentials resolve only inside the Provider Adapter and never enter the browser, logs, or model context. A2A Registry does not carry Agent task traffic.',
      planes: {
        managementControl: 'MANAGEMENT & CONTROL',
        aiTrafficExample: 'AI SERVICE TRAFFIC · EXAMPLE',
      },
      nodes: {
        engineer: { label: 'Platform Engineer', shortLabel: 'Engineer', meta: 'DEFINE · REVIEW', shortMeta: 'DEFINE' },
        consoleApi: { label: 'Console / API', meta: 'PUBLISH ONCE', shortMeta: 'PUBLISH ONCE' },
        userRequest: { label: 'User Request', meta: 'AGENT CALL', shortMeta: 'AGENT CALL' },
        agentGateway: { label: 'Agent Gateway', meta: 'POLE SERVICE · SDK / PROXY', shortMeta: 'POLE SERVICE' },
        agentServiceA: { label: 'Agent Service A', meta: 'POLE SERVICE · STABLE', shortMeta: 'STABLE' },
        agentServiceB: { label: 'Agent Service B', meta: 'POLE SERVICE · CANDIDATE', shortMeta: 'CANDIDATE' },
        agentService: { label: 'Agent Service', meta: 'POLE SERVICE · VERSIONS', shortMeta: 'VERSIONS' },
        providerAdapter: { label: 'Provider Adapter', meta: 'RUNTIME BOUNDARY', shortMeta: 'RUNTIME ONLY' },
        primaryModel: { label: 'Primary Model', meta: 'PRIMARY', shortMeta: 'PRIMARY' },
        fallbackModel: { label: 'Fallback Model', meta: 'WHEN SUPPORTED', shortMeta: 'SUPPORTED' },
        shadowEval: { label: 'Shadow Eval', meta: 'NO RESPONSE PATH', shortMeta: 'SIDE PATH' },
        mockResponse: { label: 'Mock Response', meta: 'WHEN SUPPORTED', shortMeta: 'SUPPORTED' },
      },
      governanceBand: {
        label: 'A/B ROUTE · RATE LIMIT · CIRCUIT BREAK · MIRROR · MOCK',
        shortLabel: 'A/B · LIMIT · BREAK',
        meta: 'SERVICE GOVERNANCE · EXECUTION DEPENDS ON CONNECTED DATA PLANE',
        shortMeta: 'MIRROR · MOCK · DATA PLANE SUPPORT',
      },
      promptBand: {
        label: 'POLE AGENT PROMPT → VERSIONED RELEASE',
        shortLabel: 'POLE AGENT PROMPT',
        meta: 'BUILT-IN PROMPT + OPERATOR INSTRUCTIONS · GUARDED HOT RELOAD',
        shortMeta: 'VERSIONED RELEASE',
      },
      secretBand: {
        label: 'POLE SECRET → PROVIDER ADAPTER ONLY',
        shortLabel: 'POLE SECRET',
        meta: 'RUNTIME RESOLVE · NEVER MODEL CONTEXT',
        shortMeta: 'NOT MODEL CONTEXT',
      },
      flow: {
        governanceView: 'GOVERNANCE VIEW',
        request: 'REQUEST',
        mirrorMock: 'MIRROR / MOCK',
      },
      boundary: {
        desktop: 'A2A REGISTRY · DISCOVERY ONLY · NOT REQUEST PATH',
        mobileLine1: 'A2A REGISTRY · DISCOVERY ONLY',
        mobileLine2: 'OUTSIDE REQUEST PATH',
      },
      legend: {
        governance: 'Governance view',
        traffic: 'Request traffic',
        shadow: 'Mirror / side path',
      },
    },
  },
} as const;

export function getArchitectureCopy(locale: ArchitectureLocale = DEFAULT_ARCHITECTURE_LOCALE) {
  return architectureCopy[locale];
}
