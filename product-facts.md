# Lattice Hub · 产品事实

> 核对日期：2026-07-25  
> 用途：首页设计与文案的事实边界，不作为版本发布说明。

## 权威来源

- 官方公开仓库：`https://github.com/lattice-hub/pole-control-plane`
- 当前实现与知识库：`../pole-control-plane`
- 本轮架构复核基线：本地 `../pole-control-plane` 提交 `5d6e37c09dbfdd83f94ae70c16ad0268c9afcbf7`，并核对当前工作树中的知识库与 Console 实现。
- 当前 Console：`../pole-control-plane/console/web`
- 当前官网：`https://lattice-hub.github.io/`

## 已确认事实

- Lattice Hub / Pole 是面向服务与 Agent 的云原生、AI Native 服务治理控制面。
- Namespace 表示运行环境，不表示租户或团队空间。
- 服务端覆盖 Polaris gRPC/REST、Nacos v1/v2、Apollo、Eureka 与 Envoy xDS v3 等协议入口。
- 配置中心区分编辑态与发布态，支持不可变发布快照、灰度发布、回滚、长轮询和 SSE 监听。
- Console 已覆盖路由、泳道、限流、熔断、故障探测、无损上下线、调用鉴权、流量镜像与流量 Mock 九类治理能力。
- MCP Registry 与 A2A Agent Registry 已进入控制面的 API、缓存、存储和 Console 管理链路。
- A2A 当前只承担 Agent Card、技能、协议接口与能力元数据的注册和发现，不承担任务代理或 Agent Runtime。
- Pole Agent 已具备真实 LLM / MCP 最小闭环；配置更新经过读取、提案、预览、哈希、并发检查和用户确认，最终只保存草稿。
- Server / Console 共登记 63 项类型化系统配置，其中 Agent 配置支持受控热更新，其他字段可能需要重启或由部署锁定。
- 当前 Console 使用 React 18 与 Fluent UI v9，主品牌色为 `#0f6cbd`，并具备 light / dark 主题 token。

## 首页禁止使用的断言

- 不写“A2A Registry 规划中”。
- 不写“Agent 可以自然语言管理所有资源”。
- 不写“所有系统配置均可热更新”。
- 不写“完整全链路观测平台已经交付”。
- 不把示意数字、虚构服务状态或虚构客户数据包装成实时产品数据。
- 不把 Namespace 表述为多租户、团队或组织边界。

## 首页核心信息

1. 一个控制面统一环境、服务、配置、治理和 AI 能力目录。
2. 变更先形成版本，再由确定性发布流程进入运行时。
3. SDK、Sidecar、Proxy Mesh、Kubernetes Controller 与 Agent 消费同一份治理语义。
4. Agent 可以准备变更，但发布权仍在人。

## 首页架构动态图事实模型

1. 变化入口包括 Console / API、Kubernetes Controller 同步与 Pole Agent 提案；Pole Agent 不是发布执行者。
2. 多协议入口覆盖 Polaris gRPC / REST、Nacos v1 / v2、Apollo、Eureka 与 Envoy xDS v3。
3. 控制面统一承载 Namespace、Service、Config、Governance、MCP Registry 与 A2A Agent Registry 等资源视图。
4. 只有配置与治理变化在首页图中进入“草稿 → 版本 → Active”发布链；服务与 Registry 不应被错误画成同一发布生命周期。
5. 运行时消费者以 Thin SDK、Local Proxy / Sidecar、Proxy Mesh / Gateway 为主线；动态图只表达结构关系，不表达实时遥测状态。
