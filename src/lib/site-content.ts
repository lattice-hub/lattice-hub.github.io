import {
  Boxes,
  Braces,
  Cpu,
  FileText,
  GitFork,
  Network,
  ServerCog,
  Workflow,
} from 'lucide-react';

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

export type AgentCapability = {
  name: string;
  protocol: string;
  status: string;
  summary: string;
};

export type GovernanceRule = {
  id: string;
  name: string;
  summary: string;
  clientLabel: string;
  controlLabel: string;
  upstreamA: string;
  upstreamB: string;
  edgeA: string;
  edgeB: string;
  variant: 'route' | 'lane' | 'limit' | 'circuit' | 'mirror' | 'mock' | 'auth';
};

export const siteNav: SiteNavItem[] = [
  { label: '文档', href: '/docs' },
  { label: '组件生态', href: '/components' },
  { label: '博客', href: '/docs/blog' },
  { label: '报告', href: '/docs/reports' },
  { label: 'GitHub', href: 'https://github.com/lattice-hub' },
];

export const heroSignals = [
  'HTTP / gRPC / xDS',
  'Nacos / Apollo / Eureka',
  'MCP / A2A Registry',
  '治理规则统一拓扑',
];

export const agentCapabilities: AgentCapability[] = [
  {
    name: 'MCP Registry',
    protocol: 'MCP',
    status: 'ready',
    summary: '把服务、配置和治理资源登记为可发现能力。',
  },
  {
    name: 'A2A Capability Index',
    protocol: 'A2A',
    status: 'design',
    summary: '为 Agent 间协作提供能力目录和接入状态。',
  },
  {
    name: 'Protocol Discovery',
    protocol: 'xDS / Nacos / Apollo',
    status: 'mapped',
    summary: '把多协议入口映射到统一控制面资源。',
  },
  {
    name: 'Access Scope',
    protocol: 'Auth',
    status: 'guarded',
    summary: '能力发现必须经过资源权限和策略边界。',
  },
];

export const governanceRules: GovernanceRule[] = [
  {
    id: 'routing',
    name: '路由',
    summary: '按权重拆分 stable 与 canary 路径。',
    clientLabel: 'client',
    controlLabel: 'route policy',
    upstreamA: 'stable',
    upstreamB: 'canary',
    edgeA: 'stable 80%',
    edgeB: 'canary 20%',
    variant: 'route',
  },
  {
    id: 'lane',
    name: '泳道',
    summary: '带 `x-env: gray` 标签的请求进入灰度泳道。',
    clientLabel: 'x-env: gray',
    controlLabel: 'lane rule',
    upstreamA: 'stable',
    upstreamB: 'gray lane',
    edgeA: 'default',
    edgeB: 'highlight',
    variant: 'lane',
  },
  {
    id: 'rate-limit',
    name: '限流',
    summary: '入口边限制为 ≤1000 rps，溢出进入 429 闸门。',
    clientLabel: 'client',
    controlLabel: 'rate limit',
    upstreamA: 'service',
    upstreamB: '429 gate',
    edgeA: '≤1000 rps',
    edgeB: 'overflow',
    variant: 'limit',
  },
  {
    id: 'circuit-breaker',
    name: '熔断',
    summary: 'svc-A 边断开，流量改由 svc-B 接管。',
    clientLabel: 'client',
    controlLabel: 'circuit breaker',
    upstreamA: 'svc-A open',
    upstreamB: 'svc-B takeover',
    edgeA: 'open',
    edgeB: 'fallback',
    variant: 'circuit',
  },
  {
    id: 'mirror',
    name: '镜像',
    summary: '主链路保持实线，同时 copy 虚线旁路到影子集群。',
    clientLabel: 'client',
    controlLabel: 'mirror rule',
    upstreamA: 'primary',
    upstreamB: 'shadow',
    edgeA: 'main',
    edgeB: 'copy',
    variant: 'mirror',
  },
  {
    id: 'mock',
    name: 'Mock',
    summary: '控制面直接回流 200 JSON，上游路径灰显绕过。',
    clientLabel: 'client',
    controlLabel: 'mock response',
    upstreamA: '200 JSON',
    upstreamB: 'upstream bypass',
    edgeA: 'return',
    edgeB: 'bypass',
    variant: 'mock',
  },
  {
    id: 'auth',
    name: '鉴权',
    summary: '策略门后分允许放行与拒绝阻断两条边。',
    clientLabel: 'token',
    controlLabel: 'auth gate',
    upstreamA: 'allow',
    upstreamB: 'deny',
    edgeA: 'pass',
    edgeB: 'block',
    variant: 'auth',
  },
];

