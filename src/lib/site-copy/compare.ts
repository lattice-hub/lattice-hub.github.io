import type { SiteLocale } from './types';

export type CompareCopy = {
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
  layers: {
    heading: { index: string; title: string; intro: string };
    ariaLabel: string;
    items: Array<{ index: string; name: string; products: string; detail: string }>;
  };
  legend: {
    title: string;
    items: Array<{ tone: 'current' | 'peer' | 'overlap' | 'direction'; label: string }>;
  };
  comparisons: {
    heading: { index: string; title: string; intro: string };
    boundaryLabel: string;
    sourceLink: string;
    items: Array<{
      index: string;
      product: string;
      category: string;
      relation: string;
      tone: 'current' | 'peer' | 'overlap' | 'direction';
      title: string;
      detail: string;
      boundary: string;
      source: string;
    }>;
  };
  decisions: {
    heading: { index: string; title: string; intro: string };
    items: Array<{ title: string; detail: string }>;
  };
  pole: {
    kicker: string;
    title: string;
    ariaLabel: string;
    flow: Array<{ index: string; title: string; detail: string }>;
  };
  cta: {
    kicker: string;
    title: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
  };
};

const compareCopy = {
  'zh-CN': {
    metadata: {
      title: {
        absolute: '产品对比｜Pole 与 Nacos、Apollo、Consul、PolarisMesh、Istio、Kmesh',
      },
      description:
        '理解 Pole 与 Nacos、Apollo、Consul、PolarisMesh、Istio、Kmesh 分别处在哪一层，以及兼容、竞争、组合与尚未直接集成的真实边界。',
    },
    hero: {
      eyebrow: 'WHY POLE / PRODUCT LANDSCAPE',
      title: '比较产品之前，',
      accent: '先分清彼此在哪一层。',
      lede: '不是所有带有“服务治理”标签的项目都在解决同一个问题。Pole 负责统一资源、权限与发布；其它系统可能是协议入口、同层控制面、完整 Mesh，或真正执行流量的数据面。',
      primary: { href: '#products', label: '查看六项关系' },
      secondary: { href: '/docs/what-is/comparison', label: '阅读技术对比' },
      items: [
        { index: '01', title: 'COMPATIBLE', detail: 'Nacos、Apollo 与 Polaris 协议入口' },
        { index: '02', title: 'PEER', detail: 'PolarisMesh 是同层控制面参照' },
        { index: '03', title: 'COMPOSE', detail: 'Istio 与 Kmesh 位于 Mesh 运行层' },
      ],
    },
    layers: {
      heading: {
        index: '01 / LAYERS, NOT LOGOS',
        title: '先看职责层次，再看功能清单。',
        intro: '一张同权的 Logo 表会把控制面、Mesh 与数据面混在一起。下面三层说明每个产品真正拥有的系统边界。',
      },
      ariaLabel: '产品层级关系',
      items: [
        {
          index: '01',
          name: '注册、配置与治理控制面',
          products: 'Nacos · Apollo · Consul · PolarisMesh · Pole',
          detail: '决定管理哪些资源、如何授权，以及变化何时进入运行态。',
        },
        {
          index: '02',
          name: '完整 Service Mesh 生态',
          products: 'Istio',
          detail: '同时拥有 Mesh 控制面、数据面、安全与遥测体系。',
        },
        {
          index: '03',
          name: 'Service Mesh 数据面',
          products: 'Kmesh',
          detail: '在业务流量路径执行负载均衡、安全与治理策略。',
        },
      ],
    },
    legend: {
      title: 'READ THE RELATIONSHIP',
      items: [
        { tone: 'current', label: '当前协议兼容' },
        { tone: 'peer', label: '同层控制面对比' },
        { tone: 'overlap', label: '能力重叠 / 可分域' },
        { tone: 'direction', label: '组合方向 / 尚未直连' },
      ],
    },
    comparisons: {
      heading: {
        index: '02 / SIX RELATIONSHIPS',
        title: '不是谁取代谁，而是谁负责什么。',
        intro: '每一项都同时写明当前关系和不能越过的边界。协议兼容只证明接入路径存在，不自动继承对方的全部产品行为。',
      },
      boundaryLabel: 'BOUNDARY',
      sourceLink: '官方来源',
      items: [
        {
          index: '01',
          product: 'Nacos',
          category: '注册发现 / 配置',
          relation: '当前协议兼容',
          tone: 'current',
          title: '保留客户端，渐进收敛控制面。',
          detail: 'Pole 提供 Nacos v1 / v2 协议入口，可承接存量注册发现与配置客户端。',
          boundary: '不等同于复刻 Nacos 全部 Console、SDK 与生态扩展。',
          source: 'https://nacos.io/en/docs/latest/manual/user/naming/overview/',
        },
        {
          index: '02',
          product: 'Apollo',
          category: '配置中心',
          relation: '当前协议兼容',
          tone: 'current',
          title: '让配置进入统一的服务变化链。',
          detail: 'Pole 兼容 Apollo 配置客户端接入，并把配置与服务、治理放进同一运行环境。',
          boundary: '协议接入不是对 Apollo 全部管理面和 Open API 的逐项等价。',
          source: 'https://github.com/apolloconfig/apollo',
        },
        {
          index: '03',
          product: 'Consul',
          category: '注册发现 / 基础 KV / Mesh',
          relation: '能力对比 / 暂无协议直连',
          tone: 'peer',
          title: '注册发现参照，配置能力需分层看待。',
          detail: 'Consul 原生覆盖 Catalog、健康检查、DNS/HTTP 发现与基础 KV；Pole 强调版本化配置和统一治理发布。',
          boundary: 'Pole 当前没有 Consul 兼容入口；基础 KV 也不等价于完整配置发布中心。',
          source: 'https://developer.hashicorp.com/consul/docs',
        },
        {
          index: '04',
          product: 'PolarisMesh',
          category: '综合治理控制面',
          relation: '同层对比',
          tone: 'peer',
          title: '最接近 Pole 的控制面参照。',
          detail: '两者都覆盖服务发现、配置与治理；Pole 继续强化统一发布语义、AI 能力目录与多运行时边界。',
          boundary: 'Polaris 协议兼容不代表其全部 SDK、Sidecar、Controller 已被等价替代。',
          source: 'https://polarismesh.cn/',
        },
        {
          index: '05',
          product: 'Istio',
          category: '完整 Service Mesh',
          relation: '能力重叠 / 可分域组合',
          tone: 'overlap',
          title: '完整 Mesh，与统一控制面分工。',
          detail: 'Istio 负责 Mesh 流量、安全和遥测；Pole 面向服务、配置、治理与多协议入口。',
          boundary: 'Pole 的 Envoy xDS 不等于已替代 Istiod 或完整支持 Istio API、ambient。',
          source: 'https://istio.io/latest/docs/ops/deployment/architecture/',
        },
        {
          index: '06',
          product: 'Kmesh',
          category: 'eBPF Mesh 数据面',
          relation: '可组合方向 / 尚未直连',
          tone: 'direction',
          title: '数据路径候选，不是控制面替代。',
          detail: 'Kmesh 在节点 eBPF 与 Waypoint 执行治理；Pole 可以研究成为其上层资源与发布控制面。',
          boundary: '双方支持 xDS 不能直接推出已经开箱即用，仍需资源适配与 E2E 验证。',
          source: 'https://kmesh.net/docs/setup/quick-start/',
        },
      ],
    },
    decisions: {
      heading: {
        index: '03 / START FROM TODAY',
        title: '从你已经运行的系统开始。',
        intro: '迁移顺序应由当前系统的权威职责决定，而不是由一张功能打勾表决定。',
      },
      items: [
        { title: '正在使用 Nacos', detail: '优先保留客户端协议，先验证注册、配置与灰度语义，再渐进迁移管理面。' },
        { title: '正在使用 Apollo', detail: '把配置接入作为第一步，再决定是否把服务发现与治理一并收敛到 Pole。' },
        { title: '正在使用 Consul', detail: '先区分 DNS/HTTP 发现、基础 KV 与 Consul Mesh；Pole 当前没有 Consul 协议直连。' },
        { title: '正在使用 PolarisMesh', detail: '按 SDK、规则、Controller 与数据面逐项核验；这是控制面级迁移，不是改一个地址。' },
        { title: '正在使用 Istio', detail: '先确定谁拥有路由与安全策略权威；避免 Pole 与 Istiod 同时控制同一数据面。' },
        { title: '正在评估 Kmesh', detail: '把它视为数据面技术选择；Pole 与 Kmesh 的直连能力目前仍是待验证方向。' },
      ],
    },
    pole: {
      kicker: 'POLE OWNS THE CHANGE MODEL',
      title: '入口可以保留，变化必须可解释。',
      ariaLabel: 'Pole 控制面职责',
      flow: [
        { index: '01', title: '多协议接入', detail: '保留熟悉的客户端入口' },
        { index: '02', title: '统一资源模型', detail: '环境、服务、配置与治理' },
        { index: '03', title: '确定性发布', detail: '草稿、版本、灰度与回滚' },
        { index: '04', title: '多运行时消费', detail: 'SDK、Proxy 与 Gateway' },
      ],
    },
    cta: {
      kicker: 'VERIFY BEFORE YOU MIGRATE',
      title: '先确认控制权，再设计迁移路径。',
      primary: { href: '/docs/what-is/comparison', label: '阅读完整技术对比' },
      secondary: { href: '/architecture', label: '查看 Pole 架构' },
    },
  },
  en: {
    metadata: {
      title: {
        absolute: 'Product Comparison | Pole vs Nacos, Apollo, Consul, PolarisMesh, Istio, Kmesh',
      },
      description:
        'Understand which layer Pole, Nacos, Apollo, Consul, PolarisMesh, Istio, and Kmesh occupy—and the real boundaries for compatibility, peer comparison, composition, and integrations not yet direct.',
    },
    hero: {
      eyebrow: 'WHY POLE / PRODUCT LANDSCAPE',
      title: 'Before comparing products,',
      accent: 'separate the layers they occupy.',
      lede: 'Not every project labeled “service governance” solves the same problem. Pole unifies resources, permissions, and release; other systems may be protocol entry points, peer control planes, full Mesh stacks, or data planes that execute traffic.',
      primary: { href: '#products', label: 'View six relationships' },
      secondary: { href: '/docs/what-is/comparison', label: 'Read technical comparison' },
      items: [
        { index: '01', title: 'COMPATIBLE', detail: 'Nacos, Apollo, and Polaris protocol entry' },
        { index: '02', title: 'PEER', detail: 'PolarisMesh as peer control-plane reference' },
        { index: '03', title: 'COMPOSE', detail: 'Istio and Kmesh at the Mesh runtime layer' },
      ],
    },
    layers: {
      heading: {
        index: '01 / LAYERS, NOT LOGOS',
        title: 'Start with responsibility layers, then feature lists.',
        intro: 'A flat logo grid mixes control planes, Mesh, and data planes. The three layers below show each product’s real system boundary.',
      },
      ariaLabel: 'Product layer map',
      items: [
        {
          index: '01',
          name: 'Registry, configuration, and governance control plane',
          products: 'Nacos · Apollo · Consul · PolarisMesh · Pole',
          detail: 'Decides which resources are managed, how authorization works, and when change enters runtime.',
        },
        {
          index: '02',
          name: 'Full Service Mesh ecosystem',
          products: 'Istio',
          detail: 'Owns Mesh control plane, data plane, security, and telemetry together.',
        },
        {
          index: '03',
          name: 'Service Mesh data plane',
          products: 'Kmesh',
          detail: 'Executes load balancing, security, and governance on the business traffic path.',
        },
      ],
    },
    legend: {
      title: 'READ THE RELATIONSHIP',
      items: [
        { tone: 'current', label: 'Current protocol compatibility' },
        { tone: 'peer', label: 'Peer control-plane comparison' },
        { tone: 'overlap', label: 'Capability overlap / domain split' },
        { tone: 'direction', label: 'Composition direction / not yet direct' },
      ],
    },
    comparisons: {
      heading: {
        index: '02 / SIX RELATIONSHIPS',
        title: 'Not who replaces whom—but who owns what.',
        intro: 'Each item states the current relationship and boundaries that must not be crossed. Protocol compatibility proves an access path exists—it does not inherit the other product’s full behavior.',
      },
      boundaryLabel: 'BOUNDARY',
      sourceLink: 'Official source',
      items: [
        {
          index: '01',
          product: 'Nacos',
          category: 'Registration / configuration',
          relation: 'Current protocol compatibility',
          tone: 'current',
          title: 'Keep clients; converge the control plane gradually.',
          detail: 'Pole provides Nacos v1 / v2 protocol entry to serve existing registration, discovery, and configuration clients.',
          boundary: 'Not equivalent to replicating all Nacos Console, SDK, and ecosystem extensions.',
          source: 'https://nacos.io/en/docs/latest/manual/user/naming/overview/',
        },
        {
          index: '02',
          product: 'Apollo',
          category: 'Configuration center',
          relation: 'Current protocol compatibility',
          tone: 'current',
          title: 'Bring configuration into one service change chain.',
          detail: 'Pole supports Apollo configuration client access and places configuration with services and governance in one runtime environment.',
          boundary: 'Protocol access is not item-by-item equivalence with Apollo’s full management plane and Open API.',
          source: 'https://github.com/apolloconfig/apollo',
        },
        {
          index: '03',
          product: 'Consul',
          category: 'Registration / basic KV / Mesh',
          relation: 'Capability comparison / no direct protocol yet',
          tone: 'peer',
          title: 'Registration reference; configuration needs layered judgment.',
          detail: 'Consul natively covers Catalog, health checks, DNS/HTTP discovery, and basic KV; Pole emphasizes versioned configuration and unified governance release.',
          boundary: 'Pole has no Consul-compatible entry today; basic KV is not equivalent to a full configuration release center.',
          source: 'https://developer.hashicorp.com/consul/docs',
        },
        {
          index: '04',
          product: 'PolarisMesh',
          category: 'Integrated governance control plane',
          relation: 'Peer comparison',
          tone: 'peer',
          title: 'The closest peer control-plane reference to Pole.',
          detail: 'Both cover discovery, configuration, and governance; Pole further strengthens unified release semantics, AI capability catalogs, and multi-runtime boundaries.',
          boundary: 'Polaris protocol compatibility does not mean all Polaris SDK, Sidecar, and Controller pieces are equivalently replaced.',
          source: 'https://polarismesh.cn/',
        },
        {
          index: '05',
          product: 'Istio',
          category: 'Full Service Mesh',
          relation: 'Capability overlap / splittable domains',
          tone: 'overlap',
          title: 'Full Mesh vs unified control plane—divide ownership.',
          detail: 'Istio owns Mesh traffic, security, and telemetry; Pole targets services, configuration, governance, and multi-protocol entry.',
          boundary: 'Pole’s Envoy xDS does not replace Istiod or fully support Istio API and ambient modes.',
          source: 'https://istio.io/latest/docs/ops/deployment/architecture/',
        },
        {
          index: '06',
          product: 'Kmesh',
          category: 'eBPF Mesh data plane',
          relation: 'Composition direction / not yet direct',
          tone: 'direction',
          title: 'Data-path candidate—not a control-plane replacement.',
          detail: 'Kmesh enforces governance on node eBPF and Waypoint; Pole may study serving as its upper resource and release control plane.',
          boundary: 'Mutual xDS support does not imply out-of-the-box integration—resource adaptation and E2E validation are still required.',
          source: 'https://kmesh.net/docs/setup/quick-start/',
        },
      ],
    },
    decisions: {
      heading: {
        index: '03 / START FROM TODAY',
        title: 'Start from the system you already run.',
        intro: 'Migration order should follow each system’s authoritative responsibilities—not a feature checklist.',
      },
      items: [
        { title: 'Running Nacos', detail: 'Keep client protocols first; validate registration, configuration, and canary semantics before gradually migrating the management plane.' },
        { title: 'Running Apollo', detail: 'Start with configuration access; then decide whether to converge discovery and governance into Pole.' },
        { title: 'Running Consul', detail: 'Separate DNS/HTTP discovery, basic KV, and Consul Mesh; Pole has no direct Consul protocol today.' },
        { title: 'Running PolarisMesh', detail: 'Verify SDK, rules, Controller, and data plane item by item—this is control-plane migration, not a URL change.' },
        { title: 'Running Istio', detail: 'Decide who owns routing and security policy authority; avoid Pole and Istiod controlling the same data plane.' },
        { title: 'Evaluating Kmesh', detail: 'Treat it as a data-plane technology choice; direct Pole–Kmesh integration remains a direction to validate.' },
      ],
    },
    pole: {
      kicker: 'POLE OWNS THE CHANGE MODEL',
      title: 'Entry points may stay; change must stay explainable.',
      ariaLabel: 'Pole control-plane responsibilities',
      flow: [
        { index: '01', title: 'Multi-protocol access', detail: 'Keep familiar client entry points' },
        { index: '02', title: 'Unified resource model', detail: 'Environment, services, configuration, governance' },
        { index: '03', title: 'Deterministic release', detail: 'Draft, version, canary, and rollback' },
        { index: '04', title: 'Multi-runtime consumption', detail: 'SDK, Proxy, and Gateway' },
      ],
    },
    cta: {
      kicker: 'VERIFY BEFORE YOU MIGRATE',
      title: 'Confirm ownership before designing the migration path.',
      primary: { href: '/docs/what-is/comparison', label: 'Read full technical comparison' },
      secondary: { href: '/architecture', label: 'View Pole architecture' },
    },
  },
} as const satisfies Record<SiteLocale, CompareCopy>;

export function getCompareCopy(locale: SiteLocale): CompareCopy {
  return compareCopy[locale];
}
