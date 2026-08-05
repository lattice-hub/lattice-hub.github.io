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
    disclaimer: string;
    regionLabel: string;
    expandLabel: string;
    closeLabel: string;
    prevLabel: string;
    nextLabel: string;
    slides: Array<{ src: string; srcDark: string; label: string; note: string; alt: string }>;
    action: { href: string; label: string };
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
      title: { absolute: 'Lattice.Hub 服务治理控制面' },
      description:
        'Lattice.Hub 是面向服务与 Agent 的 AI Native 服务治理控制面，统一运行环境、服务发现、配置、治理、身份与 AI 能力目录。变更先形成版本，再进入运行时。',
    },
    hero: {
      eyebrow: 'Pole control plane',
      title: 'AI Native 服务治理，',
      accent: '一个控制面。',
      lede:
        '面向服务与 Agent 的 AI Native 控制面。发现、配置、治理与能力目录共用同一版本化发布语义。',
      primary: { href: '/docs', label: '阅读文档' },
      secondary: { href: '/architecture', label: '查看架构' },
      items: [
        { index: '01', title: 'MODEL', detail: '运行环境与资源模型' },
        { index: '02', title: 'RELEASE', detail: '草稿 → 版本 → 灰度 → 回滚' },
        { index: '03', title: 'RUNTIME', detail: 'SDK · Sidecar · Gateway' },
      ],
    },
    evidence: {
      heading: {
        index: '01 / Console',
        title: '控制面状态，真实可见。',
        intro:
          '以下截图来自本地运行的 Lattice.Hub Console：监控、治理、发现、配置与 AI 能力目录共用同一控制面视图。',
      },
      disclaimer: '真实 Console 界面证据 · 不将本地环境数据描述为线上运维遥测。',
      regionLabel: 'Console 界面轮播',
      expandLabel: '查看大图',
      closeLabel: '关闭大图',
      prevLabel: '上一张',
      nextLabel: '下一张',
      slides: [
        {
          src: '/product/console-carousel-metrics.webp',
          srcDark: '/product/console-carousel-metrics-dark.webp',
          label: 'Platform Metrics',
          note: '控制面组件与接口指标',
          alt: 'Lattice.Hub Console 平台监控真实界面',
        },
        {
          src: '/product/console-carousel-governance.webp',
          srcDark: '/product/console-carousel-governance-dark.webp',
          label: 'Governance Workbench',
          note: '九类治理规则工作台',
          alt: 'Lattice.Hub Console 治理工作台真实界面',
        },
        {
          src: '/product/console-carousel-services.webp',
          srcDark: '/product/console-carousel-services-dark.webp',
          label: 'Service Discovery',
          note: '服务注册与实例视图',
          alt: 'Lattice.Hub Console 服务发现真实界面',
        },
        {
          src: '/product/console-carousel-config.webp',
          srcDark: '/product/console-carousel-config-dark.webp',
          label: 'Configuration',
          note: '配置分组与发布管理',
          alt: 'Lattice.Hub Console 配置中心真实界面',
        },
        {
          src: '/product/console-carousel-mcp.webp',
          srcDark: '/product/console-carousel-mcp-dark.webp',
          label: 'MCP Registry',
          note: 'AI 工具能力目录',
          alt: 'Lattice.Hub Console MCP Registry 真实界面',
        },
        {
          src: '/product/console-carousel-a2a.webp',
          srcDark: '/product/console-carousel-a2a-dark.webp',
          label: 'A2A Registry',
          note: 'Agent Card 与技能注册',
          alt: 'Lattice.Hub Console A2A Registry 真实界面',
        },
        {
          src: '/product/console-carousel-agent.webp',
          srcDark: '/product/console-carousel-agent-dark.webp',
          label: 'Pole Agent',
          note: '人工确认后的变更工作台',
          alt: 'Lattice.Hub Console Pole Agent 工作台真实界面',
        },
      ],
      action: { href: '/docs', label: '阅读文档' },
    },
    howItWorks: {
      heading: {
        index: '02 / Release',
        title: '变更不是保存，是版本。',
        intro: '不改变客户端习惯，改变背后的控制方式。协议兼容、领域建模与发布语义各自独立。',
      },
      steps: [
        { index: '01 / DRAFT', title: '保存草稿', detail: '先记录变化，不直接改变运行态。' },
        { index: '02 / VERSION', title: '形成版本', detail: '配置生成不可变发布快照；治理规则保留版本记录。' },
        { index: '03 / RELEASE', title: '受控发布', detail: '通过灰度或全量流程，将已确认版本送入运行时。' },
        { index: '04 / CONSUME', title: '运行时消费', detail: 'Rust SDK、Thin SDK、Pole Sidecar 与 Gateway 读取或承载同一份治理视图。' },
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
        { index: '01 / ENVIRONMENT', title: '运行环境', detail: 'Namespace 表示环境，不表示租户。同一逻辑资源在开发、预发与生产各自隔离发布状态。' },
        { index: '02 / DISCOVERY', title: '服务发现', detail: '统一多协议注册、发现、心跳与实例视图，不要求客户端迁移到单一协议。' },
        { index: '03 / CONFIG', title: '配置中心', detail: '以编辑、版本、发布与回滚区分“正在改什么”和“运行时正在使用什么”。' },
        { index: '04 / GOVERNANCE', title: '服务治理', detail: '九类治理规则共享作用域、版本与发布语义，避免不同策略各自为政。' },
        { index: '05 / IDENTITY', title: '身份与权限', detail: '分别处理管理面资源授权与数据面服务身份，明确“谁能改”和“谁在调用”。' },
        { index: '06 / REGISTRY', title: 'AI 能力目录', detail: 'MCP 与 A2A Registry 登记工具、Agent Card、技能和能力元数据，负责注册与发现。' },
      ],
    },
    productTopics: {
      heading: {
        index: '04 / Topics',
        title: '继续深入三个工作面。',
        intro: '治理发布、Agent 变更边界，以及与同类产品的关系分层——专题页各自展开。',
      },
    },
    cta: {
      kicker: 'Get started',
      title: '从文档开始。',
      primary: { href: '/docs', label: '阅读文档' },
      secondary: { href: 'https://github.com/lattice-hub/pole-control-plane', label: '查看源码' },
    },
  },
  en: {
    metadata: {
      title: { absolute: 'Lattice.Hub Service Governance Control Plane' },
      description:
        'Lattice.Hub is an AI Native service governance control plane for services and Agents—unifying runtime environments, discovery, configuration, governance, identity, and AI capability catalogs. Changes become versions first, then enter runtime.',
    },
    hero: {
      eyebrow: 'Pole control plane',
      title: 'AI Native service governance.',
      accent: 'One control plane.',
      lede:
        'An AI Native control plane for services and Agents. Discovery, configuration, governance, and capability catalogs share one versioned release model.',
      primary: { href: '/docs', label: 'Read the docs' },
      secondary: { href: '/architecture', label: 'View architecture' },
      items: [
        { index: '01', title: 'MODEL', detail: 'Runtime environments and resource model' },
        { index: '02', title: 'RELEASE', detail: 'Draft → version → canary → rollback' },
        { index: '03', title: 'RUNTIME', detail: 'SDK · Sidecar · Gateway' },
      ],
    },
    evidence: {
      heading: {
        index: '01 / Console',
        title: 'Control-plane state, visibly real.',
        intro:
          'Screens below are from a local Lattice.Hub Console: metrics, governance, discovery, configuration, and AI capability catalogs share one control-plane view.',
      },
      disclaimer: 'Real Console UI evidence · local environment data is not described as production telemetry.',
      regionLabel: 'Console UI carousel',
      expandLabel: 'View larger image',
      closeLabel: 'Close larger image',
      prevLabel: 'Previous slide',
      nextLabel: 'Next slide',
      slides: [
        {
          src: '/product/console-carousel-metrics.webp',
          srcDark: '/product/console-carousel-metrics-dark.webp',
          label: 'Platform Metrics',
          note: 'Control-plane components and API metrics',
          alt: 'Lattice.Hub Console platform metrics screen',
        },
        {
          src: '/product/console-carousel-governance.webp',
          srcDark: '/product/console-carousel-governance-dark.webp',
          label: 'Governance Workbench',
          note: 'Nine governance rule types in one workbench',
          alt: 'Lattice.Hub Console governance workbench screen',
        },
        {
          src: '/product/console-carousel-services.webp',
          srcDark: '/product/console-carousel-services-dark.webp',
          label: 'Service Discovery',
          note: 'Service registration and instance views',
          alt: 'Lattice.Hub Console service discovery screen',
        },
        {
          src: '/product/console-carousel-config.webp',
          srcDark: '/product/console-carousel-config-dark.webp',
          label: 'Configuration',
          note: 'Configuration groups and release management',
          alt: 'Lattice.Hub Console configuration center screen',
        },
        {
          src: '/product/console-carousel-mcp.webp',
          srcDark: '/product/console-carousel-mcp-dark.webp',
          label: 'MCP Registry',
          note: 'AI tool capability catalog',
          alt: 'Lattice.Hub Console MCP Registry screen',
        },
        {
          src: '/product/console-carousel-a2a.webp',
          srcDark: '/product/console-carousel-a2a-dark.webp',
          label: 'A2A Registry',
          note: 'Agent Card and skill registration',
          alt: 'Lattice.Hub Console A2A Registry screen',
        },
        {
          src: '/product/console-carousel-agent.webp',
          srcDark: '/product/console-carousel-agent-dark.webp',
          label: 'Pole Agent',
          note: 'Human-gated change workspace',
          alt: 'Lattice.Hub Console Pole Agent workspace screen',
        },
      ],
      action: { href: '/docs', label: 'Read the docs' },
    },
    howItWorks: {
      heading: {
        index: '02 / Release',
        title: 'Change is not a save—it is a version.',
        intro: 'Keep client habits; change how the plane is controlled. Protocol compatibility, domain modeling, and release semantics stay distinct.',
      },
      steps: [
        { index: '01 / DRAFT', title: 'Save draft', detail: 'Record the change without altering runtime state.' },
        { index: '02 / VERSION', title: 'Create version', detail: 'Configuration becomes an immutable release snapshot; governance rules keep version history.' },
        { index: '03 / RELEASE', title: 'Controlled release', detail: 'Promote the confirmed version through canary or full rollout.' },
        { index: '04 / CONSUME', title: 'Runtime consume', detail: 'Rust SDK, Thin SDK, Pole Sidecar, and Gateway read or carry the same governance view.' },
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
        { index: '01 / ENVIRONMENT', title: 'Runtime environment', detail: 'Namespace means environment—not tenant. Dev, staging, and production isolate release state for the same logical resource.' },
        { index: '02 / DISCOVERY', title: 'Service discovery', detail: 'Unify multi-protocol registration, discovery, heartbeats, and instance views without forcing a single client protocol.' },
        { index: '03 / CONFIG', title: 'Configuration center', detail: 'Separate “what is being edited” from “what runtime is using” through edit, version, release, and rollback.' },
        { index: '04 / GOVERNANCE', title: 'Service governance', detail: 'Nine governance rule types share scope, version, and release semantics instead of isolated policy silos.' },
        { index: '05 / IDENTITY', title: 'Identity and permissions', detail: 'Management-plane resource authorization and data-plane service identity answer “who may change” and “who is calling.”' },
        { index: '06 / REGISTRY', title: 'AI capability catalog', detail: 'MCP and A2A Registry register tools, Agent Cards, skills, and capability metadata for discovery.' },
      ],
    },
    productTopics: {
      heading: {
        index: '04 / Topics',
        title: 'Three surfaces to go deeper.',
        intro: 'Governance release, Agent change boundaries, and layered product relationships—each topic page expands without repeating this model.',
      },
    },
    cta: {
      kicker: 'Get started',
      title: 'Start with the docs.',
      primary: { href: '/docs', label: 'Read the docs' },
      secondary: { href: 'https://github.com/lattice-hub/pole-control-plane', label: 'View source' },
    },
  },
} as const satisfies Record<SiteLocale, ProductCopy>;

export function getProductCopy(locale: SiteLocale): ProductCopy {
  return productCopy[locale];
}