export const componentGroups: ComponentGroup[] = [
  {
    name: 'Control Plane',
    href: '/docs/components/control-plane',
    summary: '核心控制面，负责服务发现、配置中心、治理规则、命名空间和多协议入口。',
    details: ['HTTP / gRPC / xDS / Nacos / Apollo / Eureka', '规则版本化、灰度下发、细粒度鉴权'],
    icon: ServerCog,
  },
  {
    name: 'Console',
    href: '/docs/components/console',
    summary: '面向运维与平台团队的控制台，管理服务、命名空间、配置、用户与权限策略。',
    details: ['TDesign React + Vite', '服务治理资源的可视化入口'],
    icon: Boxes,
  },
  {
    name: 'Rust SDK',
    href: '/docs/components/rust-sdk',
    summary: 'Proxyless Service Governance 的 Rust 接入方式，覆盖注册发现、配置中心与治理验证。',
    details: ['crate: pole_rust = "0.2.0"', 'Rust >= 1.63.0'],
    icon: Braces,
  },
  {
    name: 'Kubernetes Controller',
    href: '/docs/components/kubernetes-controller',
    summary: '连接 Kubernetes 与 Lattice Hub，支持 Service 同步与 Sidecar 自动注入。',
    details: ['全量 / 按需同步', 'dns / mesh 两种 sidecar 模式'],
    icon: Workflow,
  },
  {
    name: 'Pingora Sidecar',
    href: '/docs/components/pingora-sidecar',
    summary: '基于 Pingora 的轻量数据面，提供 HTTP、HTTP/2、gRPC-h2c 转发与治理扩展点。',
    details: ['前缀路由与轮询负载均衡', 'ACL、限流、熔断、指标扩展骨架'],
    icon: Network,
  },
  {
    name: 'Specification',
    href: '/docs/components/specification',
    summary: '服务治理标准与 protobuf 协议定义，覆盖服务管理、流量治理、容错、安全与 AI Native。',
    details: ['Java / Go / Rust 生成入口', 'MCP server proto'],
    icon: Cpu,
  },
];

export const architectureFacts = [
  { label: '架构层次', value: 'API 服务层 / 业务逻辑层 / 缓存层 / 存储层' },
  { label: '缓存刷新', value: '19 类缓存，后台 1s 增量刷新，lastMtime - 5s 查询窗口' },
  { label: '配置限制', value: '分页上限 100，配置内容上限 20,000 字符' },
  { label: '批处理示例', value: '队列 10000，等待 32ms，最大批量 128，并发 128' },
];

export const docsSections: ContentEntry[] = [
  {
    title: '概览',
    href: '/docs',
    summary: '服务发现、治理规则、配置、权限、AI Registry 与运行时接入的完整能力总览。',
  },
  {
    title: 'Principles',
    href: '/docs/principles/architecture',
    summary: '架构原理、缓存事件流、治理发布和鉴权链。',
  },
  {
    title: 'Components',
    href: '/components',
    summary: '官网级组件矩阵，并继续链接到 docs 组件说明。',
  },
  {
    title: 'Blog',
    href: '/docs/blog',
    summary: '服务治理、Kubernetes 同步、Sidecar 与 Agent Registry 实践。',
  },
  {
    title: 'Reports',
    href: '/docs/reports',
    summary: '性能报告入口，只记录已有事实和待实测计划。',
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
    title: 'Pingora Sidecar 的轻量数据面路线',
    href: '/docs/blog/pingora-sidecar',
    summary: '说明 HTTP/2、gRPC-h2c、路由、负载均衡与拦截器骨架的演进空间。',
  },
  {
    title: '配置灰度、回滚与长轮询监听',
    href: '/docs/blog/config-rollout',
    summary: '从配置中心事实出发，整理灰度发布和监听链路的实践边界。',
  },
];

export const trustMetrics = [
  { value: '19', label: '类控制面缓存' },
  { value: '1s', label: '增量刷新周期' },
  { value: '20k', label: '配置内容字符上限' },
  { value: '6+', label: '组件与协议入口' },
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
