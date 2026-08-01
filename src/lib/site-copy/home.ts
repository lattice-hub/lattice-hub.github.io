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
        'Lattice.Hub 将运行环境、服务发现、配置、治理、身份与 AI 能力目录收进同一个控制面。变更先形成版本，再由确定性发布流程进入运行时。',
    },
    hero: {
      eyebrow: 'Service governance control plane',
      title: '把服务变化，',
      titleAccent: '收进一个控制面。',
      lede:
        'Lattice.Hub 让 AI 服务的路由、限流、熔断、镜像与 Mock 共享同一治理视图。Pole Agent 的 Prompt 受控发布；模型凭据由 Pole Secret 仅在运行时解析，不进入浏览器、日志或模型上下文。',
      primary: { href: '/docs', label: '开始阅读文档' },
      secondary: { href: '/architecture', label: '查看完整架构' },
    },
    systemStrip: {
      ariaLabel: '产品能力概览',
      items: [
        { index: '01 / PROTOCOLS', label: 'Polaris、Nacos、Apollo、Eureka 与 Envoy xDS v3' },
        { index: '02 / RELEASE', label: '草稿、版本、灰度、发布与回滚' },
        { index: '03 / RUNTIME', label: 'Rust SDK、Pole Sidecar 与 Proxy Mesh / Gateway' },
      ],
    },
    evidence: {
      kicker: '01 / Product evidence',
      title: '控制面应该可见，',
      titleBreak: '而不是靠想象。',
      intro:
        '当前 Console 将控制面组件、接口指标与延迟分布放进同一视图，帮助操作者检查系统状态和变化影响。它是控制面自身的观测入口，不是独立的全链路观测平台。',
      imageAlt: 'Lattice.Hub Console 平台监控完整真实界面',
      captions: [
        { label: 'A', text: '当前 Console 真实界面 · Platform Metrics。' },
        { label: 'B', text: '界面只证明产品能力存在，不把本地测试数据描述成线上运行指标。' },
      ],
      action: { href: '/product', label: '了解完整产品' },
    },
    release: {
      kicker: '02 / Deterministic release',
      title: '变更不是保存，',
      titleAccent: '是版本。',
      stepsAriaLabel: '发布语义',
      steps: [
        { index: '01 / DRAFT', title: '保存草稿', detail: '先记录变化，不直接改变运行态。' },
        { index: '02 / VERSION', title: '形成版本', detail: '配置生成不可变发布快照，治理规则保留版本记录。' },
        { index: '03 / RELEASE', title: '受控发布', detail: '通过灰度或全量流程，将已确认版本送入运行时。' },
        { index: '04 / ROLLBACK', title: '历史回滚', detail: '出现偏差时返回已知版本，而不是重新猜测旧状态。' },
      ],
    },
    governance: {
      kicker: '03 / Governance semantics',
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
        '当前 Pole Agent 可在登录用户权限内读取命名空间、MCP Registry 和配置文件。对已有配置文件的更新，它会生成不可变提案与差异预览；确认后只保存编辑态草稿。',
      action: { href: '/agent', label: '了解 Pole Agent' },
      boundariesAriaLabel: 'Pole Agent 权限边界',
      boundaries: [
        { index: '01', action: '读取已有配置', owner: 'Agent' },
        { index: '02', action: '生成不可变提案', owner: 'Agent' },
        { index: '03', action: '预览差异并确认', owner: '人' },
        { index: '04', action: '保存编辑态草稿', owner: 'Agent' },
      ],
      note:
        '发布、回滚与删除仍由确定性的产品流程承担。当前写路径仅覆盖已有配置文件更新；治理规则写入、新建资源、流式输出与服务端会话持久化仍未覆盖。',
    },
    scope: {
      kicker: '05 / One environment',
      title: '不替换现有入口，统一背后的控制面。',
      intro: '从协议接入到运行时消费，每类资源都回到同一份版本化控制面视图。',
      items: [
        {
          title: '运行环境',
          detail: 'Namespace 组织服务、配置与治理资源，但不冒充租户或团队空间。',
        },
        {
          title: '协议接入',
          detail: '接入 Polaris gRPC / REST、Nacos v1 / v2、Apollo、Eureka 与 Envoy xDS v3。',
        },
        {
          title: '运行时视图',
          detail: 'Rust SDK、Pole Sidecar 与 Proxy Mesh / Gateway 读取版本化治理视图。',
        },
        {
          title: '能力目录',
          detail: 'MCP 与 A2A Registry 登记工具、Agent Card、技能和能力元数据，只承担注册发现。',
        },
      ],
    },
    comparison: {
      kicker: '06 / Why Pole',
      title: '不是所有服务治理产品，都在同一层。',
      intro: '先判断是保留入口、迁移控制面，还是组合 Mesh 数据面，再决定 Pole 应该负责什么。',
      action: { href: '/compare', label: '查看完整产品对比' },
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
      eyebrow: 'Read the control plane',
      title: '从一份确定的发布语义开始。',
      primary: { href: '/docs', label: '阅读文档' },
      secondary: {
        href: 'https://github.com/lattice-hub/pole-control-plane',
        label: '查看 Pole Control Plane',
      },
    },
    footer: {
      brand: 'Lattice.Hub',
      tagline: 'Open source service governance control plane.',
      githubNote: 'Open source on GitHub.',
    },
  },
  en: {
    metadata: {
      title: { absolute: 'Lattice.Hub Service Governance Control Plane' },
      description:
        'Lattice.Hub unifies runtime environments, service discovery, configuration, governance, identity, and AI capability catalogs in one control plane. Changes become versions first, then enter runtime through a deterministic release flow.',
    },
    hero: {
      eyebrow: 'Service governance control plane',
      title: 'Bring service change',
      titleAccent: 'into one control plane.',
      lede:
        'Lattice.Hub gives AI services a shared governance view for routing, rate limiting, circuit breaking, mirroring, and Mock. Pole Agent publishes Prompt changes under control; model credentials are resolved by Pole Secret at runtime only—never in the browser, logs, or model context.',
      primary: { href: '/docs', label: 'Read the docs' },
      secondary: { href: '/architecture', label: 'View full architecture' },
    },
    systemStrip: {
      ariaLabel: 'Product capability overview',
      items: [
        { index: '01 / PROTOCOLS', label: 'Polaris, Nacos, Apollo, Eureka, and Envoy xDS v3' },
        { index: '02 / RELEASE', label: 'Draft, version, canary, release, and rollback' },
        { index: '03 / RUNTIME', label: 'Rust SDK, Pole Sidecar, and Proxy Mesh / Gateway' },
      ],
    },
    evidence: {
      kicker: '01 / Product evidence',
      title: 'The control plane should be visible,',
      titleBreak: 'not imagined.',
      intro:
        'The Console puts control-plane components, API metrics, and latency distributions in one view so operators can inspect system health and change impact. It is the control plane’s own observability entry—not a standalone full-stack APM platform.',
      imageAlt: 'Full Lattice.Hub Console platform metrics screen',
      captions: [
        { label: 'A', text: 'Current Console screen · Platform Metrics.' },
        { label: 'B', text: 'Screens prove capability exists; local test data is not described as production metrics.' },
      ],
      action: { href: '/product', label: 'Explore the full product' },
    },
    release: {
      kicker: '02 / Deterministic release',
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
      kicker: '03 / Governance semantics',
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
        'Pole Agent reads Namespaces, the MCP Registry, and configuration files within the signed-in user’s permissions. For updates to existing config files, it produces immutable proposals and diff previews; after confirmation it saves edit-state drafts only.',
      action: { href: '/agent', label: 'Learn about Pole Agent' },
      boundariesAriaLabel: 'Pole Agent permission boundary',
      boundaries: [
        { index: '01', action: 'Read existing configuration', owner: 'Agent' },
        { index: '02', action: 'Generate immutable proposal', owner: 'Agent' },
        { index: '03', action: 'Preview diff and confirm', owner: 'Human' },
        { index: '04', action: 'Save edit-state draft', owner: 'Agent' },
      ],
      note:
        'Release, rollback, and delete remain in deterministic product flows. The current write path covers updates to existing config files only; governance writes, new resources, streaming output, and server-side session persistence are not covered yet.',
    },
    scope: {
      kicker: '05 / One environment',
      title: 'Keep existing entry points; unify the control plane behind them.',
      intro: 'From protocol access to runtime consumption, every resource type returns to the same versioned control-plane view.',
      items: [
        {
          title: 'Runtime environment',
          detail: 'Namespace organizes services, configuration, and governance resources—it is an environment, not a tenant or team space.',
        },
        {
          title: 'Protocol access',
          detail: 'Connect through Polaris gRPC / REST, Nacos v1 / v2, Apollo, Eureka, and Envoy xDS v3.',
        },
        {
          title: 'Runtime view',
          detail: 'Rust SDK, Pole Sidecar, and Proxy Mesh / Gateway consume versioned governance views.',
        },
        {
          title: 'Capability catalog',
          detail: 'MCP and A2A Registry register tools, Agent Cards, skills, and capability metadata for discovery only.',
        },
      ],
    },
    comparison: {
      kicker: '06 / Why Pole',
      title: 'Not every service governance product sits at the same layer.',
      intro: 'Decide whether you are keeping entry points, migrating the control plane, or composing a Mesh data plane—then decide what Pole should own.',
      action: { href: '/compare', label: 'View full product comparison' },
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
      eyebrow: 'Read the control plane',
      title: 'Start with deterministic release semantics.',
      primary: { href: '/docs', label: 'Read the docs' },
      secondary: {
        href: 'https://github.com/lattice-hub/pole-control-plane',
        label: 'View Pole Control Plane',
      },
    },
    footer: {
      brand: 'Lattice.Hub',
      tagline: 'Open source service governance control plane.',
      githubNote: 'Open source on GitHub.',
    },
  },
} as const satisfies Record<SiteLocale, HomeCopy>;

export function getHomeCopy(locale: SiteLocale): HomeCopy {
  return homeCopy[locale];
}
