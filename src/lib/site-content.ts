import {
  Activity,
  Braces,
  Cpu,
  FileText,
  GitFork,
  Network,
  ServerCog,
  Workflow,
} from 'lucide-react';
import type { SiteLocale } from '@/lib/site-locale';

export type SiteNavItem = {
  label: string;
  href: string;
};

export type ComponentGroup = {
  name: string;
  href: string;
  summary: string;
  details: string[];
  icon: typeof ServerCog;
};

export type ContentEntry = {
  title: string;
  href: string;
  summary: string;
};

export type GovernanceDomainGroup = '流量路径' | '稳定性' | '安全与测试';

export type GovernanceDomain = {
  id: string;
  name: string;
  summary: string;
  group: GovernanceDomainGroup;
};

export type LocalizedGovernanceDomain = GovernanceDomain;

export type LocalizedProductTopic = SiteNavItem & {
  labelEn: string;
  summary: string;
  action: string;
};

export type LocalizedComponentGroup = ComponentGroup;

export type LocalizedComponentPageAction = {
  title: string;
  href: string;
  icon: typeof FileText;
};

export type CapabilityPillar = {
  index: string;
  title: string;
  summary: string;
  detail: string;
  href: string;
  accent: string;
};

export const siteNav: SiteNavItem[] = [
  { label: '产品', href: '/product' },
  { label: '组件', href: '/components' },
  { label: '文档', href: '/docs' },
];

export const GITHUB_ORGANIZATION_URL = 'https://github.com/lattice-hub';

export const siteFooterNav: SiteNavItem[] = [
  ...siteNav,
  { label: 'GitHub', href: GITHUB_ORGANIZATION_URL },
];

export const productTopics: Array<SiteNavItem & { action: string; labelEn: string; summary: string }> = [
  {
    label: '服务治理',
    labelEn: 'SERVICE GOVERNANCE',
    href: '/governance',
    summary: '九类治理规则通过作用域、版本、灰度发布与回滚形成确定的运行时策略。',
    action: '深入服务治理',
  },
  {
    label: 'Pole Agent',
    labelEn: 'HUMAN-GATED CHANGE',
    href: '/agent',
    summary: '在登录用户权限内读取上下文、生成已有配置更新提案；人工确认后只保存编辑态草稿。',
    action: '了解 Pole Agent',
  },
  {
    label: '产品对比',
    labelEn: 'WHY POLE',
    href: '/compare',
    summary: '分清协议兼容、同层控制面、完整 Mesh 与数据面，选择准确的替换或组合路径。',
    action: '比较产品关系',
  },
];

export function isSiteNavActive(pathname: string, href: string): boolean {
  const normalizedPath = pathname
    .replace(/\/+$/, '')
    .replace(/^\/en(?=\/|$)/, '') || '/';
  const productAliases = ['/architecture', '/governance', '/agent', '/compare'];
  const isProductTopic = productAliases.some(
    (topic) => normalizedPath === topic || normalizedPath.startsWith(`${topic}/`),
  );

  if (href === '/product' && isProductTopic) {
    return true;
  }

  return (
    href.startsWith('/') &&
    (normalizedPath === href || normalizedPath.startsWith(`${href}/`))
  );
}

export const capabilityPillars: CapabilityPillar[] = [
  {
    index: '01',
    title: '运行环境，而不是资源文件夹',
    summary: 'Namespace 把同一逻辑资源的开发、预发与生产实例放在各自的发布边界内。',
    detail: '服务、配置和治理规则都按环境维护内容、版本与发布状态。',
    href: '/docs/what-is/features',
    accent: 'environment',
  },
  {
    index: '02',
    title: '兼容已有注册与配置协议',
    summary: '从 Polaris、Nacos、Apollo、Eureka 到 Envoy xDS，让客户端沿现有协议接入统一控制面。',
    detail: '注册发现、配置监听、批量心跳和空推保护由同一套领域模型承载。',
    href: '/docs/what-is/access',
    accent: 'protocol',
  },
  {
    index: '03',
    title: '编辑、发布与回滚明确分离',
    summary: '配置和治理规则先形成草稿，再通过不可变版本、灰度发布和历史回滚进入运行态。',
    detail: '写入并不等于生效，发布状态始终可解释。',
    href: '/docs/principles/governance-release',
    accent: 'release',
  },
  {
    index: '04',
    title: '身份与权限进入控制面模型',
    summary: '管理面细粒度资源授权与数据面托管服务身份分别解决“谁能改”和“谁在调用”。',
    detail: '短期服务凭证不让控制面进入每次业务调用的同步热路径。',
    href: '/docs/principles/auth-protocols',
    accent: 'identity',
  },
];

