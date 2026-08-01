import type { SiteLocale } from './types';

export type ProductCopy = {
  metadata: {
    title: { absolute: string };
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    lede: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
    items: Array<{ index: string; title: string; detail: string }>;
  };
  evidence: {
    heading: { index: string; title: string; intro: string };
    imageAlt: string;
    captionLabel: string;
    captionNote: string;
  };
  howItWorks: {
    heading: { index: string; title: string; intro: string };
    steps: Array<{ index: string; title: string; detail: string }>;
  };
  capabilityMap: {
    heading: { index: string; title: string; intro: string };
    capabilities: Array<{ index: string; title: string; detail: string }>;
  };
  productTopics: {
    heading: { index: string; title: string; intro: string };
  };
  governance: {
    index: string;
    title: string;
    intro: string;
    note: string;
    action: { href: string; label: string };
    imageAlt: string;
    captionLabel: string;
    captionNote: string;
  };
  accessRuntime: {
    heading: { index: string; title: string; intro: string };
    protocolLabel: string;
    runtimeLabel: string;
    protocols: Array<{ index: string; name: string; detail: string }>;
    runtimes: Array<{ index: string; name: string; detail: string }>;
  };
  boundaries: {
    heading: { index: string; title: string; intro: string };
    items: Array<{ index: string; title: string; detail: string }>;
  };
  cta: {
    kicker: string;
    title: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
  };
};

