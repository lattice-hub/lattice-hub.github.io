# Lattice Hub 官网建设计划

## 状态

- 当前目录：`/Users/chuntao.liao/Github/pole-io/website`
- 当前结论：目录基本为空，需要新建 Fumadocs/Next.js 文档官网。
- 内容来源：同级目录下的 `pole-client-rust`、`pole-console`、`pole-control-plane`、`pole-controller`、`pole-sidecar`、`specification`。
- 已确认信息架构方向：首页采用“组织品牌优先”，先介绍 Lattice Hub 整体生态，再进入组件矩阵、文档、原理与博客。
- 已确认视觉方向：克制的服务治理基础设施风格。首屏优先呈现控制面、接口层和运行时组件关系；AI/MCP 作为能力增量出现，不主导视觉和标题。
- 已确认首版内容范围：采用“可发布官网首版”，首页完整，文档/原理/博客提供高质量种子内容；性能报告只写已有事实、配置数据和待实测框架，不编造压测数字。

## 计划

- [x] 将文档分区左侧目录重组为“是什么 / 使用指南 / 最佳实践”的产品阅读路径。
- [x] 补齐截图式目录需要的功能特性、接入方式、安装和实践入口页。
- [x] 增加测试，约束文档分区目录不再回退到技术模块堆叠。
- [x] 运行测试、lint、build、静态导出和浏览器截图验证。
- [ ] 提交、推送并确认 GitHub Pages 部署。

- [x] 按 Fumadocs 官方布局能力确认左侧分区切换实现方式。
- [x] 将文档、博客、报告接入 `DocsLayout` 的 `tabs` / sidebar dropdown。
- [x] 按当前分区过滤左侧目录树，避免博客和报告混在文档目录里。
- [x] 用测试、lint、build、静态导出和浏览器截图验证分区切换。
- [ ] 提交、推送并确认 GitHub Pages 部署；首次部署 run `28605021504` 的 build 成功，但 Pages deployment 长时间停在 `deployment_queued` 后被默认 10 分钟超时取消，已增加 deploy timeout 后重试。

- [x] 定位 Fumadocs 文档 light/dark 文字与格式异常的样式覆盖源。
- [x] 将官网首页视觉变量和 `article img` 等规则限制在首页作用域，避免污染 docs。
- [x] 为 Fumadocs 文档补齐 light/dark token 映射，恢复默认文档质感。
- [x] 用测试、lint、build、静态导出和浏览器截图验证 docs light/dark。
- [x] 提交、推送并确认 GitHub Pages 部署。

- [x] 定位 `/docs` 图片显示为 `[object Object]` 的根因。
- [x] 为结构化 image `src` 解包增加 RED/GREEN 测试。
- [x] 在 MDX 组件层解包结构化图片对象并接入 docs 页面。
- [x] 运行 test/lint/build/export，并检查导出 HTML 不再出现 `[object Object]`。
- [x] 提交、推送并确认 GitHub Pages 部署。

- [x] 使用 `fireworks-tech-graph` 规范重画文档里的架构图、流程图和数据流图。
- [x] 将 Mermaid 图替换为 `public/diagrams` 下的紧凑 SVG，并导出 PNG 自检产物。
- [x] 清理 Mermaid 运行时依赖、MDX 插件和组件注入。
- [x] 运行测试、lint、build，并抽查 `/docs` 与 `/docs/principles/architecture`。
- [x] 提交、推送并确认 GitHub Pages 部署。

## 已完成计划

- [x] 将 `/docs` 首页从 fumadocs 目录说明改为完整的产品能力总览。
- [x] 更新首页文档分流摘要，使“概览”表达产品能力入口而非目录入口。
- [x] 增加测试约束，防止 `/docs` 首页标题再次退回目录组织描述。
- [x] 运行测试、lint、build，并抽查 `/docs` 页面。
- [x] 提交并推送产品能力总览更新，等待 GitHub Pages 部署完成。

- [x] 核对 `../pole-control-plane` 真实代码入口，提取控制面架构、缓存事件流、治理规则发布、鉴权协议与观测链路。
- [x] 按真实实现补全 docs/principles 下的原理文档，加入架构图和数据流程图。
- [x] 更新必要的导航/索引元数据，确保文档模块可发现。
- [x] 运行测试、lint、build，并抽查生成后的文档内容。
- [x] 提交本轮文档与 Mermaid 渲染变更，推送到 `lattice-hub.github.io` 触发 GitHub Pages 部署。
- [x] 用 `gh` 检查 GitHub Actions 部署结果，并抽查线上 Principles 页面。

