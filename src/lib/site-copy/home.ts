import type { SiteLocale } from './types';

export type HomeCopy = {
  metadata: {
    title: { absolute: string };
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lede: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
  };
  systemStrip: {
    ariaLabel: string;
    items: Array<{ index: string; label: string }>;
  };
  evidence: {
    kicker: string;
    title: string;
    titleBreak?: string;
    intro: string;
    imageAlt: string;
    captions: Array<{ label: string; text: string }>;
    action: { href: string; label: string };
  };
  release: {
    kicker: string;
    title: string;
    titleAccent: string;
    stepsAriaLabel: string;
    steps: Array<{ index: string; title: string; detail: string }>;
  };
  governance: {
    kicker: string;
    title: string;
    introSuffix: string;
    scopeItems: Array<{ label: string; tag: string }>;
    action: { href: string; label: string };
    imageAlt: string;
    imageCaption: string;
  };
  agent: {
    kicker: string;
    title: string;
    titleBreak?: string;
    copy: string;
    action: { href: string; label: string };
    boundariesAriaLabel: string;
    boundaries: Array<{ index: string; action: string; owner: string }>;
    note: string;
  };
  scope: {
    kicker: string;
    title: string;
    intro: string;
    items: Array<{ title: string; detail: string }>;
  };
  comparison: {
    kicker: string;
    title: string;
    intro: string;
    action: { href: string; label: string };
    relationships: Array<{
      index: string;
      products: string;
      title: string;
      detail: string;
    }>;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
  };
  footer: {
    brand: string;
    tagline: string;
    githubNote: string;
  };
};