const productCopy = {
  'zh-CN': {
    metadata: {
      title: { absolute: '产品｜Lattice.Hub 服务治理控制面' },
      description:
        '了解 Lattice.Hub 如何统一运行环境、服务发现、配置、治理、身份与 AI 能力目录，并通过版本化发布让配置与治理变化可解释、可发布、可回退。',
    },
    hero: {
      eyebrow: 'POLE CONTROL PLANE',
      title: '一个控制面，',
      accent: '统一服务变化的入口。',
      lede:
        'Lattice.Hub 将运行环境、服务发现、配置、治理、身份与 AI 能力目录收进同一个控制面。现有客户端继续使用熟悉的协议；需要发布的配置与治理变化，则进入可解释、可发布、可回退的版本链。',
      primary: { href: '/docs', label: '阅读产品文档' },
      secondary: { href: '/architecture', label: '查看组件架构' },
      items: [
        { index: '01', title: 'MODEL', detail: '运行环境与资源模型' },
        { index: '02', title: 'RELEASE', detail: '版本化发布语义' },
        { index: '03', title: 'RUNTIME', detail: '多形态运行时视图' },
      ],
    },
    evidence: {
      heading: {
        index: '01 / PRODUCT EVIDENCE',
        title: '控制面的状态，应该真实可见。',
        intro:
          'Console 将组件、接口指标与延迟分布放进同一工作视图，帮助操作者判断控制面自身是否健康。以下为当前产品真实界面，不使用概念图替代已实现能力。',
      },
      imageAlt: 'Lattice.Hub Console 平台监控真实界面',
      captionLabel: 'Console · Platform Metrics',
      captionNote: '产品界面用于证明能力存在，不将本地测试数据描述为线上运行指标。',
    },
    howItWorks: {
      heading: {
        index: '02 / HOW IT WORKS',
        title: '不改变客户端习惯，改变背后的控制方式。',
        intro: '从接入到运行时消费，每一步都有独立职责；协议兼容、领域建模与发布语义不会混成一个黑盒。',
      },
      steps: [
        { index: '01 / CONNECT', title: '接入', detail: '保留 Polaris、Nacos、Apollo、Eureka 与 Envoy xDS v3 等已有客户端入口。' },
        { index: '02 / MODEL', title: '建模', detail: '把服务、配置、治理、身份与能力目录放入明确的运行环境边界。' },
        { index: '03 / RELEASE', title: '发布', detail: '配置与治理变化经过确认后形成发布版本，再通过灰度或全量流程进入运行态。' },
        { index: '04 / CONSUME', title: '消费', detail: 'Thin SDK、Pole Sidecar 与 Gateway 消费治理视图；Controller 同步资源并编排接入。' },
      ],
    },
    capabilityMap: {
      heading: {
        index: '03 / CAPABILITY MAP',
        title: '六类资源，一套控制面语言。',
        intro:
          '能力边界各自清晰，并共享运行环境与身份上下文；配置和治理进一步共享版本化发布语义。操作者因此能从一次变化追溯到它的作用域和运行状态。',
      },
      capabilities: [
        { index: '01 / ENVIRONMENT', title: '运行环境', detail: 'Namespace 承载同一逻辑资源的开发、预发与生产实例，并隔离各自的发布状态。' },
        { index: '02 / DISCOVERY', title: '服务发现', detail: '统一多协议注册、发现、心跳与实例视图，不要求客户端迁移到单一协议。' },
        { index: '03 / CONFIG', title: '配置中心', detail: '以编辑、版本、发布与回滚区分“正在改什么”和“运行时正在使用什么”。' },
        { index: '04 / GOVERNANCE', title: '服务治理', detail: '九类治理规则共享作用域、版本与发布语义，避免不同策略各自为政。' },
        { index: '05 / IDENTITY', title: '身份与权限', detail: '分别处理管理面资源授权与数据面服务身份，明确“谁能改”和“谁在调用”。' },
        { index: '06 / REGISTRY', title: 'AI 能力目录', detail: 'MCP 与 A2A Registry 登记工具、Agent Card、技能和能力元数据，负责注册与发现。' },
      ],
    },
    productTopics: {
      heading: {
        index: '04 / PRODUCT TOPICS',
        title: '进入控制面的三个关键工作面。',
        intro: '产品页说明整体模型；专题页继续展开治理发布、智能变更与产品关系的具体边界。',
      },
    },
    governance: {
      index: '05 / GOVERNANCE',
      title: '先确认作用域，再讨论规则。',
      intro:
        '调用方、被调方、规则内容与版本历史共同构成一条完整治理记录。管理面所见的编辑内容，与运行时正在消费的发布版本始终分离。',
      note: '治理不是控制面中的附加表单，而是有明确作用域与发布生命周期的一等资源。',
      action: { href: '/governance', label: '深入服务治理' },
      imageAlt: 'Lattice.Hub Console 治理规则详情真实界面',
      captionLabel: 'Console · Governance Scope',
      captionNote: '服务调用范围、策略与子规则在同一上下文中确认。',
    },
    accessRuntime: {
      heading: {
        index: '06 / ACCESS & RUNTIME',
        title: '入口可以不同，运行视图必须确定。',
        intro: '服务端兼容多类既有协议，运行时则按部署形态选择合适的消费方式。控制面统一模型，不强制统一所有技术栈。',
      },
      protocolLabel: 'PROTOCOL ACCESS',
      runtimeLabel: 'RUNTIME CONSUMERS',
      protocols: [
        { index: '01', name: 'Polaris', detail: 'gRPC / REST' },
        { index: '02', name: 'Nacos', detail: 'v1 / v2' },
        { index: '03', name: 'Apollo', detail: '配置协议' },
        { index: '04', name: 'Eureka', detail: '注册发现' },
        { index: '05', name: 'Envoy', detail: 'xDS v3' },
      ],
      runtimes: [
        { index: '01', name: 'Thin SDK', detail: '应用内直接读取治理视图' },
        { index: '02', name: 'Pole Sidecar', detail: '在本地代理层执行治理' },
        { index: '03', name: 'Proxy Mesh / Gateway', detail: '在集中或网格数据面消费策略' },
        { index: '04', name: 'Kubernetes Controller', detail: '连接集群资源与控制面模型' },
      ],
    },
    boundaries: {
      heading: {
        index: '07 / CLEAR BOUNDARIES',
        title: '产品边界，也是可信度的一部分。',
        intro: '我们只描述当前控制面真正承担的职责，不把相邻系统能力包装成已经实现的承诺。',
      },
      items: [
        { index: '01', title: '兼容，不强制替换', detail: '控制面兼容既有协议入口；它不是要求所有应用一次性迁移的新客户端。' },
        { index: '02', title: '观测，不冒充 APM', detail: 'Console 展示控制面自身指标与状态；它不是独立的全链路可观测平台。' },
        { index: '03', title: '目录，不承担执行', detail: 'MCP 与 A2A Registry 负责能力登记和发现，不承担 Agent 任务或运行时托管。' },
        { index: '04', title: '变更，不跳过发布', detail: '配置与治理的保存，以及 Agent 配置提案写入草稿，都不等于进入运行态。' },
      ],
    },
    cta: {
      kicker: 'START WITH THE MODEL',
      title: '从一份确定的控制面视图开始。',
      primary: { href: '/docs', label: '阅读文档' },
      secondary: { href: 'https://github.com/lattice-hub/pole-control-plane', label: '查看源码' },
    },
  },
  en: {
    metadata: {
      title: { absolute: 'Product | Lattice.Hub Service Governance Control Plane' },
      description:
        'Learn how Lattice.Hub unifies runtime environments, service discovery, configuration, governance, identity, and AI capability catalogs—and how versioned release makes configuration and governance changes explainable, publishable, and reversible.',
    },
    hero: {
      eyebrow: 'POLE CONTROL PLANE',
      title: 'One control plane, ',
      accent: 'one entry for service change.';
      lede:
        'Lattice.Hub brings runtime environments, service discovery, configuration, governance, identity, and AI capability catalogs into one control plane. Existing clients keep familiar protocols; configuration and governance changes that must ship enter an explainable, publishable, reversible version chain.',
      primary: { href: '/docs', label: 'Read product docs' },
      secondary: { href: '/architecture', label: 'View component architecture' },
      items: [
        { index: '01', title: 'MODEL', detail: 'Runtime environments and resource model' },
        { index: '02', title: 'RELEASE', detail: 'Versioned release semantics' },
        { index: '03', title: 'RUNTIME', detail: 'Multiple runtime consumption shapes' },
      ],
    },
    evidence: {
      heading: {
        index: '01 / PRODUCT EVIDENCE',
        title: 'Control-plane health should be visibly real.',
        intro:
          'The Console puts components, API metrics, and latency distributions in one workspace so operators can judge whether the control plane itself is healthy. Screens below are current product UI—not concept art standing in for shipped capability.',
      },
      imageAlt: 'Lattice.Hub Console platform metrics screen',
      captionLabel: 'Console · Platform Metrics',
      captionNote: 'Product screens prove capability exists; local test data is not described as production metrics.',
    },
    howItWorks: {
      heading: {
        index: '02 / HOW IT WORKS',
        title: 'Keep client habits; change how the plane is controlled.',
        intro: 'From access to runtime consumption, each step has a distinct job—protocol compatibility, domain modeling, and release semantics are not collapsed into one black box.',
      },
      steps: [
        { index: '01 / CONNECT', title: 'Connect', detail: 'Keep existing client entry points for Polaris, Nacos, Apollo, Eureka, and Envoy xDS v3.' },
        { index: '02 / MODEL', title: 'Model', detail: 'Place services, configuration, governance, identity, and capability catalogs inside clear runtime environment boundaries.' },
        { index: '03 / RELEASE', title: 'Release', detail: 'Confirmed configuration and governance changes become release versions, then enter runtime through canary or full rollout.' },
        { index: '04 / CONSUME', title: 'Consume', detail: 'Thin SDK, Pole Sidecar, and Gateway consume governance views; Controller syncs resources and orchestrates access.' },
      ],
    },
    capabilityMap: {
      heading: {
        index: '03 / CAPABILITY MAP',
        title: 'Six resource types, one control-plane language.',
        intro:
          'Capability boundaries stay distinct while sharing runtime environment and identity context; configuration and governance further share versioned release semantics. Operators can trace a change back to its scope and runtime state.',
      },
      capabilities: [
        { index: '01 / ENVIRONMENT', title: 'Runtime environment', detail: 'Namespace holds dev, staging, and production instances of the same logical resource and isolates their release state.' },
        { index: '02 / DISCOVERY', title: 'Service discovery', detail: 'Unify multi-protocol registration, discovery, heartbeats, and instance views without forcing a single client protocol.' },
        { index: '03 / CONFIG', title: 'Configuration center', detail: 'Separate “what is being edited” from “what runtime is using” through edit, version, release, and rollback.' },
        { index: '04 / GOVERNANCE', title: 'Service governance', detail: 'Nine governance rule types share scope, version, and release semantics instead of isolated policy silos.' },
        { index: '05 / IDENTITY', title: 'Identity and permissions', detail: 'Management-plane resource authorization and data-plane service identity answer “who may change” and “who is calling.”' },
        { index: '06 / REGISTRY', title: 'AI capability catalog', detail: 'MCP and A2A Registry register tools, Agent Cards, skills, and capability metadata for discovery.' },
      ],
    },
    productTopics: {
      heading: {
        index: '04 / PRODUCT TOPICS',
        title: 'Three key surfaces into the control plane.',
        intro: 'The product page explains the overall model; topic pages expand governance release, intelligent change, and product relationships.',
      },
    },
    governance: {
      index: '05 / GOVERNANCE',
      title: 'Confirm scope before debating rules.',
      intro:
        'Caller, callee, rule content, and version history form one complete governance record. What management sees in edit state stays separate from the release version runtime consumes.',
      note: 'Governance is not an extra form in the control plane—it is a first-class resource with explicit scope and release lifecycle.',
      action: { href: '/governance', label: 'Explore service governance' },
      imageAlt: 'Lattice.Hub Console governance rule detail screen',
      captionLabel: 'Console · Governance Scope',
      captionNote: 'Service call scope, policy, and sub-rules confirmed in one context.',
    },
    accessRuntime: {
      heading: {
        index: '06 / ACCESS & RUNTIME',
        title: 'Entry points may differ; the runtime view must be deterministic.',
        intro: 'The server supports multiple legacy protocols; runtime picks the right consumption shape for each deployment. One control-plane model—without forcing one stack everywhere.',
      },
      protocolLabel: 'PROTOCOL ACCESS',
      runtimeLabel: 'RUNTIME CONSUMERS',
      protocols: [
        { index: '01', name: 'Polaris', detail: 'gRPC / REST' },
        { index: '02', name: 'Nacos', detail: 'v1 / v2' },
        { index: '03', name: 'Apollo', detail: 'Configuration protocol' },
        { index: '04', name: 'Eureka', detail: 'Registration and discovery' },
        { index: '05', name: 'Envoy', detail: 'xDS v3' },
      ],
      runtimes: [
        { index: '01', name: 'Thin SDK', detail: 'Read governance views in-process' },
        { index: '02', name: 'Pole Sidecar', detail: 'Enforce governance at the local proxy layer' },
        { index: '03', name: 'Proxy Mesh / Gateway', detail: 'Consume policies in centralized or mesh data planes' },
        { index: '04', name: 'Kubernetes Controller', detail: 'Connect cluster resources to the control-plane model' },
      ],
    },
    boundaries: {
      heading: {
        index: '07 / CLEAR BOUNDARIES',
        title: 'Product boundaries are part of credibility.',
        intro: 'We describe only what the control plane actually owns today—not adjacent capabilities dressed up as shipped promises.',
      },
      items: [
        { index: '01', title: 'Compatible, not forced replacement', detail: 'The control plane supports legacy protocol entry points; it is not a new client that demands a one-shot migration.' },
        { index: '02', title: 'Observability, not APM impersonation', detail: 'The Console shows control-plane metrics and state—it is not a standalone full-stack observability platform.' },
        { index: '03', title: 'Catalog, not execution', detail: 'MCP and A2A Registry register and discover capabilities; they do not run Agent tasks or host runtimes.' },
        { index: '04', title: 'Change, not skipped release', detail: 'Saving configuration and governance—or Agent config proposals written as drafts—does not equal live runtime state.' },
      ],
    },
    cta: {
      kicker: 'START WITH THE MODEL',
      title: 'Start from one deterministic control-plane view.',
      primary: { href: '/docs', label: 'Read the docs' },
      secondary: { href: 'https://github.com/lattice-hub/pole-control-plane', label: 'View source' },
    },
  },
} as const satisfies Record<SiteLocale, ProductCopy>;

export function getProductCopy(locale: SiteLocale): ProductCopy {
  return productCopy[locale];
}
