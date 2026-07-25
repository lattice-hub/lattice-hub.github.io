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
          title: '两类用户，两条版本路径，同一个 Agent Service。',
          detail:
            'User A 进入 BLUE 稳定版本，User B 进入 GREEN 体验版本；80/20 是示例分配。Gateway 先执行差异化限流，身份鉴权、Secret、镜像、Mock 与故障切换继续保护模型调用。',
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
        'AI 服务治理收益动态图：上层平台工程师发布治理视图，下层 User A 经过 Agent Gateway 进入同一 Agent Service 的 BLUE 稳定版本，User B 进入 GREEN 体验版本。分组限流保护下游容量，体验隔离避免新版本影响稳定用户；服务身份鉴权保护 Provider Adapter 调用，Pole Secret 仅在适配器内解析。镜像、Mock 与故障切换支持安全验证和持续可用。',
      planes: {
        managementControl: '管理与控制',
        aiTrafficExample: 'AI 服务流量 · 示例',
      },
      nodes: {
        engineer: { label: '平台工程师', shortLabel: '工程师', meta: '定义 · 审阅', shortMeta: '定义' },
        consoleApi: { label: 'Console / API', meta: '统一发布', shortMeta: '发布' },
        userRequest: { label: '用户请求', meta: 'AGENT 调用', shortMeta: 'AGENT 调用' },
        userA: { label: 'User A', meta: '稳定用户 · 示例 80%', shortMeta: '稳定 · 80%' },
        userB: { label: 'User B', meta: '体验用户 · 示例 20%', shortMeta: '体验 · 20%' },
        agentGateway: { label: 'Agent Gateway', meta: '按请求属性路由 · 分组限流', shortMeta: '分组限流 · 容量保护' },
        agentServiceA: { label: 'Agent Service', meta: 'BLUE · 稳定版本', shortMeta: 'BLUE · 稳定' },
        agentServiceB: { label: 'Agent Service', meta: 'GREEN · 体验版本', shortMeta: 'GREEN · 体验' },
        agentService: { label: 'Agent Service', meta: '同一服务 · 蓝绿版本', shortMeta: '同一逻辑服务' },
        providerAdapter: { label: '模型适配器', meta: '运行时边界', shortMeta: '运行时' },
        primaryModel: { label: '主模型', meta: '主路径', shortMeta: '主路径' },
        fallbackModel: { label: '备用模型', meta: '按能力支持', shortMeta: '按需' },
        shadowEval: { label: '影子评估', meta: '不进入响应路径', shortMeta: '用户无感评估' },
        mockResponse: { label: 'Mock 响应', meta: '按能力支持', shortMeta: '不调用真实模型' },
      },
      governanceBand: {
        label: '一次请求，穿过完整治理保护',
        shortLabel: '一次请求的治理旅程',
        meta: '每个阶段都改变流量状态，并产生可见收益',
        shortMeta: '流量变化 → 可见收益',
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
        blueTraffic: 'A · 示例 80% → BLUE',
        greenTraffic: 'B · 示例 20% → GREEN',
        serviceAuth: '服务身份调用鉴权',
        serviceAuthShort: '身份鉴权',
      },
      benefits: {
        limit: { title: '容量受保护', detail: '超额请求止于 GW' },
        rollout: { title: '体验隔离，发布更稳', detail: '稳定用户不受新版实验影响' },
        auth: { title: '服务身份鉴权', detail: '匿名调用被拒，授权后才访问模型' },
        resilience: { title: '故障仍可用', detail: '主模型异常时切至备用模型' },
        mirror: { title: '真实流量安全评估', detail: '复制请求，不影响用户响应' },
        mock: { title: '联调不依赖真实模型', detail: '演练请求在模型前短路' },
        prompt: { title: 'Prompt 变更可控', detail: '版本化、可审阅、可回滚' },
        secret: { title: '凭据不暴露', detail: '仅在模型适配器内解析' },
      },
      boundary: {
        desktop: 'A2A REGISTRY · 仅用于发现 · 不进入请求路径',
        mobileLine1: 'A2A REGISTRY · 仅用于发现',
        mobileLine2: '不进入请求路径',
      },
      legend: {
        governance: '治理视图',
        traffic: '请求 / 鉴权调用',
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
          title: 'Two user paths, two release versions, one Agent Service.',
          detail:
            'User A reaches stable BLUE while User B experiences GREEN; 80/20 is illustrative. The Gateway applies differentiated limits before identity auth, Secret, mirroring, mocks, and failover protect model calls.',
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
        'Animated AI service governance outcomes. A platform engineer publishes a governance view in the upper control layer. In the lower request layer, User A passes Agent Gateway to the BLUE stable version of one Agent Service, while User B reaches its GREEN experience version. Cohort limiting protects capacity and experience isolation keeps the stable cohort away from release experiments. Service identity auth protects Provider Adapter calls, while Secret, mirroring, mocks, and failover support private and resilient model access.',
      planes: {
        managementControl: 'MANAGEMENT & CONTROL',
        aiTrafficExample: 'AI SERVICE TRAFFIC · EXAMPLE',
      },
      nodes: {
        engineer: { label: 'Platform Engineer', shortLabel: 'Engineer', meta: 'DEFINE · REVIEW', shortMeta: 'DEFINE' },
        consoleApi: { label: 'Console / API', meta: 'PUBLISH ONCE', shortMeta: 'PUBLISH ONCE' },
        userRequest: { label: 'User Request', meta: 'AGENT CALL', shortMeta: 'AGENT CALL' },
        userA: { label: 'User A', meta: 'STABLE COHORT · SAMPLE 80%', shortMeta: 'STABLE · 80%' },
        userB: { label: 'User B', meta: 'EXPERIENCE COHORT · SAMPLE 20%', shortMeta: 'EXPERIENCE · 20%' },
        agentGateway: { label: 'Agent Gateway', meta: 'ATTRIBUTE ROUTING · COHORT LIMIT', shortMeta: 'COHORT LIMIT · CAPACITY' },
        agentServiceA: { label: 'Agent Service', meta: 'BLUE · STABLE VERSION', shortMeta: 'BLUE · STABLE' },
        agentServiceB: { label: 'Agent Service', meta: 'GREEN · EXPERIENCE VERSION', shortMeta: 'GREEN · EXPERIENCE' },
        agentService: { label: 'Agent Service', meta: 'ONE SERVICE · BLUE / GREEN', shortMeta: 'ONE LOGICAL SERVICE' },
        providerAdapter: { label: 'Provider Adapter', meta: 'RUNTIME BOUNDARY', shortMeta: 'RUNTIME ONLY' },
        primaryModel: { label: 'Primary Model', meta: 'PRIMARY', shortMeta: 'PRIMARY' },
        fallbackModel: { label: 'Fallback Model', meta: 'WHEN SUPPORTED', shortMeta: 'SUPPORTED' },
        shadowEval: { label: 'Shadow Eval', meta: 'NO RESPONSE PATH', shortMeta: 'NO USER IMPACT' },
        mockResponse: { label: 'Mock Response', meta: 'WHEN SUPPORTED', shortMeta: 'NO LIVE MODEL' },
      },
      governanceBand: {
        label: 'ONE REQUEST, PROTECTED AT EVERY GOVERNANCE STAGE',
        shortLabel: 'ONE GOVERNED REQUEST',
        meta: 'EACH STAGE CHANGES TRAFFIC STATE AND PRODUCES A VISIBLE OUTCOME',
        shortMeta: 'TRAFFIC CHANGE → OUTCOME',
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
        blueTraffic: 'A · SAMPLE 80% → BLUE',
        greenTraffic: 'B · SAMPLE 20% → GREEN',
        serviceAuth: 'SERVICE IDENTITY AUTH',
        serviceAuthShort: 'ID AUTH',
      },
      benefits: {
        limit: { title: 'CAPACITY PROTECTED', detail: 'EXCESS STOPS AT GW' },
        rollout: { title: 'ISOLATED EXPERIENCE', detail: 'STABLE USERS AVOID RELEASE EXPERIMENTS' },
        auth: { title: 'SERVICE IDENTITY AUTH', detail: 'ANONYMOUS CALLS DENIED BEFORE MODEL ACCESS' },
        resilience: { title: 'AVAILABLE THROUGH FAILURE', detail: 'PRIMARY FAILS, FALLBACK SERVES' },
        mirror: { title: 'SAFE REAL-TRAFFIC EVAL', detail: 'COPY ONLY, NO USER IMPACT' },
        mock: { title: 'TEST WITHOUT LIVE MODEL', detail: 'DRILL REQUEST SHORT-CIRCUITS' },
        prompt: { title: 'CONTROLLED PROMPT CHANGE', detail: 'VERSIONED, REVIEWABLE, REVERSIBLE' },
        secret: { title: 'CREDENTIALS STAY PRIVATE', detail: 'RESOLVED ONLY INSIDE ADAPTER' },
      },
      boundary: {
        desktop: 'A2A REGISTRY · DISCOVERY ONLY · NOT REQUEST PATH',
        mobileLine1: 'A2A REGISTRY · DISCOVERY ONLY',
        mobileLine2: 'OUTSIDE REQUEST PATH',
      },
      legend: {
        governance: 'Governance view',
        traffic: 'Request / auth call',
        shadow: 'Mirror / side path',
      },
    },
  },
} as const;

export function getArchitectureCopy(locale: ArchitectureLocale = DEFAULT_ARCHITECTURE_LOCALE) {
  return architectureCopy[locale];
}
