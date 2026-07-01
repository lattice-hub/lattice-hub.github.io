# Lattice Hub 官网设计规格

## 目标

在 `/Users/chuntao.liao/Github/pole-io/website` 从零搭建 Lattice Hub 组织官网。站点使用 Fumadocs/Next.js，首版目标是可发布官网，而不是完整资料库或自动文档同步管线。

## 信息架构

- 首页：组织整体介绍，强调 Lattice Hub 是云原生、AI Native 的服务治理生态。
- 文档：提供控制面、控制台、Rust SDK、K8s Controller、Sidecar、Specification 与性能数据报告入口。
- 原理：解释四层架构、插件系统、缓存增量同步、Batch Controller、EventHub、鉴权链、xDS/多协议映射。
- 博客：提供 MCP/A2A Registry、K8s 同步模型、Pingora Sidecar、配置灰度与长轮询等最佳实践文章。

## 视觉方向

首页采用克制的工程基础设施风格。首屏优先呈现服务治理基础设施、控制面边界、协议入口和运行时组件关系；MCP/A2A Registry 与 Agent 可发现性作为能力增量出现，不主导首屏视觉和标题。整体避免泛 AI 营销页、发光网络、过强的 AI 口号和概念化氛围。

## 内容范围

首版做“可发布官网首版”：首页完整，文档/原理/博客提供高质量种子内容。性能报告只写已有事实、配置数据和待实测框架，不编造压测数字。

内容来源包括：

- `../pole-control-plane`
- `../pole-console`
- `../pole-client-rust`
- `../pole-controller`
- `../pole-sidecar`
- `../specification`

## 技术方案

- Next.js App Router。
- Fumadocs UI + Fumadocs MDX 作为文档系统。
- MDX 内容维护在 `content/docs`。
- 首页使用 React/Tailwind 风格实现独立品牌体验。
- 共享内容元数据集中在 `src/lib/site-content.ts`，便于首页、测试和后续页面复用。

## 验证

- 内容结构测试：确认导航、组件矩阵、文档入口、原理入口、博客入口和性能报告入口存在。
- `npm run lint`：检查项目静态规则。
- `npm run build`：验证 Fumadocs/Next 生产构建。
- 浏览器预览：启动开发服务，打开首页检查首屏、导航与主要文档入口。