export const governanceDomains: GovernanceDomain[] = [
  { id: 'route', name: '路由', summary: '按标签、权重和请求条件选择目标版本。', group: '流量路径' },
  { id: 'lane', name: '泳道', summary: '让一组关联服务沿同一环境标识闭环。', group: '流量路径' },
  { id: 'mirror', name: '流量镜像', summary: '复制请求到影子服务，不改变主链路结果。', group: '流量路径' },
  { id: 'rate-limit', name: '限流', summary: '按请求维度和配额约束流量入口。', group: '稳定性' },
  { id: 'circuit-breaker', name: '熔断', summary: '在异常阈值触发后隔离不健康调用。', group: '稳定性' },
  { id: 'fault-detect', name: '故障探测', summary: '用主动与被动信号识别异常实例。', group: '稳定性' },
  { id: 'lossless', name: '无损上下线', summary: '在实例生命周期变化时保护在途请求。', group: '稳定性' },
  { id: 'auth', name: '调用鉴权', summary: '按服务身份与请求条件执行访问策略。', group: '安全与测试' },
  { id: 'mock', name: '流量 Mock', summary: '按规则直接返回受控响应，用于联调与演练。', group: '安全与测试' },
];

export const platformFacts = [
  { value: '6', label: '类协议服务端', note: 'HTTP / gRPC / xDS / Nacos / Apollo / Eureka' },
  { value: '9', label: '类治理能力', note: '结构化查看、编辑、版本与灰度发布' },
  { value: '63', label: '项系统配置目录', note: '区分部署锁定、待重启与受控热更新' },
  { value: '1s', label: '增量缓存周期', note: '以回退时间窗保护变更扫描' },
];

export const docsSections: ContentEntry[] = [
  {
    title: '产品概览',
    href: '/docs',
    summary: '从运行环境、服务发现到治理、配置、权限与 Agent 的能力全景。',
  },
  {
    title: '架构原理',
    href: '/docs/principles/architecture',
    summary: '协议接入、业务服务、缓存事件流、存储与发布链如何协作。',
  },
  {
    title: '组件生态',
    href: '/components',
    summary: 'Control Plane、Controller、SDK、Pole Sidecar 与规范。',
  },
  {
    title: '工程实践',
    href: '/docs/practices/gray-release',
    summary: '灰度发布、Kubernetes 同步、Agent 发现和 Pole Sidecar 数据面。',
  },
  {
    title: '报告',
    href: '/docs/reports',
    summary: '只记录已验证事实、测试配置与仍待补齐的性能证据。',
  },
];

export const componentGroups: ComponentGroup[] = [
  {
    name: 'Control Plane',
    href: '/docs/components/control-plane',
    summary: '统一服务发现、配置、治理、身份、Registry 与多协议接入；内嵌 Console 管理界面。',
    details: ['管理 API、多协议入口与内嵌 Console', '向接入组件提供统一视图'],
    icon: ServerCog,
  },
  {
    name: 'Rust SDK',
    href: '/docs/components/rust-sdk',
    summary: '面向 Rust 应用的轻量 Proxyless Service Governance 接入。',
    details: ['crate: pole_rust = "0.2.0"', 'Rust >= 1.63.0'],
    icon: Braces,
  },
  {
    name: 'Kubernetes Controller',
    href: '/docs/components/kubernetes-controller',
    summary: '连接 Kubernetes 与控制面，同步 Service、Endpoints、Namespace 与 ConfigMap。',
    details: ['全量 / 按需与配置双向同步', 'Pole Sidecar、Java Agent 与 Envoy 注入'],
    icon: Workflow,
  },
  {
    name: 'Pole Sidecar',
    href: '/docs/components/pingora-sidecar',
    summary: '基于 Pingora 的轻量数据面骨架，支持 HTTP、HTTP/2 与 gRPC-h2c 转发。',
    details: ['前缀路由与轮询负载均衡', '动态治理接入仍按路线演进'],
    icon: Network,
  },
  {
    name: 'Limiter Server',
    href: 'https://github.com/lattice-hub/pole-limiter-server',
    summary: '分布式限流专用运行时，缓存并分配全局 Token，承接客户端配额获取与上报。',
    details: ['全局 Token 分配', '注册中心自注册'],
    icon: Activity,
  },
  {
    name: 'Specification',
    href: '/docs/components/specification',
    summary: '开放的服务治理与 protobuf 协议定义，覆盖治理、安全与 MCP。',
    details: ['Java / Go / Rust 生成入口', '跨组件共享协议契约'],
    icon: Cpu,
  },
];