- [x] 将全站 GitHub 入口改为 `https://github.com/lattice-hub`。
- [x] 增加 GitHub Pages 静态部署配置，支持 Next/Fumadocs 静态导出到 `out/`。
- [x] 验证普通构建与 Pages 静态导出都能通过，并检查导出 HTML 的 basePath、logo 与 GitHub 链接。
- [x] 创建并配置 `lattice-hub/lattice-hub.github.io` 仓库，切换 GitHub Pages 到 workflow 部署并处理线上 404。

- [x] 按用户反馈重新逐条对齐 PRD：首页采用冷蓝 light canvas，而不是当前偏绿色基础设施风格。
- [x] 将首页右侧产品展示改为开放画布：治理拓扑不再被厚重卡片包裹，Agent 面板保持控制台式能力目录。
- [x] 首页 docs 分流拆成五个入口：概览、Principles、Components、Blog、Reports。
- [x] 更新测试，覆盖 PRD 分流入口与治理规则轮播硬约束。
- [x] 浏览器复查首页桌面与 390px 移动端，无横向滚动；测试、lint、build 通过。

- [x] 按 Open Design 交接重构首页：保留双主线首屏、去掉长落地页章节。
- [x] 新增组件生态官网入口 `/components`，链接回 docs 组件说明。
- [x] 补齐 `/docs/blog` 与 `/docs/reports` 分区索引页。
- [x] 验收导航均为真实页面跳转，不使用首页锚点入口。
- [x] 验收治理规则轮播保留 7 条规则、统一 `client → 控制面 → 上游` 拓扑、小圆点可点击。
- [x] 验证移动端无横向滚动，测试、lint、build 通过。

## 历史计划

- [x] 检查当前目录结构与版本控制状态。
- [x] 梳理同级组件 README 与现有文档，提取官网内容来源。
- [x] 确认官网信息架构、视觉方向与内容粒度。
- [x] 在实现前检查 Fumadocs 当前推荐集成方式。
- [x] 搭建 Fumadocs/Next.js 项目骨架。
- [x] 实现首页、文档、原理、博客四类页面。
- [x] 补齐组件说明、性能数据报告占位与原理文章内容。
- [x] 运行格式化、类型检查、构建或等价验证。
- [x] 记录 review 结果与后续改进项。

## Review