const homeCopy = {
  'zh-CN': {
    metadata: {
      title: { absolute: 'Lattice.Hub 服务治理控制面' },
      description:
        'Lattice.Hub 是面向服务与 Agent 的 AI Native 服务治理控制面，统一运行环境、服务发现、配置、治理、身份与 AI 能力目录。变更先形成版本，再进入运行时。',
    },
    hero: {
      eyebrow: 'Pole control plane',
      title: 'AI Native 服务治理，',
      titleAccent: '一个控制面。',
      lede:
        '面向服务与 Agent 的 AI Native 控制面。发现、配置、治理与能力目录共用同一版本化发布语义。',
      primary: { href: '/docs', label: '阅读文档' },
      secondary: { href: '/architecture', label: '查看架构' },
    },
    systemStrip: {
      ariaLabel: '产品能力概览',
      items: [
        { index: 'PROTOCOLS', label: 'Polaris、Nacos、Apollo、Eureka 与 Envoy xDS v3' },
        { index: 'RELEASE', label: '草稿、版本、灰度、发布与回滚' },
        { index: 'RUNTIME', label: 'Rust / Thin SDK、Pole Sidecar 与 Proxy Mesh / Gateway' },
      ],
    },
    evidence: {
      kicker: '01 / Console',
      title: '控制面状态，真实可见。',
      intro:
        'Console 将组件、接口指标与延迟分布放进同一视图，用于检查控制面自身状态——不是独立的全链路观测平台。',
      imageAlt: 'Lattice.Hub Console 平台监控完整真实界面',
      captions: [
        { label: 'A', text: '当前 Console 真实界面 · Platform Metrics。' },
        { label: 'B', text: '界面证明能力存在；不把示意数字描述成线上运行指标。' },
      ],
      action: { href: '/product', label: '了解产品模型' },
    },
    release: {
      kicker: '02 / Release',
      title: '变更不是保存，',
      titleAccent: '是版本。',
      stepsAriaLabel: '发布语义',
      steps: [
        { index: '01 / DRAFT', title: '保存草稿', detail: '先记录变化，不直接改变运行态。' },
        { index: '02 / VERSION', title: '形成版本', detail: '配置生成不可变发布快照；治理规则保留版本记录。' },
        { index: '03 / RELEASE', title: '受控发布', detail: '通过灰度或全量流程，将已确认版本送入运行时。' },
        { index: '04 / ROLLBACK', title: '历史回滚', detail: '出现偏差时返回已知版本，而不是重新猜测旧状态。' },
      ],
    },
    governance: {
      kicker: '03 / Governance',
      title: '规则的作用域，和规则本身一样重要。',
      introSuffix: '，共享一致的资源表达与发布语义。',
      scopeItems: [
        { label: '服务调用范围', tag: 'WHO → WHOM' },
        { label: '规则与子规则', tag: 'POLICY' },
        { label: '版本与发布记录', tag: 'HISTORY' },
      ],
      action: { href: '/governance', label: '深入服务治理' },
      imageAlt: 'Lattice.Hub Console 治理规则详情真实界面，展示服务调用范围与熔断子规则',
      imageCaption: '真实治理详情：调用方、被调方、熔断粒度与子规则在同一上下文中确认。',
    },
    agent: {
      kicker: '04 / Pole Agent',
      title: 'Agent 准备变更，',
      titleBreak: '人决定发布。',
      copy:
        '在登录用户权限内读取上下文、生成不可变提案与差异预览；确认后只保存编辑态草稿。',
      action: { href: '/agent', label: '了解 Pole Agent' },
      boundariesAriaLabel: 'Pole Agent 权限边界',
      boundaries: [
        { index: '01', action: '读取已有配置', owner: 'Agent' },
        { index: '02', action: '生成不可变提案', owner: 'Agent' },
        { index: '03', action: '预览差异并确认', owner: '人' },
        { index: '04', action: '保存编辑态草稿', owner: 'Agent' },
      ],
      note:
        '发布、回滚与删除仍由确定性产品流程承担。当前写路径仅覆盖已有配置文件更新；治理规则写入、新建资源等仍未覆盖。',
    },
    scope: {
      kicker: '05 / Access',
      title: '不替换现有入口，统一背后的控制面。',
      intro: '从协议接入到运行时消费，每类资源都回到同一份版本化控制面视图。',
      items: [
        {
          title: '运行环境',
          detail: 'Namespace 表示环境，不表示租户；服务、配置与治理按环境隔离发布状态。',
        },
        {
          title: '协议接入',
          detail: '接入 Polaris gRPC / REST、Nacos v1 / v2、Apollo、Eureka 与 Envoy xDS v3。',
        },
        {
          title: '运行时视图',
          detail: 'Rust SDK、Thin SDK、Pole Sidecar 与 Proxy Mesh / Gateway 读取或承载版本化治理视图。',
        },
        {
          title: '能力目录',
          detail: 'MCP 与 A2A Registry 登记工具、Agent Card、技能和能力元数据，只承担注册发现。',
        },
      ],
    },
    comparison: {
      kicker: '06 / Compare',
      title: '不是所有服务治理产品，都在同一层。',
      intro: '先判断是保留入口、迁移控制面，还是组合 Mesh 数据面，再决定 Pole 应该负责什么。',
      action: { href: '/compare', label: '查看产品对比' },
      relationships: [
        {
          index: '01 / KEEP THE ENTRY',
          products: 'Nacos · Apollo',
          title: '兼容接入，渐进收敛',
          detail: '保留熟悉的客户端协议，把注册与配置逐步带入统一控制面。',
        },
        {
          index: '02 / COMPARE THE PLANE',
          products: 'PolarisMesh',
          title: '同层控制面参照',
          detail: '按服务、配置、治理、运行时与发布语义逐项比较，而不是只看功能名称。',
        },
        {
          index: '03 / COMPOSE THE RUNTIME',
          products: 'Istio · Kmesh',
          title: 'Mesh 与数据面关系',
          detail: '明确控制权边界；组合方向必须经过协议适配和真实流量验证。',
        },
      ],
    },
    finalCta: {
      eyebrow: 'Get started',
      title: '从文档开始。',
      primary: { href: '/docs', label: '阅读文档' },
      secondary: {
        href: 'https://github.com/lattice-hub/pole-control-plane',
        label: '查看源码',
      },
    },
    footer: {
      brand: 'Lattice.Hub',
      tagline: 'Open source AI Native service governance control plane.',
      githubNote: 'Open source on GitHub.',
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
      titleAccent: 'One control plane.',
      lede:
        'An AI Native control plane for services and Agents. Discovery, configuration, governance, and capability catalogs share one versioned release model.',
      primary: { href: '/docs', label: 'Read the docs' },
      secondary: { href: '/architecture', label: 'View architecture' },
    },
    systemStrip: {
      ariaLabel: 'Product capability overview',
      items: [
        { index: 'PROTOCOLS', label: 'Polaris, Nacos, Apollo, Eureka, and Envoy xDS v3' },
        { index: 'RELEASE', label: 'Draft, version, canary, release, and rollback' },
        { index: 'RUNTIME', label: 'Rust / Thin SDK, Pole Sidecar, and Proxy Mesh / Gateway' },
      ],
    },
    evidence: {
      kicker: '01 / Console',
      title: 'Control-plane state, visibly real.',
      intro:
        'The Console puts components, API metrics, and latency distributions in one view for inspecting the control plane itself—not a standalone full-stack APM platform.',
      imageAlt: 'Full Lattice.Hub Console platform metrics screen',
      captions: [
        { label: 'A', text: 'Current Console screen · Platform Metrics.' },
        { label: 'B', text: 'Screens prove capability exists; illustrative numbers are not production metrics.' },
      ],
      action: { href: '/product', label: 'Explore the product model' },
    },
    release: {
      kicker: '02 / Release',
      title: 'Change is not a save—',
      titleAccent: 'it is a version.',
      stepsAriaLabel: 'Release semantics',
      steps: [
        { index: '01 / DRAFT', title: 'Save draft', detail: 'Record the change without altering runtime state.' },
        { index: '02 / VERSION', title: 'Create version', detail: 'Configuration becomes an immutable release snapshot; governance rules keep version history.' },
        { index: '03 / RELEASE', title: 'Controlled release', detail: 'Promote the confirmed version through canary or full rollout.' },
        { index: '04 / ROLLBACK', title: 'Rollback', detail: 'Return to a known version when something drifts—do not guess the old state.' },
      ],
    },
    governance: {
      kicker: '03 / Governance',
      title: 'Rule scope matters as much as the rule itself.',
      introSuffix: ' share consistent resource expression and release semantics.',
      scopeItems: [
        { label: 'Service call scope', tag: 'WHO → WHOM' },
        { label: 'Rules and sub-rules', tag: 'POLICY' },
        { label: 'Versions and release history', tag: 'HISTORY' },
      ],
      action: { href: '/governance', label: 'Explore service governance' },
      imageAlt: 'Lattice.Hub Console governance rule detail showing call scope and circuit-breaker sub-rules',
      imageCaption: 'Real governance detail: caller, callee, breaker granularity, and sub-rules in one context.',
    },
    agent: {
      kicker: '04 / Pole Agent',
      title: 'Agent prepares change;',
      titleBreak: 'humans decide release.',
      copy:
        'Within signed-in user permissions, read context, produce immutable proposals and diff previews, and after confirmation save edit-state drafts only.',
      action: { href: '/agent', label: 'Learn about Pole Agent' },
      boundariesAriaLabel: 'Pole Agent permission boundary',
      boundaries: [
        { index: '01', action: 'Read existing configuration', owner: 'Agent' },
        { index: '02', action: 'Generate immutable proposal', owner: 'Agent' },
        { index: '03', action: 'Preview diff and confirm', owner: 'Human' },
        { index: '04', action: 'Save edit-state draft', owner: 'Agent' },
      ],
      note:
        'Release, rollback, and delete remain in deterministic product flows. The current write path covers updates to existing config files only; governance writes and new resources are not covered yet.',
    },
    scope: {
      kicker: '05 / Access',
      title: 'Keep existing entry points; unify the control plane behind them.',
      intro: 'From protocol access to runtime consumption, every resource type returns to the same versioned control-plane view.',
      items: [
        {
          title: 'Runtime environment',
          detail: 'Namespace means environment—not tenant. Services, configuration, and governance isolate release state per environment.',
        },
        {
          title: 'Protocol access',
          detail: 'Connect through Polaris gRPC / REST, Nacos v1 / v2, Apollo, Eureka, and Envoy xDS v3.',
        },
        {
          title: 'Runtime view',
          detail: 'Rust SDK, Thin SDK, Pole Sidecar, and Proxy Mesh / Gateway consume or carry versioned governance views.',
        },
        {
          title: 'Capability catalog',
          detail: 'MCP and A2A Registry register tools, Agent Cards, skills, and capability metadata for discovery only.',
        },
      ],
    },
    comparison: {
      kicker: '06 / Compare',
      title: 'Not every service governance product sits at the same layer.',
      intro: 'Decide whether you are keeping entry points, migrating the control plane, or composing a Mesh data plane—then decide what Pole should own.',
      action: { href: '/compare', label: 'Compare products' },
      relationships: [
        {
          index: '01 / KEEP THE ENTRY',
          products: 'Nacos · Apollo',
          title: 'Compatible access, gradual convergence',
          detail: 'Keep familiar client protocols while bringing registration and configuration into one control plane.',
        },
        {
          index: '02 / COMPARE THE PLANE',
          products: 'PolarisMesh',
          title: 'Peer control-plane reference',
          detail: 'Compare service, configuration, governance, runtime, and release semantics item by item—not just feature names.',
        },
        {
          index: '03 / COMPOSE THE RUNTIME',
          products: 'Istio · Kmesh',
          title: 'Mesh and data-plane relationship',
          detail: 'Draw clear ownership boundaries; composition requires protocol adaptation and real traffic validation.',
        },
      ],
    },
    finalCta: {
      eyebrow: 'Get started',
      title: 'Start with the docs.',
      primary: { href: '/docs', label: 'Read the docs' },
      secondary: {
        href: 'https://github.com/lattice-hub/pole-control-plane',
        label: 'View source',
      },
    },
    footer: {
      brand: 'Lattice.Hub',
      tagline: 'Open source AI Native service governance control plane.',
      githubNote: 'Open source on GitHub.',
    },
  },
} as const satisfies Record<SiteLocale, HomeCopy>;

export function getHomeCopy(locale: SiteLocale): HomeCopy {
  return homeCopy[locale];
}