export const principles: ContentEntry[] = [
  {
    title: '四层控制面架构',
    href: '/docs/principles/architecture',
    summary: 'API 服务层、业务逻辑层、缓存层和存储层如何协同支撑服务治理。',
  },
  {
    title: '增量缓存与事件流',
    href: '/docs/principles/cache-eventhub',
    summary: '解释 1s 增量刷新、时间窗口保护和 EventHub 对订阅链路的价值。',
  },
  {
    title: '治理规则灰度发布',
    href: '/docs/principles/governance-release',
    summary: '治理规则版本化、灰度下发和多协议客户端兼容的实现思路。',
  },
  {
    title: '鉴权链与多协议映射',
    href: '/docs/principles/auth-protocols',
    summary: '鉴权拦截器链如何和 HTTP、gRPC、xDS、Nacos、Apollo 等协议入口组合。',
  },
];

export const blogPosts: ContentEntry[] = [
  {
    title: 'MCP/A2A Registry 如何让服务治理被 Agent 发现',
    href: '/docs/blog/mcp-a2a-registry',
    summary: '用 AI Native 视角重看服务目录、治理规则和 Agent 工具发现。',
  },
  {
    title: 'Kubernetes Service 到 Lattice Hub 的同步模型',
    href: '/docs/blog/kubernetes-service-sync',
    summary: '对比全量同步、按需同步、annotation 与服务别名的使用场景。',
  },
  {
    title: 'Pole Sidecar 的轻量数据面路线',
    href: '/docs/blog/pingora-sidecar',
    summary: '说明 HTTP/2、gRPC-h2c、路由、负载均衡与拦截器骨架的演进空间。',
  },
  {
    title: '配置灰度、回滚与长轮询监听',
    href: '/docs/blog/config-rollout',
    summary: '从配置中心事实出发，整理灰度发布和监听链路的实践边界。',
  },
];

export const componentPageActions = [
  {
    title: '阅读组件文档',
    href: '/docs/components/control-plane',
    icon: FileText,
  },
  {
    title: '查看 GitHub organization',
    href: 'https://github.com/lattice-hub',
    icon: GitFork,
  },
];

const governanceDomainsEn: LocalizedGovernanceDomain[] = [
  { id: 'route', name: 'Routing', summary: 'Select target versions by labels, weights, and request conditions.', group: '流量路径' },
  { id: 'lane', name: 'Lane', summary: 'Keep a set of related services closed on one environment identifier.', group: '流量路径' },
  { id: 'mirror', name: 'Traffic mirroring', summary: 'Copy requests to shadow services without changing the primary path result.', group: '流量路径' },
  { id: 'rate-limit', name: 'Rate limiting', summary: 'Constrain traffic entry by request dimensions and quotas.', group: '稳定性' },
  { id: 'circuit-breaker', name: 'Circuit breaking', summary: 'Isolate unhealthy calls after anomaly thresholds trigger.', group: '稳定性' },
  { id: 'fault-detect', name: 'Fault detection', summary: 'Identify unhealthy instances with active and passive signals.', group: '稳定性' },
  { id: 'lossless', name: 'Lossless up/down', summary: 'Protect in-flight requests during instance lifecycle changes.', group: '稳定性' },
  { id: 'auth', name: 'Call authorization', summary: 'Enforce access policy by service identity and request conditions.', group: '安全与测试' },
  { id: 'mock', name: 'Traffic Mock', summary: 'Return controlled responses by rule for integration and drills.', group: '安全与测试' },
];

const governanceDomainGroupsEn: Record<GovernanceDomainGroup, string> = {
  流量路径: 'Traffic path',
  稳定性: 'Stability',
  安全与测试: 'Security and testing',
};