- 已创建 Next.js 16 + Fumadocs MDX 项目，文档内容维护在 `content/docs`，首页内容元数据维护在 `src/lib/site-content.ts`。
- 首页采用深色基础设施视觉和组件网络示意，突出 MCP/A2A Registry、Agent 可发现性、多协议治理、Proxyless + Sidecar 与 Kubernetes 原生接入。
- 文档系统包含组件说明、性能数据报告、原理文章和博客种子内容。性能报告只记录已确认配置事实和待实测指标，没有编造压测数字。
- 已验证：`npm test`、`npm run lint`、`npm run build` 均通过；浏览器检查首页、`/docs` 与 `/docs/blog/mcp-a2a-registry` 可正常渲染，未发现浏览器 error 日志。
- 后续建议：补充真实控制台截图、SDK Quickstart 示例、正式压测数据和组件版本统一说明。
- 根据用户反馈已重新审视首页风格，移除过强的 AI 化首屏表达、深色发光网格和网络节点视觉，改为浅色、克制、结构化的基础设施架构图。
- 根据 Open Design 交接稿完成二次收敛：首页只保留“流量治理与 Agent 发现进入同一个控制面”的主张、双主线产品展示和 docs 分流；新增 `/components` 官网一级入口；补齐 `/docs/blog`、`/docs/reports` 索引；导航不再使用首页锚点；治理轮播保留 7 条规则并使用小圆点切换。
- 本轮已验证：`npm test`、`npm run lint`、`npm run build` 均通过；浏览器检查 `/`、`/components`、`/docs`、`/docs/blog`、`/docs/reports` 可正常渲染；390px 移动端无横向滚动；浏览器 error 日志为空。
- 根据用户指出“首页和 PRD 差别很大”完成第三轮对齐：主色改为冷蓝 light canvas；首屏文案改为 Pole.IO / Lattice Hub 主张、双主线说明和两个 CTA；右侧治理轮播去掉外框与阴影，保留开放网格画布；首页分流拆成概览、Principles、Components、Blog、Reports 五个入口。
- 本轮已验证：`npm test`、`npm run lint`、`npm run build` 均通过；浏览器检查首页主导航、五个分流入口、治理轮播 7 个小圆点、开放画布外框为 0；390px 首页、docs、components 无横向滚动；浏览器 error 日志为空。
- 根据用户截图完成首页首屏复刻：Header、Lattice Hub 标识、居中导航、右侧 GitHub/阅读文档、Agent Discovery 大标题、副标题、CTA、状态行、左右箭头、底部分页器和 Registry 关系图均按截图重做。
- 本轮已验证：`npm test`、`npm run lint`、`npm run build` 均通过；1920 x 1280 浏览器对照截图通过；390px 首页无横向滚动；浏览器 error 日志为空；`design-qa.md` 记录 final result: passed。
- 根据用户反馈继续压缩顶部导航：桌面 Header 收到 60px，移动端收到 56px；右侧“阅读文档”从蓝色按钮改为普通超链，保留跳转但去掉背景、圆角、阴影和额外 padding。
- 本轮已验证：浏览器 computed style 显示桌面 Header 60px、移动 Header 56px；“阅读文档”为透明背景、零 padding、无阴影的 `a` 链接；390px 移动端无横向滚动；`npm test`、`npm run lint`、`npm run build` 均通过。
- 根据新的首页设计与动效设计语言完成第四轮升级：全局 token 改为 `--bg / --surface / --fg / --accent` 体系，矩形组件统一直角，新增固定蓝图网格与极光背景；首页扩展为 hero、home-lines、page-hub、facts、cta-band、footer wordmark；Hero 使用 Agent 发现优先的双主线轮播，Traffic 屏内嵌 7 条规则轮播。
- 本轮已验证：`npm test`、`npm run lint`、`npm run build` 均通过；浏览器 computed style 显示桌面 Header 60px、移动 Header 56px，按钮/玻璃卡/Agent 图均为 `border-radius: 0px`，玻璃 `backdrop-filter: blur(18px) saturate(1.68)` 生效；首页 4 个主线卡、5 个文档卡、4 个事实条均渲染；1280px 与 390px 均无横向溢出；浏览器 error 日志为空。
- 根据用户补充的 topnav 规格完成导航栏重构：Header 改为 `header.topnav > .container.topnav-inner`，左侧品牌使用用户提供 logo 的透明背景版 `public/lattice-hub-logo.png`，中间保留主导航，右侧 GitHub ghost + 唯一蓝色「阅读文档」CTA；移动端新增汉堡按钮和磨砂玻璃抽屉。
- 本轮修复 sticky 根因：`.site-shell { overflow-x: hidden }` 会让 sticky 绑定到错误滚动容器，改为 `overflow-x: clip` 后滚动时 `.topnav` 保持 `top: 0`。已验证桌面 topnav 高 59px、CTA 高 32px 且蓝色直角；390px 移动端汉堡显示、抽屉展开后 `aria-expanded=true`、6 个链接可见；桌面/移动均无横向溢出；`npm test`、`npm run lint`、`npm run build` 均通过。
- 根据用户要求将 GitHub 入口切换到 `https://github.com/lattice-hub`，并同步组件页 action 与测试断言；新增 `.github/workflows/deploy-pages.yml`，workflow 在 GitHub Actions 中运行 test/lint 后用 `NEXT_OUTPUT=export` 静态导出并部署 Pages。
- Pages 构建兼容性：`next.config.mjs` 仅在 `NEXT_OUTPUT=export` 时启用 `output: 'export'`、`trailingSlash` 与 `images.unoptimized`；workflow 根据仓库名写入 `NEXT_PUBLIC_BASE_PATH`，项目型 Pages 自动使用 `/<repo>`，`lattice-hub.github.io` 根站点则使用空 base path。已验证 `NEXT_OUTPUT=export NEXT_PUBLIC_BASE_PATH=/website npm run build` 通过，`out/` 包含首页、docs、components 和 logo，导出 HTML 中 `_next`、内部链接和 logo 均带 `/website` 前缀。
- 已通过 `gh` 创建并推送 `lattice-hub/lattice-hub.github.io`，Pages URL 为 `https://lattice-hub.github.io/`。初次页面 404 的根因为 Pages 仍处于 legacy/root 构建路径，已用 GitHub API 切换为 `build_type=workflow` 并重新触发 `deploy-pages.yml`；新 run `28539821573` 成功后，`curl -I https://lattice-hub.github.io/`、`/docs/` 与 `/lattice-hub-logo.png` 均返回 200。
- 根据 `../pole-control-plane` 真实代码补全原理文档：覆盖启动组件链路、CacheManager/EventHub、治理规则草稿与发布视图、鉴权资源映射、AI Registry、History/DiscoverEvent/Statis/OTel 观测链路；新增 Mermaid 架构图与数据流程图，并接入 Fumadocs Mermaid MDX 渲染组件。
- 本轮已验证：`npm test`、`npm run lint`、`npm run build`、`NEXT_OUTPUT=export npm run build` 均通过；本地 `/docs/principles/architecture` 返回 200；生成产物包含新增 Principles 页面与 Mermaid 组件引用。`npm install mermaid` 后 npm audit 仍报告 5 个 moderate 级依赖告警，本轮未做依赖安全升级。
- 本轮部署：提交 `fbdacd3 docs: expand control-plane principles` 并推送到 `origin/main`；GitHub Actions Pages run `28560402296` 成功；线上 `https://lattice-hub.github.io/`、`/docs/principles/architecture/`、`/docs/principles/ai-registry/`、`/docs/principles/observability-chain/` 均返回 200。
- 根据用户指出 `/docs` 首页应是产品能力介绍页，已将 `content/docs/index.mdx` 从 fumadocs 目录说明重写为“产品能力总览”，覆盖产品定位、核心能力、典型工作流、组件协作、阅读路径和首版边界；同步更新首页 docs 分流摘要，并新增测试防止标题退回目录说明。
- 本轮已验证：`npm test`、`npm run lint`、`npm run build`、`NEXT_OUTPUT=export npm run build` 均通过；本地 `http://localhost:3000/docs` 返回 200。
- 根据用户指出 Mermaid 架构图过大，已按 `fireworks-tech-graph` 规范重画文档内 23 张技术图，生成 `public/diagrams/*.svg` 和对应 PNG；所有 MDX Mermaid 代码块已替换为 SVG 引用，并移除 Mermaid 依赖、MDX 插件和运行时组件。
- 本轮已验证：`npm test`、`npm run lint`、`npm run build`、`NEXT_OUTPUT=export npm run build` 均通过；本地 `/docs`、`/docs/principles/architecture` 与 `/diagrams/control-plane-startup.svg` 均返回 200；构建产物中无 Mermaid 残留，CSS 已包含 `article img` 图样式。
- 本轮部署：提交 `f35be0e docs: replace mermaid diagrams with compact svgs` 并推送到 `origin/main`；GitHub Actions Pages run `28565439290` 成功；线上 `/docs/`、`/docs/principles/architecture/` 和 `/_next/static/media/control-plane-startup.0ogm7gn_2phni.svg` 均返回 200。
- 根据用户截图指出的破图问题，已定位到 Fumadocs/MDX 将 Markdown 图片编译成结构化静态资源对象，而原生 `img` 直接接收对象导致线上 HTML 出现 `src="[object Object]"`。
- 本轮修复在 `mdx-components` 中增加图片 `src` 解包逻辑，并显式把 docs 页面 MDX 渲染接入该组件；测试覆盖字符串路径和结构化 `{ src }` 两种输入，防止文档图再次破图。
- 本轮本地验证：`npm test`、`npm run lint`、`npm run build`、`NEXT_OUTPUT=export npm run build` 均通过；`out/docs` 与 `.next/server/app/docs` 中不再出现 `[object Object]`，`product capability map` 和 `control plane startup` 均导出为真实 SVG 静态资源路径。
- 本轮部署：提交 `61586d3 fix: resolve mdx diagram image sources` 并推送到 `origin/main`；GitHub Actions Pages run `28579686730` 成功；线上 `/docs/` 返回 200，HTML 不再包含 `[object Object]`，`product-capability-map` 与 `control-plane-startup` SVG 静态资源均返回 200。
- 根据用户指出 Fumadocs 文档 light/dark 文字和格式异常，已定位到官网全局样式污染文档主题：`:root` 覆盖了 Fumadocs 使用的 `--radius-lg`，`body` 覆盖了 Fumadocs 背景/文字变量，裸 `article img` 覆盖了文档 prose 图片样式。
- 本轮修复将首页视觉 token 收敛到 `.site-shell`，`body` 改回 `--color-fd-background / --color-fd-foreground`，并将文档图片补充规则限定到 `#nd-docs-layout article img`；新增测试防止再次覆盖 Fumadocs 主题变量。
- 本轮本地验证：`npm test`、`npm run lint`、`npm run build`、`NEXT_OUTPUT=export npm run build` 均通过；Playwright 截图验证 `/docs/reports/performance` light/dark 文字、表格、侧栏均正常，首页首屏未被作用域调整破坏。
- 本轮部署：提交 `d82e61a fix: isolate fumadocs document theme` 并推送到 `origin/main`；GitHub Actions Pages run `28590223259` 成功；线上 `/docs/reports/performance/` 返回 200，light/dark 截图均显示 Fumadocs 文档文字、表格和侧栏正常。
- 根据用户指出「文档、博客、报告应该在 Fumadocs 左侧顶部切换」，已确认 `DocsLayout` 原生支持 `tabs` 和 sidebar dropdown；新增 `docs-navigation` 将三个分区作为 tabs 接入，并按当前 slug 过滤左侧目录树。
- 本轮本地验证：`npm test`、`npm run lint`、`npm run build`、`NEXT_OUTPUT=export npm run build` 均通过；Playwright 截图验证 `/docs` 显示「文档」并只展示产品能力/原理/组件，`/docs/blog` 显示「博客」并只展示博客文章，`/docs/reports/performance` 显示「报告」并只展示报告目录。
