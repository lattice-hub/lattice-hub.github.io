# Lattice.Hub 官网品牌与核心资产规范

采集日期：2026-07-25

## 资产完整性

完整（首页设计探索阶段）。

- 已确认主品牌、技术产品与智能操作入口的命名关系。
- 已取得正式 Logo 与当前 Console 的真实界面截图。
- 不需要生成临时 Logo、伪造控制台或装饰性 AI 图像。

## 品牌关系

- 主品牌：Lattice.Hub
- 技术产品：Pole Control Plane
- 智能操作入口：Pole Agent
- 当前没有独立的 Pole Logo；官网不得另造图形标记。

## Logo

| 用途 | 资产 | 规则 |
|---|---|---|
| 官网图形标志 | `public/lattice-hub-logo.png` | 仅使用原文件，不手绘、不变形、不加滤镜 |
| Console 完整字标 | `../pole-control-plane/console/web/src/assets/svg/assets-logo-full.svg` | 优先用于横向品牌区，不重新排版字标 |
| Console 折叠标志 | `../pole-control-plane/console/web/src/assets/svg/assets-t-logo.svg` | 仅用于紧凑空间 |

Logo 图形主色：

- 深蓝：`#3C78F6`
- 中蓝：`#61A0F8`
- 天蓝：`#A3E3FC`

## 色彩

色彩直接继承 Console 的 Fluent 主题：

| 角色 | 色值 |
|---|---|
| Primary | `#0F6CBD` |
| Hover | `#115EA3` |
| Pressed | `#0C3B5E` |
| 页面背景 | `#F5F5F5` |
| Surface | `#FFFFFF` |
| Ink | `#242424` |
| Secondary | `#616161` |
| Border | `#D1D1D1` |

设计探索允许加入低饱和暖白或灰绿背景，但产品操作、链接与焦点色必须继续使用品牌蓝。

## 字体

- 产品 UI：`Segoe UI Variable`、`Segoe UI`、系统无衬线字体。
- 品牌字标：使用原始 SVG 内的字形，不以网页文字复刻。
- 官网正文：优先使用中文系统无衬线字体，保持和 Console 一致的阅读体验。
- 探索方案可在大标题使用编辑感衬线或窄体无衬线，但不得影响品牌字标与产品 UI 的真实性。

## 真实 UI 素材池

评分维度：画面清晰度、真实性、隐私安全、首页叙事能力，综合满分 10。

| 编号 | 页面 | 文件 | 评分 | 结论 |
|---|---|---|---:|---|
| 01 | 运行环境 | `_temp/design-demos/assets/01-namespace.png` | 7.5 | 真实但偏表格 |
| 02 | 服务清单 | `_temp/design-demos/assets/02-services.png` | 7.4 | 数据名称不适合作为主视觉 |
| 03 | 配置分组 | `_temp/design-demos/assets/03-config-groups.png` | 7.6 | 信息结构清楚 |
| 04 | 治理工作台 | `_temp/design-demos/assets/04-governance.png` | 7.3 | 当前画面较稀疏 |
| 05 | Pole Agent | `_temp/design-demos/assets/05-agent.png` | 7.7 | 能表达边界，但当前含未配置状态 |
| 06 | MCP Registry | `_temp/design-demos/assets/06-mcp-registry.png` | 7.8 | AI 原生能力证据 |
| 07 | A2A Registry | `_temp/design-demos/assets/07-a2a-registry.png` | 8.0 | 边界清楚、画面稳定 |
| 08 | 系统配置 | `_temp/design-demos/assets/08-system-config.png` | 8.4 | 真实、紧凑、信息密度合适 |
| 09 | 平台监控 | `_temp/design-demos/assets/09-platform-metrics.png` | 9.0 | 数据密度与成熟度最强 |
| 10 | 认证主体 | `_temp/design-demos/assets/10-auth-principals.png` | 7.2 | 画面较稀疏 |
| 11 | 治理规则详情 | `_temp/design-demos/assets/11-governance-detail.png` | 8.6 | 能直接证明治理语义，需裁掉测试名称 |

## 首页精选

1. 平台监控 `09-platform-metrics.png`：用于建立“这是一个真实、可运行控制面”的第一信任。
2. 治理规则详情 `11-governance-detail.png`：用于解释版本化规则、作用域与发布语义；展示时裁掉测试规则名。

Pole Agent 只作为文案能力点，不把当前“未配置”页面放进首页主视觉。待取得真实差异确认状态后，再替换为正式素材。

## 禁止项

- 不用 CSS 手绘 Console。
- 不用字母、几何图形或 AI 图替代正式 Logo。
- 不展示伪造运行状态、伪造客户数据、伪造性能指标或伪造命令输出。
- 不把 Registry 能力描述成编排执行能力。
- 不把 Pole Agent 描述成自动发布；它只准备变更与草稿，发布仍由人确认。