const productTopicsEn: LocalizedProductTopic[] = [
  {
    label: 'Service governance',
    labelEn: 'SERVICE GOVERNANCE',
    href: '/governance',
    summary: 'Nine governance rule types form deterministic runtime policy through scope, versioning, canary release, and rollback.',
    action: 'Explore service governance',
  },
  {
    label: 'Pole Agent',
    labelEn: 'HUMAN-GATED CHANGE',
    href: '/agent',
    summary: 'Within signed-in user permissions, read context, generate update proposals for existing configuration, and save edit-state drafts only after human confirmation.',
    action: 'Learn about Pole Agent',
  },
  {
    label: 'Product comparison',
    labelEn: 'WHY POLE',
    href: '/compare',
    summary: 'Separate protocol compatibility, peer control planes, full Mesh, and data planes to choose the right replacement or composition path.',
    action: 'Compare product relationships',
  },
];

const componentGroupsEn: LocalizedComponentGroup[] = componentGroups.map((group, index) => {
  const english = [
    {
      summary: 'Unified discovery, configuration, governance, identity, Registry, and multi-protocol access; embedded Console management UI.',
      details: ['Management API, multi-protocol entry, and embedded Console', 'Provides a unified view to connected components'],
    },
    {
      summary: 'Lightweight Proxyless Service Governance access for Rust applications.',
      details: ['crate: pole_rust = "0.2.0"', 'Rust >= 1.63.0'],
    },
    {
      summary: 'Connects Kubernetes to the control plane; syncs Service, Endpoints, Namespace, and ConfigMap.',
      details: ['Full / on-demand and bidirectional configuration sync', 'Pole Sidecar, Java Agent, and Envoy injection'],
    },
    {
      summary: 'Pingora-based lightweight data-plane skeleton supporting HTTP, HTTP/2, and gRPC-h2c forwarding.',
      details: ['Prefix routing and round-robin load balancing', 'Dynamic governance access still evolving on the roadmap'],
    },
    {
      summary: 'Dedicated distributed rate-limit runtime that caches and allocates global tokens for client quota fetch and reporting.',
      details: ['Global token allocation', 'Self-registration with the registry'],
    },
    {
      summary: 'Open service governance and protobuf protocol definitions covering governance, security, and MCP.',
      details: ['Java / Go / Rust generation entry points', 'Shared protocol contracts across components'],
    },
  ][index];

  return { ...group, ...english };
});

const componentPageActionsEn: LocalizedComponentPageAction[] = [
  {
    title: 'Read component docs',
    href: '/docs/components/control-plane',
    icon: FileText,
  },
  {
    title: 'View GitHub organization',
    href: 'https://github.com/lattice-hub',
    icon: GitFork,
  },
];

const siteNavEn: SiteNavItem[] = [
  { label: 'Product', href: '/product' },
  { label: 'Components', href: '/components' },
  { label: 'Docs', href: '/docs' },
];

const siteFooterNavEn: SiteNavItem[] = [...siteNavEn, { label: 'GitHub', href: GITHUB_ORGANIZATION_URL }];

export function getGovernanceDomains(locale: SiteLocale): LocalizedGovernanceDomain[] {
  return locale === 'en' ? governanceDomainsEn : governanceDomains;
}

export function getGovernanceDomainGroupLabel(
  group: GovernanceDomainGroup,
  locale: SiteLocale,
): string {
  return locale === 'en' ? governanceDomainGroupsEn[group] : group;
}

export function getProductTopics(locale: SiteLocale): LocalizedProductTopic[] {
  return locale === 'en' ? productTopicsEn : productTopics;
}

export function getComponentGroups(locale: SiteLocale): LocalizedComponentGroup[] {
  return locale === 'en' ? componentGroupsEn : componentGroups;
}

export function getComponentPageActions(locale: SiteLocale): LocalizedComponentPageAction[] {
  return locale === 'en' ? componentPageActionsEn : componentPageActions;
}

export function getSiteNav(locale: SiteLocale): SiteNavItem[] {
  return locale === 'en' ? siteNavEn : siteNav;
}

export function getSiteFooterNav(locale: SiteLocale): SiteNavItem[] {
  return locale === 'en' ? siteFooterNavEn : siteFooterNav;
}
