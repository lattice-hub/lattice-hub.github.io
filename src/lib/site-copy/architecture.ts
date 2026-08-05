import type { SiteLocale } from './types';

export type ArchitectureCopy = {
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
  componentMap: {
    heading: { index: string; title: string; intro: string };
    diagramNote: string;
  };
  responsibilities: {
    heading: { index: string; title: string; intro: string };
    components: Array<{
      index: string;
      name: string;
      role: string;
      detail: string;
      href: string;
      action: string;
    }>;
  };
  execution: {
    heading: { index: string; title: string; intro: string };
    notes: Array<{ index: string; title: string; detail: string }>;
  };
  boundary: {
    heading: { index: string; title: string; intro: string };
    tableHead: [string, string, string];
    rows: Array<{ layer: string; names: string; detail: string }>;
    actions: Array<{ href: string; label: string }>;
  };
};

const architectureCopy = {
  'zh-CN': {
    metadata: {
      title: { absolute: '组件架构｜Lattice.Hub' },
      description:
        '了解 Lattice.Hub 的 Control Plane、Rust SDK、Thin SDK、Kubernetes Controller、Pole Sidecar 与 Specification 如何协作，以及治理能力如何进入运行时执行。',
    },
    hero: {
      eyebrow: 'ORGANIZATION ARCHITECTURE',
      title: '多个组件，',
      accent: '围绕同一份治理语义协作。',
      lede: '这里不展开 Control Plane 的内部存储、缓存或事件实现，只回答三个官网访客真正关心的问题：有哪些组件、它们如何连接、治理规则最终在哪里执行。',
      primary: { href: '/components', label: '浏览全部组件' },
      secondary: { href: '/docs/principles/architecture', label: '阅读技术原理' },
      items: [
        { index: '01', title: 'COMPONENTS', detail: '组件职责与协作关系' },
        { index: '02', title: 'EXECUTION', detail: '治理能力如何生效' },
        { index: '03', title: 'BOUNDARY', detail: '管理、控制与执行边界' },
      ],
    },
    componentMap: {
      heading: {
        index: '01 / COMPONENT MAP',
        title: '组件各司其职，控制面保持统一。',
        intro:
          'Control Plane（内嵌 Console，Limiter 同仓可选进程）与 Controller 从管理和集群侧接入；Rust / Thin SDK 与代理数据面从运行时侧接入；Specification 让各组件共享稳定契约。',
      },
      diagramNote:
        '图中的实线表示当前明确的管理或协议路径，虚线表示同步、注入或仍按组件实现范围演进的接入边界。',
    },
    responsibilities: {
      heading: {
        index: '02 / COMPONENT RESPONSIBILITIES',
        title: '先看组件职责，再看内部实现。',
        intro:
          '每个组件只承诺自己已经承担的角色。Console 与 Pole Agent 属于 Control Plane 内的管理能力，Observability 属于平台集成能力，它们不被包装成独立部署组件。',
      },
      components: [
        {
          index: '01',
          name: 'Control Plane',
          role: '核心控制面',
          detail:
            '统一服务发现、配置、治理、权限、能力目录与多协议入口；内嵌 Console；Limiter 同仓以 limiter-server / full 模式可选独立部署，不进入业务流量同步热路径。',
          href: '/docs/components/control-plane',
          action: '了解组件',
        },
        {
          index: '02',
          name: 'Rust SDK',
          role: 'Proxyless 客户端',
          detail: '为 Rust 应用提供轻量的 Proxyless 接入形态，并复用组织的开放协议契约。',
          href: '/docs/components/rust-sdk',
          action: '了解组件',
        },
        {
          index: '03',
          name: 'Thin SDK',
          role: '多语言 Sidecar 契约客户端',
          detail:
            '为 Go、Java、Python、Node.js、C++ 与 C# 提供 Sidecar Session / TargetService v1 契约核心，面向本地 Pole Sidecar；当前交付契约核心，端到端兼容组合仍按实现范围演进。',
          href: '/docs/components/thin-sdk',
          action: '了解组件',
        },
        {
          index: '04',
          name: 'Kubernetes Controller',
          role: '集群集成',
          detail: '同步 Service、Endpoints、Namespace 与 ConfigMap，并按配置注入 Pole Sidecar、Java Agent 或 Envoy。',
          href: '/docs/components/kubernetes-controller',
          action: '了解组件',
        },
        {
          index: '05',
          name: 'Pole Sidecar',
          role: '本地数据面',
          detail: '当前是支持 HTTP、HTTP/2、gRPC-h2c 转发、前缀路由与轮询的轻量数据面骨架。',
          href: '/docs/components/pingora-sidecar',
          action: '了解组件',
        },
        {
          index: '06',
          name: 'Specification',
          role: '共享契约',
          detail: '定义服务管理、流量治理、容错、访问控制与 MCP 协议，并提供多语言生成入口。',
          href: '/docs/components/specification',
          action: '了解组件',
        },
      ],
    },
    execution: {
      heading: {
        index: '03 / GOVERNANCE EXECUTION',
        title: '规则在控制面发布，在离流量最近的组件执行。',
        intro:
          '平台工程师通过 Control Plane Console 或 API 确认作用域并发布规则。控制面将可消费治理视图交给对应运行时；SDK、Limiter 运行时模块或代理数据面只执行自身当前支持的能力。',
      },
      notes: [
        { index: '01 / DEFINE', title: '管理面决定变化', detail: '调用方、被调方、规则内容与发布时间由平台工程师审阅，内嵌 Console 只是操作入口。' },
        { index: '02 / DISTRIBUTE', title: '控制面交付视图', detail: '控制面提供已发布、可消费的治理视图，但不进入每一次业务请求的同步热路径。' },
        { index: '03 / ENFORCE', title: '运行时执行规则', detail: '路由、保护、鉴权与测试能力由 SDK 或代理数据面按协议与当前实现范围执行。' },
      ],
    },
    boundary: {
      heading: {
        index: '04 / RESPONSIBILITY BOUNDARY',
        title: '谁管理、谁分发、谁执行，不能混为一谈。',
        intro:
          '这条边界让官网描述保持诚实：协议兼容不等于所有运行时已经完整覆盖全部治理规则，组件路线图也不会被写成当前能力。',
      },
      tableHead: ['层级', '组件', '职责'],
      rows: [
        { layer: '管理面', names: 'Control Plane Console · Pole Agent', detail: '准备、审阅和决定变化；不执行真实服务请求。' },
        { layer: '控制面', names: 'Lattice.Hub · Controller · Limiter 模块', detail: '管理统一资源视图，连接 Kubernetes；Limiter 同仓可选独立进程承接分布式限流。' },
        { layer: '执行面', names: 'Rust SDK · Thin SDK · Envoy / Gateway', detail: '在各自已支持的协议和能力范围内影响服务调用。' },
        { layer: '扩展数据面', names: 'Pole Sidecar', detail: '当前提供代理骨架；动态治理接入与更多执行能力按实现进度演进。' },
      ],
      actions: [
        { href: '/components', label: '进入组件目录' },
        { href: '/docs/principles/governance-release', label: '阅读治理发布原理' },
      ],
    },
  },
  en: {
    metadata: {
      title: { absolute: 'Component Architecture | Lattice.Hub' },
      description:
        'Learn how Lattice.Hub’s Control Plane, Rust SDK, Thin SDK, Kubernetes Controller, Pole Sidecar, and Specification collaborate—and how governance reaches runtime execution.',
    },
    hero: {
      eyebrow: 'ORGANIZATION ARCHITECTURE',
      title: 'Many components,',
      accent: 'one shared governance model.',
      lede: 'This page does not dive into Control Plane storage, cache, or event internals. It answers three visitor questions: which components exist, how they connect, and where governance rules ultimately execute.',
      primary: { href: '/components', label: 'Browse all components' },
      secondary: { href: '/docs/principles/architecture', label: 'Read technical principles' },
      items: [
        { index: '01', title: 'COMPONENTS', detail: 'Component roles and collaboration' },
        { index: '02', title: 'EXECUTION', detail: 'How governance takes effect' },
        { index: '03', title: 'BOUNDARY', detail: 'Management, control, and execution boundaries' },
      ],
    },
    componentMap: {
      heading: {
        index: '01 / COMPONENT MAP',
        title: 'Components stay distinct; the control plane stays unified.',
        intro:
          'Control Plane (embedded Console; Limiter as an optional in-repo process) and Controller connect from management and cluster sides; Rust / Thin SDKs and proxy data planes connect from runtime; Specification gives every component a stable contract.',
      },
      diagramNote:
        'Solid lines are current management or protocol paths; dashed lines are sync, injection, or integration boundaries still evolving with each component’s scope.',
    },
    responsibilities: {
      heading: {
        index: '02 / COMPONENT RESPONSIBILITIES',
        title: 'Start with component roles, then internals.',
        intro:
          'Each component commits only to roles it already owns. Console and Pole Agent are management capabilities inside Control Plane; Observability is platform integration—they are not packaged as separately deployed components.',
      },
      components: [
        {
          index: '01',
          name: 'Control Plane',
          role: 'Core control plane',
          detail:
            'Unifies discovery, configuration, governance, permissions, capability catalogs, and multi-protocol entry; embeds Console; Limiter ships in-repo via limiter-server / full modes without entering the business-traffic hot path.',
          href: '/docs/components/control-plane',
          action: 'Learn about component',
        },
        {
          index: '02',
          name: 'Rust SDK',
          role: 'Proxyless client',
          detail: 'Lightweight Proxyless access for Rust applications, reusing the organization’s open protocol contracts.',
          href: '/docs/components/rust-sdk',
          action: 'Learn about component',
        },
        {
          index: '03',
          name: 'Thin SDK',
          role: 'Multi-language Sidecar contract client',
          detail:
            'Sidecar Session / TargetService v1 contract cores for Go, Java, Python, Node.js, C++, and C# aimed at local Pole Sidecar. Contract cores ship today; end-to-end Sidecar compatibility still evolves by implementation scope.',
          href: '/docs/components/thin-sdk',
          action: 'Learn about component',
        },
        {
          index: '04',
          name: 'Kubernetes Controller',
          role: 'Cluster integration',
          detail: 'Syncs Service, Endpoints, Namespace, and ConfigMap; injects Pole Sidecar, Java Agent, or Envoy per configuration.',
          href: '/docs/components/kubernetes-controller',
          action: 'Learn about component',
        },
        {
          index: '05',
          name: 'Pole Sidecar',
          role: 'Local data plane',
          detail: 'Currently a lightweight data-plane skeleton supporting HTTP, HTTP/2, gRPC-h2c forwarding, prefix routing, and round-robin.',
          href: '/docs/components/pingora-sidecar',
          action: 'Learn about component',
        },
        {
          index: '06',
          name: 'Specification',
          role: 'Shared contract',
          detail: 'Defines service management, traffic governance, fault tolerance, access control, and MCP protocols with multi-language generation entry points.',
          href: '/docs/components/specification',
          action: 'Learn about component',
        },
      ],
    },
    execution: {
      heading: {
        index: '03 / GOVERNANCE EXECUTION',
        title: 'Rules publish on the control plane; enforcement sits closest to traffic.',
        intro:
          'Platform engineers confirm scope and publish rules through Control Plane Console or API. The control plane hands consumable governance views to runtimes; SDKs, the Limiter runtime module, or proxy data planes enforce only what they support today.',
      },
      notes: [
        { index: '01 / DEFINE', title: 'Management decides change', detail: 'Caller, callee, rule content, and release timing are reviewed by platform engineers; embedded Console is the entry point.' },
        { index: '02 / DISTRIBUTE', title: 'Control plane delivers views', detail: 'The control plane provides published, consumable governance views without entering every business request’s synchronous hot path.' },
        { index: '03 / ENFORCE', title: 'Runtime enforces rules', detail: 'Routing, protection, authorization, and test capabilities are enforced by SDK or proxy data planes within protocol and implementation scope.' },
      ],
    },
    boundary: {
      heading: {
        index: '04 / RESPONSIBILITY BOUNDARY',
        title: 'Who manages, who distributes, who executes—keep them separate.',
        intro:
          'This boundary keeps the site honest: protocol compatibility does not mean every runtime fully covers all governance rules, and roadmaps are not written as current capability.',
      },
      tableHead: ['Layer', 'Components', 'Responsibility'],
      rows: [
        { layer: 'Management plane', names: 'Control Plane Console · Pole Agent', detail: 'Prepare, review, and decide change—does not execute real service requests.' },
        { layer: 'Control plane', names: 'Lattice.Hub · Controller · Limiter module', detail: 'Owns the unified resource view, connects Kubernetes, and optionally runs Limiter as a separate in-repo process for distributed rate limiting.' },
        { layer: 'Execution plane', names: 'Rust SDK · Thin SDK · Envoy / Gateway', detail: 'Influence service calls within each component’s supported protocols and capabilities.' },
        { layer: 'Extended data plane', names: 'Pole Sidecar', detail: 'Currently a proxy skeleton; dynamic governance access and more execution capability evolve with implementation progress.' },
      ],
      actions: [
        { href: '/components', label: 'Open component directory' },
        { href: '/docs/principles/governance-release', label: 'Read governance release principles' },
      ],
    },
  },
} as const satisfies Record<SiteLocale, ArchitectureCopy>;

export function getArchitectureCopy(locale: SiteLocale): ArchitectureCopy {
  return architectureCopy[locale];
}
