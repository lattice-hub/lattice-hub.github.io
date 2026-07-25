# Lattice Hub 官网建设计划

## 首页治理图 A/B 用户泳道与 GitHub 顶部入口（2026-07-26）

### 计划

- [x] 复核用户截图与现有图形语义，固定“上层管理控制、下层请求执行”的双层结构。
- [x] 将请求执行区重构为 User A → BLUE 稳定版本、User B → GREEN 体验版本两条清晰泳道，并保持同一 Agent Service 语义。
- [x] 用流量路径、限流状态、身份鉴权与结果反馈表达治理收益，完成中英文和移动端适配。
- [x] 在顶部导航右侧增加 GitHub 组织外链入口，并同步移动导航与回归测试。
- [x] 运行测试、lint、静态构建和真实浏览器视觉验收。
- [x] 提交、推送、发布并验证线上页面，在本节补充 Review。

### 本地实现 Review

- 治理图已从左右分栏重构为上下双层：管理控制面只发布治理视图，请求执行面单独承载用户、Gateway、蓝绿版本、身份鉴权、模型适配与旁路能力。
- User A 与 User B 使用两条不交叉的独立路径，经同一个 Agent Gateway 分别进入 BLUE 稳定版本与 GREEN 体验版本；80/20 明确标注为示例分配，不暗示只有两名用户或固定分群。
- BLUE / GREEN 被共同的 “同一 Agent Service” 边界包围；两条版本路径在服务身份鉴权后汇入同一个 Provider Adapter，GREEN 与 Fallback 保持不同语义。
- 中英文、桌面和移动端共享同一组结构与 locale 字段；390px 移动端保留 A/B 与 BLUE/GREEN 双路径，不再使用合并的 `B/G` 节点。
- 顶部右侧新增 GitHub 组织入口，桌面与移动抽屉均指向 `https://github.com/lattice-hub`，新窗口打开并带清晰的无障碍名称。
- 验证结果：18/18 测试、lint、静态生产构建和 `git diff --check` 均通过；1440px 与 390px 真实 Chrome 无横向溢出。动画运行 13.5 秒后仍为 `running`；reduced-motion 下动画为 `none` 并静态显示主拓扑。

### 发布 Review

- 实现提交：`0ed61e4 feat: clarify governed blue-green journeys`，已推送到 `origin/main`。
- GitHub Pages workflow run `30166197255` 的 build 与 deploy 均成功；workflow 内 18 项测试、lint、静态导出、artifact 上传与生产部署全部通过。
- 线上 `https://lattice-hub.github.io/` 与 `/docs/` 均返回 200；首页 HTML 已包含“两类用户，两条版本路径，同一个 Agent Service”、User A、GREEN 体验版本和 GitHub 组织地址。
- 线上 390px Chrome 验证 `scrollWidth = innerWidth = 390`，同时存在 User A、User B 和“同一逻辑服务”边界，移动 GitHub 入口准确指向 `https://github.com/lattice-hub`。

## 文档返回官网入口修复（2026-07-26）

### 计划

- [x] 回顾经验记录、检查截图并定位文档布局导航配置。
- [x] 增加回归测试，证明文档品牌标题当前错误地指向文档自身。
- [x] 将中英文文档品牌标题统一链接到官网首页，保持 Fumadocs 原生布局。
- [x] 运行定向测试、完整测试、lint、build 与静态导出验证。
- [x] 在本节补充 Review，记录根因、改动和验证结果。

### Review

- 根因是 `DocsLayout` 的品牌导航 `url` 使用 `getDocsUrl(locale)`，左上角标题因此只返回当前语言的文档首页，而不是官网首页。
- 修复保持 Fumadocs 原生品牌链接，只把中英文文档的目标统一改为 `/`；静态导出会自动叠加部署 `basePath`。
- 新增回归测试约束品牌入口必须指向官网根路径，且不能再次使用 docs URL。
- 验证结果：定向测试通过，完整测试 18/18 通过，lint、生产构建和 `/website` 静态导出均通过；导出 HTML 中中文和英文品牌标题均为 `href="/website/"`。

## 状态

- 当前目录：`/Users/chuntao.liao/Github/pole-io/website`
- 当前结论：目录基本为空，需要新建 Fumadocs/Next.js 文档官网。
- 内容来源：同级目录下的 `pole-client-rust`、`pole-console`、`pole-control-plane`、`pole-controller`、`pole-sidecar`、`specification`。
- 已确认信息架构方向：首页采用“组织品牌优先”，先介绍 Lattice Hub 整体生态，再进入组件矩阵、文档、原理与博客。
- 已确认视觉方向：克制的服务治理基础设施风格。首屏优先呈现控制面、接口层和运行时组件关系；AI/MCP 作为能力增量出现，不主导视觉和标题。
- 已确认首版内容范围：采用“可发布官网首版”，首页完整，文档/原理/博客提供高质量种子内容；性能报告只写已有事实、配置数据和待实测框架，不编造压测数字。

## 计划

- [x] 重新理解 Lattice Hub 的控制面、缓存事件、治理发布、AI Registry 与 K8s Controller 工作架构。
- [x] 生成新的首页工作架构 SVG/PNG，避免照搬 image-2 的服务 A/B/C 盒子布局。
- [x] 用新架构图替换首页当前 HTML 盒子图，并清理不再需要的数据和样式。
- [x] 更新测试，约束首页使用项目工作架构图而非手写盒子复刻。
- [x] 运行测试、lint、build、截图验证并部署 GitHub Pages。

- [x] 将首页 “Two operating lines” 区块改为功能架构图布局。
- [x] 在控制面能力域下补充服务管理、流量治理、故障容错、配置治理等子能力。
- [x] 让架构图表达控制面覆盖服务 A/B/C、SDK/Sidecar/K8s 等运行时接入关系。
- [x] 增加测试，防止首页能力区再次退回普通卡片网格。
- [x] 运行测试、lint、build、浏览器截图并部署 GitHub Pages。

- [x] 将文档分区左侧目录重组为“是什么 / 使用指南 / 最佳实践”的产品阅读路径。
- [x] 补齐截图式目录需要的功能特性、接入方式、安装和实践入口页。
- [x] 增加测试，约束文档分区目录不再回退到技术模块堆叠。
- [x] 运行测试、lint、build、静态导出和浏览器截图验证。
- [x] 提交、推送并确认 GitHub Pages 部署。

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

- 根据用户纠正，首页架构图不再沿用 image-2 的服务 A/B/C 盒子结构，改为基于真实项目抽象的三列主链路：入口与变更源、Lattice Hub 控制面、客户端轻量接入层。
- 新图强调 Lattice Hub 运行时风格是 thin SDK + local proxy / sidecar / proxy mesh：控制面生成服务、配置、治理和能力目录视图，客户端保持轻量，治理执行落在 SDK + proxy / mesh 层。
- 新增 `public/diagrams/lattice-hub-work-architecture.svg` 与 PNG 自检产物；首页改为引用生成 SVG，并删除上一版 `capabilityHighlights` / `runtimeServices` 服务 A/B/C 数据模型和对应 CSS。
- 本轮已验证：`npm test`、`npm run lint`、`npm run build`、`NEXT_OUTPUT=export npm run build` 均通过；Playwright 桌面截图确认首页架构图区块无页面横向溢出，移动端图只在 figure 内横向滚动；GitHub Pages run `28679842150` 成功。
- 根据用户截图，将文档分区左侧目录从技术模块堆叠改为产品阅读路径：Lattice Hub 是什么、使用指南、最佳实践、原理细节；文档、博客、报告仍通过 Fumadocs tabs 在左侧顶部切换。
- 新增 `what-is`、`guides`、`practices` 入口页，Rust SDK、K8s Controller、Sidecar、Specification 等技术模块保留为使用指南下的落地页面。
- 本轮已验证：`npm test`、`npm run lint`、`npm run build`、`NEXT_OUTPUT=export npm run build` 均通过；Playwright 截图确认 `/docs` 侧栏已按产品路径展示；GitHub Pages run `28637556766` 成功，线上 `/docs/` 返回 200 且 `last-modified: Fri, 03 Jul 2026 04:03:31 GMT`。
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

## 官网同步最新 Control Plane 设计与知识（2026-07-25）

### 目标与设计规格

- 以 `../pole-control-plane` 当前知识库、近期提交和 Console 实现为唯一事实来源，移除官网中过时的“A2A 规划中”“七类治理规则”等表述。
- 首页主张从“Agent Registry 优先”收敛为“服务治理控制面”，首屏同时呈现服务发现、治理发布、配置与 Pole Agent，但 AI 能力不支配整体视觉。
- 视觉语言与最新 Console 的 Fluent 迁移保持同源：企业蓝、冷灰背景、白色内容表面、细边框和克制圆角；删除极光、蓝图网格、玻璃拟态、磁吸与无业务意义的漂浮动效。
- 首屏右侧使用可读的真实产品界面抽象，不伪造控制台截图：展示环境、服务、治理发布状态与受控 Agent 变更链，所有数字和状态都来自已确认实现。
- 首页信息架构调整为：产品主张 → 控制面能力地图 → 九类治理与发布语义 → Pole Agent 安全操作闭环 → 运行与观测底座 → 文档分流。
- 保留 Next.js + Fumadocs 现有技术栈，不迁移框架；首页样式继续限定在 `.site-shell`，不得污染 Fumadocs light/dark token。
- 桌面与 390px 移动端都不得出现页面级横向滚动；交互元素必须具备 hover、pressed、focus-visible 和 reduced-motion 降级。

### 计划

- [x] 回顾 `context-kg/tasks/lessons.md`、仓库状态、现有首页和测试约束。
- [x] 审计当前首屏截图，确认现有极光、网格、玻璃卡和 Agent-first 主张已偏离最新 Console 设计。
- [x] 提炼 control-plane 最新能力、实现状态和可公开事实，形成内容映射。
- [x] 更新首页组件、站点内容模型、组件页与关键文档内容。
- [x] 收敛首页 CSS 和交互代码，删除不再使用的旧轮播、玻璃和磁吸样式。
- [x] 更新测试，约束九类治理规则、Pole Agent 真实运行边界、63 项系统配置和 Fluent 同源视觉。
- [x] 运行 test、lint、build、静态导出并检查导出内容。
- [x] 使用真实浏览器检查桌面与 390px 移动端截图、横向溢出和运行时错误。
- [x] 在本节补充 Review，记录事实来源、改动范围与验证结果。

### Review

- 事实来源为 `../pole-control-plane` 当前实现、知识文档和近期提交：官网已按六类协议、九类治理能力、草稿/发布/灰度/回滚语义、MCP 与 A2A 双 Registry、63 项类型化系统配置更新，不再把 A2A Registry 写成规划能力。
- Pole Agent 的公开边界已收敛为真实实现：完成理解、工具调用、预览差异、哈希与并发校验、用户确认、保存草稿的最小闭环；Agent 不直接发布配置，A2A 目前只承担 Agent Registry。
- 首页从 Agent-first 极光玻璃视觉改为与最新 Console 同源的 Fluent 产品表达，以服务治理控制面为主叙事；首屏、能力地图、九类治理、Agent 安全变更链、运行底座和文档分流均已重构。
- 同步更新组件目录和关键文档，补充 Pole Agent、Observability、治理发布与 AI Registry 阅读入口；性能页移除容易失真的固定缓存类别数量，仅保留当前可确认的刷新语义。
- 删除三个不再使用的旧轮播/交互组件，首页改为服务端静态产品界面抽象，减少无业务意义动效和客户端代码。
- 验证结果：`npm test` 12/12 通过，`npm run lint` 通过，`npm run build` 通过，`NEXT_OUTPUT=export NEXT_PUBLIC_BASE_PATH=/website npm run build` 通过，导出页面内部资源路径均带 `/website` 前缀。
- 浏览器验证覆盖 `/`、`/components`、`/docs` 的 1440px 与 390px 视口：页面无横向溢出、控制台与页面错误为空，移动端导航可展开；桌面与移动端截图已人工检查，验证产物未纳入工作区。

## 官网更新发布（2026-07-25）

### 计划

- [x] 确认当前分支、远端仓库和待发布差异。
- [x] 对相对 `HEAD` 的工作区差异执行 Standards / Spec 双轴审查。
- [x] 处理审查发现并重新运行 test、lint、build 与静态导出。
- [x] 提交并推送 `main`。
- [x] 等待 GitHub Pages workflow 完成，验证首页、组件页、文档页和关键静态资源。
- [x] 在本节补充发布 Review。

### 发布前 Review

- Standards 审查发现官网字体和 `.container` 仍可能污染 Fumadocs，已将字体、容器和顶栏样式收敛到 `.site-shell`，并新增回归断言；页脚结构重复属于非阻塞判断项，本次遵循最小影响原则不扩展重构。
- Spec 审查发现首屏产品抽象使用了未经确认的服务/实例数字和虚构运行状态，已改为多协议、双探测、版本化等已确认能力语义；工具轨迹由展示别名修正为真实 MCP 工具名 `get_config_file`。
- 已移除顶栏 `backdrop-filter`，补齐能力行、文档行和组件行的 pressed 状态。
- 最终本地验证：`npm test` 12/12 通过，`npm run lint` 通过，普通生产构建与 `/website` 静态导出均通过。
- Playwright 覆盖 `/`、`/components`、`/docs` 的 1440px 与 390px 视口：全部返回 200、无页面级横向溢出、无浏览器错误；移动端导航展开后 `aria-expanded=true`。

### 发布 Review

- 官网更新提交：`39af616 feat: align website with latest control plane`，已推送到 `origin/main`。
- GitHub Pages workflow run `30142042161` 的 build 与 deploy 均成功；workflow 内 test、lint、静态导出与 Pages artifact 上传全部通过。
- 线上 `https://lattice-hub.github.io/`、`/components/`、`/docs/`、`/docs/principles/ai-registry/` 与 `/lattice-hub-logo.png` 均返回 200。
- 线上 HTML 已包含“让服务治理”“九类治理能力”“配置差异已生成”和 `get_config_file`，AI Registry 文档已包含 A2A 当前 Registry 边界。
- 线上 Playwright 再验：首页桌面与 390px 移动端、组件页移动端、文档页移动端均无横向溢出或浏览器错误，移动端导航可正常展开。
- workflow 有一条非阻塞平台提示：GitHub Actions 正将部分基于 Node.js 20 的官方 action 强制运行在 Node.js 24；本轮部署不受影响，后续可随官方 action 主版本更新处理。

## Huashu-Design 首页重新设计（2026-07-25）

### 当前阶段：设计方向探索

- [x] 用官方公开仓库与本地最新实现核对产品事实，写入 `product-facts.md`。
- [x] 按核心资产协议审计 Logo、品牌色、字体与真实 Console UI。
- [x] 从真实 Console 页面获取至少 10 个截图候选，评分并选出 2 个主素材。
- [x] 写入 `brand-spec.md`，固定 Logo、UI 截图、色板、字型和禁区。
- [x] 基于三种不同流派提出文案与视觉方向。
- [x] 并行生成三套首页高保真 Demo，不修改生产首页。
- [x] 用真实 Chrome 检查三案的桌面/390px 截图、资源加载、横向溢出和浏览器错误。
- [x] 向用户展示三案，在用户确认方向后再实现生产首页。

### 设计问题定义

- 当前首页的问题不是单个字号或配色，而是“文案层级、产品证据与视觉主角”没有形成同一个叙事。
- 新首页必须使用真实 Logo 与真实 Console UI，不再用 CSS 手绘控制台替代数字产品素材。
- 首屏只回答三个问题：Lattice Hub 是什么、为什么值得相信、下一步去哪里。
- 全页不使用虚构指标、客户评价、服务状态或没有产品意义的装饰图。

### 方向探索 Review

- 已按 Huashu-Design 核心资产协议建立 `product-facts.md` 与 `brand-spec.md`，明确 Lattice.Hub / Pole Control Plane / Pole Agent 的品牌关系和公开事实边界。
- 已从当前真实 Console 获取 11 个界面候选，选择平台监控和治理规则详情作为首页证据；当前 Agent 页面含未配置状态，因此只保留能力文案，不把它伪装成产品主视觉。
- 三个方向分别来自信息建筑、当代极简和东方系统叙事，不是同一模板的换色版本；均使用正式 Logo、真实 Console 截图与可验证产品事实。
- Chrome 验证覆盖三案的 1440px 与 390px：6 个页面状态均无横向溢出、损坏图片、空链接、运行时错误或网络错误。
- 本阶段遵循 Junior Designer 检查点，只提交方向 Demo 供选择；生产首页尚未改动，也未发布。

## Huashu-Design 首页生产实现与发布（2026-07-25）

### 确认方向

- 采用方向 B 的当代极简版式骨架：暖白、大留白、轻量导航、克制边框与阴影，让真实产品成为视觉主角。
- 吸收方向 A 的文案力度和信息建筑：使用“变更不是保存，是版本”等短句观点，并通过编号、细线和发布语义建立秩序。
- 继续遵守 `product-facts.md` 与 `brand-spec.md`：使用正式 Logo、真实 Console 截图，不出现虚构状态、客户、指标或伪造界面。

### 计划

- [x] 复核当前首页组件、样式、内容模型和测试约束。
- [x] 将 B+A 方向实现到生产首页，并保留 Fumadocs 样式隔离。
- [x] 把精选 Console 截图转为适合静态站点的正式 WebP 资产。
- [x] 更新回归测试，锁定真实资产、关键文案和产品边界。
- [x] 运行测试、lint、普通构建和 GitHub Pages 静态导出。
- [x] 使用真实浏览器检查 1440px 与 390px 的首页、组件页和文档页。
- [x] 对生产差异执行 Standards / Spec 双轴审查并修复阻塞项。
- [x] 提交、推送并验证 GitHub Pages 线上页面。
- [x] 在本节记录实现与发布 Review。

### 实现 Review

- 首页已采用 B 的暖白、留白与真实产品主视觉，并用 A 的“变更不是保存，是版本”及编号信息建筑增强记忆点；旧的 CSS 手绘 Console、虚构式指标栏和模拟 Agent 对话已从页面结构移除。
- 新首页样式使用独立 CSS Module；全局样式只调整 `.site-shell` 官网 token 与共享顶栏，没有新增裸 `section`、`img`、`article` 或 Fumadocs token 覆盖。
- 正式产品资产为两张优化 WebP：平台监控 1600×1000、治理作用域 1340×520。治理图已物理裁掉管理员栏、测试 UUID 和无关侧栏，只保留真实的服务范围与熔断子规则界面。
- 内容审查纠正了探索稿中的事实偏差：九类治理改由 `governanceDomains` 权威数据渲染；协议限定为已确认的 Polaris、Nacos、Apollo、Eureka 与 Envoy xDS v3；MCP/A2A 只描述 Registry；Pole Agent 只描述已有配置文件更新并在确认后保存编辑态草稿。
- Standards 审查发现 1101–1189px 双栏可能溢出，已把单栏断点提高到 1200px，并新增 1150px 浏览器验收；发现的四组小字号低对比文本均已调整到 5.08:1–7.73:1。
- 本地验证：13 项测试、lint、普通生产构建、`/website` 静态导出均通过；33 个静态 HTML 的内部资源引用零缺失。
- Chrome 覆盖 1440px、1150px 与 390px 首页，以及 390px 组件页、文档页：无横向溢出、破图、空链接、运行时或网络错误；移动导航实际点击后 `aria-expanded=true` 且抽屉打开。

### 发布 Review

- 首页实现提交：`ea21c87 feat: redesign homepage with real product visuals`，已推送到 `origin/main`。
- GitHub Pages workflow run `30147786779` 的 build 与 deploy 均成功；workflow 内 test、lint、静态导出、Pages artifact 上传和部署全部通过。
- 线上 `https://lattice-hub.github.io/`、`/components/`、`/docs/` 与两张 `/product/*.webp` 资产均返回 200；首页 HTML 已包含新主标题、发布语义、Agent 边界和真实产品资产路径。
- 线上 Chrome 再验覆盖 1440px、1150px、390px 首页以及移动端组件页、文档页：无横向溢出、破图、空链接、运行时或网络错误；移动导航可正常展开。
- GitHub Actions 仍有官方 action 从 Node.js 20 被平台强制迁移到 Node.js 24 的非阻塞提示，以及 deploy-pages timeout 上限提示；本轮构建和部署结果不受影响。

## 一级导航独立页面（2026-07-25）

### 用户纠正

- 顶栏「产品 / 治理 / Pole Agent」不应继续使用首页锚点；三个一级入口都需要自己的稳定路由和完整页面。

### 计划

- [x] 审计现有导航、首页内容和可复用的产品事实。
- [x] 新建 `/product` 产品页，覆盖运行环境、协议、发布语义和运行时视图。
- [x] 新建 `/governance` 治理页，覆盖九类治理、作用域与版本化发布。
- [x] 新建 `/agent` Pole Agent 页，覆盖当前真实闭环、人工发布边界和 Registry 关系。
- [x] 更新顶栏、移动抽屉与页脚，使一级入口全部指向独立页面。
- [x] 更新测试并运行 test、lint、生产构建与 `/website` 静态导出。
- [x] 使用真实浏览器验证新页面桌面/移动端、导航与 Fumadocs 隔离。
- [x] 双轴审查后提交、发布并验证线上路由。
- [x] 在本节记录 Review。

### 本地实现 Review

- 一级导航现对应五个稳定站点路由：`/product`、`/governance`、`/agent`、`/components`、`/docs`；桌面导航与移动抽屉均提供当前页状态和 `aria-current`，首页旧锚点仅保留为兼容深链，不再充当一级栏目。
- `/product` 解释运行环境、多协议接入、六类能力、配置与治理的版本化发布语义以及不同运行时边界；`/governance` 解释九类规则、作用域、Revision / release version 与生效视图；`/agent` 解释 Pole MCP 只读上下文、内部 proposal / 确认内核和人工发布链。
- 三页延续 Huashu-Design 选定的 B+A 视觉方向，并使用真实 Logo、平台监控、治理作用域和 Pole Agent 就绪检查界面。Agent 图明确标注“配置不完整时 fail closed”，不伪造对话或成功状态。
- Spec 审查纠正了“所有资源都进入版本链”的事实扩张，并收敛 Sidecar、Controller、Pole MCP 与 A2A Registry 的职责；Standards 审查修复移动抽屉 resize 残留、页脚链接散落和移动导航 landmark；视觉审查修复 44px 点击目标、站内/外箭头、非交互假箭头和移动正文可读性。三轮复核均确认 blocker / important 已解决。
- 本地验证：14 项测试、lint、普通生产构建、`/website` 静态导出和 `git diff --check` 均通过；静态浏览器覆盖首页、三个新页面、组件页与文档页，全部 200、无横向溢出、破图、空链接或浏览器错误。
- Playwright 实际点击首页“产品”后到达 `/website/product/`；390px 移动抽屉展开后 `display=block`，拉宽到 1440px 后为 `display=none`；菜单点击目标为 44×44，站内次级 CTA 使用 `→`，Pole Agent 真实界面以 1600×1000 加载。

### 发布 Review

- 实现提交：`50be4be feat: add dedicated product navigation pages`，已推送到 `origin/main`。
- GitHub Pages workflow run `30149106978` 的 build 与 deploy 均成功；workflow 内安装、14 项测试、lint、静态导出、Pages artifact 上传和生产部署全部通过。
- 线上 `https://lattice-hub.github.io/`、`/product/`、`/governance/`、`/agent/`、`/components/`、`/docs/` 与 `/product/console-agent-readiness.webp` 均返回 200；六个页面无横向溢出或破图，浏览器未捕获 4xx / 5xx、控制台错误或页面异常。
- 线上首页实际点击“产品”后进入 `/product/`；产品、治理和 Agent 页的 H1、Metadata 标题与真实产品证据均为本次发布内容。
- Workflow 仍有官方 action 从 Node.js 20 被平台强制运行到 Node.js 24，以及 `deploy-pages` timeout 上限的非阻塞提示；本次构建和部署结果不受影响。

## 首页组件级 3D 等距架构图返工（2026-07-25）

### 用户纠正

- 降低图示密度不等于改变视觉语言；首页与架构页仍必须沿用用户参考图的 3D 等距拓扑风格，不能改成平面流程图。

### 计划

- [x] 复核参考图的等距视角、立体节点、空间连线与动态数据表达。
- [x] 在组件抽象层级上重新定义“组件协作 / 治理生效”两张 3D 拓扑。
- [x] 重构共享架构 SVG 与响应式样式，保持轮播和独立架构页复用。
- [x] 更新回归测试并运行 test、lint、生产构建与静态导出。
- [x] 使用真实浏览器验证桌面、移动端、双帧切换与 reduced-motion。
- [x] 完成视觉、事实、无障碍与性能终审。
- [x] 提交、发布并验证线上版本。
- [x] 在本节记录实现与发布 Review。

### 本地实现 Review

- 保留上一轮已经收敛的组织组件边界，但把平面流程图全面恢复为参考图式的 3D 等距空间拓扑：控制面是中央双层基座，组件是具有顶面与侧面的立体节点，虚线区域表达组件角色边界。
- 首页“组件协作 / 治理生效”两帧和 `/architecture` 复用同一组图形原语；桌面采用 `960 × 520` 完整拓扑，移动端采用 `390 × 410` 独立重排，不是把桌面图机械缩小。
- 组件协作图只展示 Console、Kubernetes Controller、Control Plane、Rust SDK、Limiter Server、Pingora Sidecar、Envoy / Gateway 与 Specification，不展示控制面内部存储、缓存、版本或领域服务。
- 治理图用上、中、下三条空间走廊分别连接 Rust SDK、Sidecar 扩展与 Envoy / Gateway，最终汇入 Service Call；现行协作使用实线，契约共享或演进中的接入使用虚线。
- 动画为一次性路径显现、数据单元移动和节点抬升；独立架构页保持静态，`prefers-reduced-motion` 与禁用 JavaScript 时停止所有运动，不使用无限循环。
- 本地验证：15 项测试、lint、`git diff --check` 与带 `/website` base path 的静态导出均通过；真实 Chrome 覆盖桌面双帧、架构页和 390px 移动端，页面无横向溢出，移动端正确切换为独立 SVG，reduced-motion 下没有运行中的动画。

### 发布 Review

- 实现提交：`6e67f71 fix: restore isometric architecture visuals`，已推送到 `origin/main`。
- GitHub Pages workflow run `30154852197` 的 build 与 deploy 均成功；workflow 内 15 项测试、lint、静态导出、Pages artifact 上传与生产部署全部通过。
- 线上 `https://lattice-hub.github.io/` 与 `/architecture/` 均返回 200，并包含组件协作、治理生效、Control Plane 与 Rust SDK 等本次内容。
- 公网桌面截图确认首页使用中央双层基座、立体组件节点、等距虚线区域与空间连线；CDP 以真实 390px 设备指标复核时 `innerWidth=390`、`scrollWidth=390`，移动导航与独立移动构图正常启用。

## 首页沉浸式组件全景图返工（2026-07-25）

### 用户纠正

- 当前图的节点标签、区域标题与连线仍相互干扰，3D 透视也让信息难读。
- 首页不需要把架构图包在厚重卡片中，应改成沉浸式全宽场景。
- 新方向参考“微服务全景图”的清晰分区与大尺度关系，但只做轻量 3D，优先保证视图可读性。

### 计划

- [x] 逐张审计用户截图，定位容器、连线、标签、透视与尺度问题。
- [x] 定义无外层卡片的沉浸式全景布局和轻量 3D 组件原语。
- [x] 重构首页“组件协作 / 治理生效”两帧与独立架构页。
- [x] 更新回归测试并运行 test、lint、构建与静态导出。
- [x] 使用真实浏览器验证桌面、390px 移动端、双帧与 reduced-motion。
- [x] 完成视觉、事实、无障碍与性能终审。
- [x] 提交、发布并验证线上版本。
- [x] 在本节记录实现与发布 Review。

### 本地实现 Review

- 首页 Hero 从左右两列卡片布局改为“上方文案叙事带 + 下方全宽架构场景”；架构组件移除外框、圆角、整块阴影、整宽 Tab 和白色 caption 底板，页面背景直接成为画布。
- 参考用户给出的“微服务全景图”重组为管理面、统一控制面、运行时和共享契约四层。分区名称全部水平显示，取消斜排区域标题、相互重叠的虚线领地和贴在线上的小字说明。
- 节点改为轻量 3D 圆形基座：立体感只来自顶面、侧壁与接触高度；组件名称和状态说明始终水平放在基座外，不再挤在倾斜面上。Control Plane 保留一处主视觉层级，普通节点不使用滤镜阴影。
- 两帧共享相同的分区骨架；组件协作图为 Console / Controller → Control Plane → SDK / Sidecar / Envoy / Limiter，治理图为 Engineer → Console / API → Control Plane → Runtime → Service Call。
- 所有路径改为独立走廊，箭头只出现在终点；Limiter 绕开 Sidecar，治理帧使用主干与上下分支，不再让连线穿节点、标签或分区标题。实线与虚线仍严格表达当前协作和契约/可选/演进接入。
- 移动端使用 `360 × 780` 独立纵向全景图，管理、控制、运行时依次排列；390px 浏览器指标为 `innerWidth=390`、`scrollWidth=390`，桌面 SVG 隐藏、移动 SVG 显示。
- `prefers-reduced-motion` 下运行中动画为 0，数据包全部隐藏；图形仍显示完整终态。15 项测试、lint、`git diff --check` 与带 `/website` base path 的静态导出全部通过。

### 发布 Review

- 实现提交：`1fea745 feat: make architecture panorama immersive`，已推送到 `origin/main`。
- GitHub Pages workflow run `30155857493` 的 build 与 deploy 均成功；workflow 内 15 项测试、lint、静态导出、Pages artifact 上传与生产部署全部通过。
- 线上 `https://lattice-hub.github.io/` 与 `/architecture/` 均返回 200；首页标题已更新为“组件全景协作”，架构 figure 的圆角为 `0px`，不再存在外层卡片视觉。
- 公网 1440px 截图确认管理面、控制面与运行时横向展开，所有区域名水平显示，Limiter 使用独立下方走廊；390px 公网设备指标为 `innerWidth=390`、`scrollWidth=390`，桌面图隐藏、移动全景图显示。

## 首页组件协作轮播与架构子页面（2026-07-25）

### 用户纠正

- 当前等距图信息过密且连线混乱；官网不应解释 `pole-control-plane` 的内部存储、缓存、版本等实现细节。
- 首页应从组织组件维度说明各组件如何协作，以及治理能力如何从控制面进入执行点并生效；完整内容可由独立子页面承载。

### 计划

- [x] 核对组织组件清单、对外职责与协作关系。
- [x] 定义首页“组件协作 / 治理生效”双主题轮播的信息层级。
- [x] 定义独立架构页的组件地图、治理执行链与接入方式。
- [x] 实现共享架构图、首页轮播与独立架构页。
- [x] 更新内容回归测试与必要的路由测试。
- [x] 运行 test、lint、生产构建与静态导出。
- [x] 使用真实浏览器验证桌面、移动端、键盘操作与 reduced-motion。
- [x] 完成事实、视觉、无障碍与性能终审。
- [x] 提交、推送并验证线上发布。
- [x] 在本节记录实现与发布 Review。

### 本地实现 Review

- 首页 Hero 原有单张高密度等距拓扑已替换为“组件协作 / 治理生效”手动双帧轮播；每帧只回答一个问题，不自动轮转，不再展示 Control Plane 的存储、缓存、事件、领域服务或版本内部机制。
- 组件协作帧以 Console、Kubernetes Controller、Control Plane、Thin SDK、Pingora Sidecar、Envoy / Gateway 与 Specification 为一级节点；治理帧收敛为“平台工程师 → Console / API → Control Plane → 运行时执行 → Service Call”。
- 实线表示当前明确的管理或协议路径，虚线表示同步、注入或仍按组件实现范围演进的接入边界；Pingora Sidecar 明确标注为数据面骨架，Kubernetes Controller 不被误画成治理执行器，Pole Agent 不进入治理发布链。
- 新增 `/architecture` 组件架构页，完整说明七个组织组件、治理执行三段链与管理/控制/执行边界；顶栏仍严格保持“产品 / 组件 / 文档 / 体验”，架构页归入产品 active 状态。
- 组件目录同步纠正事实层级：Pole Agent 归回 Console 工作模式，Observability 归回集成能力，新增 Limiter Server；Rust SDK、Controller、Pingora Sidecar 与 Specification 文案按相邻仓库当前事实收敛。
- 15 项测试、lint、`git diff --check`、普通生产构建与 `/website` 静态导出均通过。真实 Chrome 覆盖首页桌面、390px 两个轮播帧与架构页；移动端 `innerWidth = scrollWidth = 390`、图片完整、切换稳定，reduced-motion 下关闭流动线与帧入场动画。

### 发布 Review

- 实现提交：`eb84ae3 feat: explain component collaboration architecture`，已推送到 `origin/main`。
- GitHub Pages workflow run `30154118122` 的 build 与 deploy 均成功；workflow 内 15 项测试、lint、静态导出、Pages artifact 上传与生产部署全部通过。
- 线上 `https://lattice-hub.github.io/`、`/architecture/` 与 `/components/` 均返回 200；首页 HTML 已包含“组件协作 / 治理生效”双主题和完整架构入口，架构页已包含 Limiter Server 与治理执行说明。
- 线上 390px Chrome 实测首页与架构页 `innerWidth = scrollWidth = 390`，无横向溢出；双帧切换后 `aria-pressed` 与帧名称同步，reduced-motion 下流动线隐藏，架构页“产品”一级导航保持 active。所有实际加载图片完整，未捕获运行时异常或 4xx / 5xx 请求。
- Workflow 仍有官方 action 从 Node.js 20 被平台强制运行到 Node.js 24，以及 `deploy-pages` timeout 上限的非阻塞提示；本次构建和部署结果不受影响。

## 首页等距架构拓扑动态图返工（2026-07-25）

### 用户纠正

- 用户需要参考图式的等距空间架构拓扑动画：组件部署在一张立体系统图上，数据沿连线在节点间移动；现有横向五阶段流程图不符合预期。

### 计划

- [x] 复核参考图的空间语言、当前 Hero 尺寸与最新架构事实。
- [x] 定义等距拓扑节点、连线、数据路径、动效节奏与响应式规格。
- [x] 重构 `ArchitectureFlow` 为可访问的空间架构动态图。
- [x] 更新内容回归测试与产品事实说明。
- [x] 运行 test、lint、生产构建与静态导出。
- [x] 使用真实浏览器验证桌面、移动端、暂停/重播与 reduced-motion。
- [x] 完成事实、视觉、无障碍和性能终审。
- [x] 提交、发布并验证线上结果。
- [x] 在本节记录实现与发布 Review。

### 本地实现 Review

- 依据用户参考图，把原横向五阶段说明图完全重构为等距空间拓扑：左侧变化入口、中央 Lattice.Hub 控制面基座、右上配置/治理发布桥、右侧 SDK / Sidecar / Proxy Mesh 消费面，通过三块虚线领地建立部署空间感。
- 动态主体是一组沿斜向连接路径移动的数据铆钉与逐段留存的品牌蓝路径；节点收到数据后轻微抬升，Human Gate 做一次校验下压，Active View 上浮后停留。动画单次 8.6 秒，不循环。
- 入口连接不再出现无业务含义的分叉重汇；Console / API、Protocols、Kubernetes Controller 分别一次性汇入 Ingress。Pole Agent 使用独立虚线真实抵达 Draft，并在 Human Gate 前终止，不连向 Version 或 Active。
- 桌面端采用完整三域拓扑；移动端是独立的“核心岛 + 三方向”构图，不是缩小桌面图。发布桥与核心基座保留净空，运行时消费者由独立虚线领地承接。
- 语义边界保持真实：只有 Config 与 Governance 进入版本链；Service 和 MCP / A2A Registry 使用各自生命周期；Registry 只表达注册发现；运行时按实现范围消费。
- 生命周期覆盖暂停、继续、重播、离屏暂停、标签页隐藏、运行时 reduced-motion 切换与 720px 响应式切换。completed、reduced-motion 与 no-JS 共用明确静态终帧，SSR 保留完整文字替代。
- 本地验证：14 项测试、lint、普通生产构建、`/website` 静态导出与 `git diff --check` 均通过。Chrome 验证桌面和 390px 移动端零横向溢出，按钮为 88×44px，暂停状态冻结，移动端完成后可重播。
- 扩展浏览器审计通过 completed → reduced → completed、运行中 721 → 719px、完成后 719 → 721px；画布、响应式 SVG 与完成哨兵始终同步。事实、视觉、无障碍与性能终审均无 blocker / important。

### 发布 Review

- 实现提交：`1f9f8a0 feat: redesign homepage architecture as isometric topology`，已推送到 `origin/main`。
- GitHub Pages workflow run `30153305681` 的 build 与 deploy 均成功；workflow 内 14 项测试、lint、静态导出、Pages artifact 上传与生产部署全部通过。
- 线上 `https://lattice-hub.github.io/` 返回 200；桌面加载完整等距拓扑，390px 移动端切换为独立移动构图，两端均无横向溢出，五阶段与中央控制面节点完整。
- 线上桌面和移动端完成 8.6 秒单次动画后均显示“重新播放”；reduced-motion 直接进入静态终帧。公网浏览器未捕获 4xx / 5xx、控制台错误或页面异常。
- Workflow 仍有官方 action 从 Node.js 20 被平台强制运行到 Node.js 24 的非阻塞提示；本次构建和部署结果不受影响。

## 官网双语、持续架构动画与 Pole Sidecar 命名（2026-07-25）

### 计划

- [x] 审计现有动画、Sidecar 可见命名及文档国际化结构。
- [x] 设计并落地文档中英文路由、内容镜像与语言切换。
- [x] 让首页两幅架构图随语言切换，并实现持续、错峰、非线性数据动画。
- [x] 统一官网与文档中的产品组件名为 Pole Sidecar，保留实现说明与既有 slug。
- [x] 补充双语对称性、持续动画、reduced-motion 与命名回归测试。
- [x] 完成 test、lint、生产构建、静态导出与多视口浏览器验证。
- [x] 提交、推送、发布并验证线上中英文页面。
- [x] 在本节补充本地实现与发布 Review。

### 本地实现 Review

- 文档采用 Fumadocs 目录式国际化：中文继续使用 `/docs/...`，英文新增 `/en/docs/...`；两边各 28 篇并保持完全一致的 slug。文档页的「中文 / EN」入口会保留当前深链，metadata 同步生成 canonical 与 hreflang。
- 英文文档不是中文占位副本；自动化逐篇校验英文内容不含汉字。文档布局和浏览器根语言会随 locale 切换，中文既有链接不迁移。
- 首页「治理生效 / 组件协作」共用一套 3D 图结构，中英文节点、图例、说明与无障碍文本集中由 locale 字典提供；语言切换后当前主题保持不变。产品组件可见名统一为 `Pole Sidecar`，既有 `pingora-sidecar` 文档 slug 继续兼容。
- 数据路径与节点反馈改为 6.4 秒错峰无限循环，使用非线性贝塞尔节奏；真实 Chrome 等待 7.2 秒后仍有 38 个无限动画处于运行态。`prefers-reduced-motion` 下运行动画为 0，数据包隐藏、完整连接保持可读。
- 自动验证：17 项测试、ESLint、TypeScript、普通静态导出与 `/website` basePath 静态导出均通过，共生成 64 个页面。真实 Chrome 覆盖 1440px 与 390px：英文深链返回 200、页面正文无中文混排、`html lang="en"` 生效、语言按钮为 44×44px，两端均无横向溢出。

### 发布 Review

- 双语文档提交：`1c1befc feat(docs): add bilingual documentation`；架构图与持续动效提交：`99cac9e feat: localize continuous architecture flows`，均已推送到 `origin/main`。
- GitHub Pages workflow run `30160446144` 的 build 与 deploy 均成功；流水线内测试、lint、64 页静态导出、Pages artifact 上传与生产部署全部通过。
- 线上首页、`/docs/`、`/en/docs/` 与 `/en/docs/principles/architecture/` 均返回 200。英文架构原理页标题为 “Control-plane assembly”，正文无汉字混排，浏览器根语言为 `en`。
- 线上首页语言切换后标题、帧说明和按钮状态同步改为英文；等待完整周期后仍有 38 个错峰无限动画运行。1440px 无横向溢出，未发现资源 404。
- Workflow 仍有官方 action 从 Node.js 20 被平台强制运行到 Node.js 24 的非阻塞提示；本次构建与部署不受影响。

## GW 千人千面限流、蓝绿版本与身份鉴权（2026-07-25）

### 计划

- [x] 记录用户纠正并审计治理图现有节点、路径与空间余量。
- [x] 将 Agent Service A/B 重构为同一服务的蓝/绿版本。
- [x] 在 GW 处表达千人千面限流，并在分支上显示流量比例。
- [x] 在版本到 Provider Adapter 的调用边表达服务身份鉴权。
- [x] 同步中英文、桌面与移动图，保持持续错峰动画。
- [x] 补充测试并完成 test、lint、构建和真实浏览器验收。
- [x] 提交、发布并验证线上结果。
- [x] 在本节记录 Review。

### 本地实现 Review

- Gateway 节点现在明确承担按身份 / 租户维度的千人千面限流；治理能力带同步写明蓝绿路由与 GW 限流，避免把执行位置误读成 Agent Service 内部。
- 桌面端两个运行节点统一命名为 `Agent Service`，只通过 `BLUE / GREEN` 版本标记、蓝绿语义色与示例 `80% / 20%` 比例区分，清楚表达“同一服务的两个部署版本”。
- 蓝版本到 Provider Adapter 的上方调用边标出「服务身份调用鉴权 / SERVICE IDENTITY AUTH」；它仍属于黑色请求主链，不新增容易误导为旁路的第四种线型。图例相应调整为「请求 / 鉴权调用」。
- 移动端真实截图验证后，没有强塞两个服务节点，而是收敛为一个 `Agent Service` 3D 基座，节点内同时标出蓝 80% / 绿 20%，并在 Service → ADP 调用边保留短标签「身份鉴权」，解决首版比例文字与请求路径重叠的问题。
- 17 项测试、ESLint、TypeScript、64 页静态导出与 `git diff --check` 全部通过。真实 Chrome 覆盖中文 / 英文 1440px 与中文 390px，比例、限流、鉴权标签均可读；桌面运行 38 个、移动运行 25 个持续动画，页面无横向溢出。

### 发布 Review

- 实现提交：`de38aef`（`feat: clarify agent gateway governance flow`），已推送到 `origin/main`。
- GitHub Pages workflow `30161214086` 构建与部署成功；线上首页返回 HTTP 200，并包含千人千面限流、蓝 80% / 绿 20% 与服务身份调用鉴权。
- 线上真实浏览器复核：1440px 中文与英文治理语义均完整呈现；390px 下 `scrollWidth = innerWidth = 390`。等待 9 秒后桌面与移动端分别仍有 38 个和 25 个动画运行，确认动态图持续循环。

## 治理收益场景化动态图重构（2026-07-25）

### 用户纠正

- 当前治理图仍然主要依赖横条、节点副标题和路径标签解释能力，视觉上像“给架构图贴文字”。
- 需要从设计、动画和架构共同表达每项治理能力怎样改变一次 AI 服务调用，以及用户最终获得什么收益。

### 设计假设

- 叙事角色：官网首页的产品价值证明，不是内部实现拓扑或能力清单。
- 观众距离：以 1 米笔记本阅读为主，同时保证 390px 手机快速扫读。
- 视觉温度：冷静、可信、有运行感；沿用暖白纸面、克制品牌蓝和轻量 3D 基座。
- 容量策略：桌面保持一条主请求旅程，每轮突出 3 个连续收益阶段；移动端保留同一事件顺序并压缩辅助支路，不把所有说明同时摊开。

### 计划

- [x] 记录纠正并审计截图、现有治理图与能力边界。
- [x] 定义各治理能力的可视化事件、结果状态和收益叙事。
- [x] 重构桌面与移动治理动态图并同步中英文。
- [x] 补充测试并完成多视口、动画和可访问性验证。
- [x] 提交、发布并验证线上版本。
- [x] 在本节记录实现与发布 Review。

### 本地实现 Review

- 移除原先承载能力清单的黑色横条，把治理图重构成 12.8 秒循环的“一次请求治理旅程”；拓扑保持 3D 等距基座，但叙事焦点从组件名称转向请求状态变化。
- 千人千面限流由 GW 上方的多请求画像点、配额弧与超额终止标记表达；蓝绿分流增加 10 点比例尺，8 个蓝点和 2 个绿点直接对应示例 80% / 20%，并继续明确它们是同一 Agent Service 的两个版本。
- 服务身份鉴权使用调用边上的盾牌与勾选动画；主模型失败使用失败标记、弧形切换和备用模型成功状态表达，让“匿名调用被拒”和“故障仍可用”成为架构结果而非副标题。
- 镜像请求只复制到 Shadow Eval 且不回到响应链，Mock 演练沿短路路径返回；Prompt 使用 `v12 → v13` 版本轨，Secret Reference 在 Provider Adapter 边界前停止并解锁，分别表达安全评估、无真实模型联调、可控 Prompt 变更和凭据不暴露。
- 桌面完整呈现 8 个收益点；移动端压缩为单列主链，以节点状态和简短收益标题保留限流、放量、鉴权、故障切换、镜像、Mock、Prompt 与 Secret，不再把桌面说明文字强塞进 390px。
- 17 项测试、ESLint、TypeScript、64 页静态导出和 `git diff --check` 全部通过。真实 Chrome 覆盖中文桌面、中文移动、英文桌面和英文移动；1440px 与 390px 均无横向溢出、无控制台错误。等待 14 秒后仍有 62 个动画运行，reduced-motion 下动画为 0 且所有收益终态可见。

### 发布 Review

- 实现提交：`c45949f`（`feat: visualize governance outcomes`），已推送到 `origin/main`。
- GitHub Pages workflow `30164257604` 的首次部署因平台步骤达到 10 分钟上限而超时；失败任务重跑后，build 与 deploy 均成功，部署步骤耗时 15 秒。
- 线上首页返回 HTTP 200，并同时包含容量保护、低风险发布、服务身份鉴权、故障可用、真实流量安全评估、Mock 联调、Prompt 可控变更与凭据不暴露八类收益。
- 线上真实浏览器复核：中文与英文收益语义完整，1440px 动画等待 14 秒后仍保持 62 个运行实例；390px `scrollWidth = innerWidth = 390`，无脚本或控制台错误。

## 首页 AI Agent 治理视觉精修（2026-07-25）

### 用户建议

- 「不错，你再打磨下细节和布局」：保留已经确认的 3D 等距方向，对首屏比例、节点秩序、连线、标签和移动端密度做精修。

### 计划

- [x] 审计线上桌面与移动首屏，形成按严重度排序的精修清单。
- [x] 优化标题区、轮播切换器和架构画布的比例与对齐。
- [x] 精修节点层级、连线避让、标签字号与动效节奏。
- [x] 完成测试、lint、生产构建和多视口视觉验收。
- [x] 提交、发布并验证线上版本。
- [x] 在本节补充实现与发布 Review。

### 本地实现 Review

- 首屏文案区与架构区的间距被收紧：1440px 下架构区起点由约 498px 提前到 410px；390px 下由约 654px 提前到 532px，两个主行动在移动端改为并排布局。
- 轮播移除重复的 `01 / 02` 计数和卡片式选中框，改为无框文字 Tab 与连续下划线，降低控件对架构图的视觉竞争。
- 服务、网关、Adapter、模型和组织组件改为轻量 3D 服务器基座；只保留人员/请求圆盘和核心 Control Plane 圆盘，减少“所有节点都是数据库”的语义误导。
- 移动治理图由三块空间压成「管理与控制 / AI 服务流量」两层，主链保持完整；重新布线后连线不再穿过 Gateway 标签，Agent Service 与 Provider Adapter 的标签也保留独立呼吸区。
- 图例移出 SVG 覆盖层，桌面与移动都使用独立说明行；A2A Registry、数据面支持范围等事实限定提高字号，不再作为装饰微字。
- 15 项测试、lint、生产构建与 `git diff --check` 均通过；1440、960、390、360 四个视口无横向溢出或浏览器异常，默认治理帧与组件协作切换均正常，减少动态效果模式下无持续动画。

### 发布 Review

- 实现提交：`1a74ab5`（`feat: polish homepage architecture layout`）。
- GitHub Pages workflow `30158340554` 构建与部署成功，线上首页返回 HTTP 200，并包含新版 Rust SDK、A2A 请求边界、Pole Agent Prompt 与 Pole Secret 文案。
- 线上真实浏览器复核：1440px 架构区起点为 410px，390px 为 532px；默认选中「治理生效」，切换「组件协作」正常，两个视口均无横向溢出、脚本异常或减少动态效果下的持续动画。

## 首页 AI Agent 服务治理场景（2026-07-25）

### 用户建议

- 「治理生效」可以使用 AI Agent 服务作为示例，同时表达 A/B 路由、限流、降级、流量镜像、Mock、动态 Prompt 与凭据托管；凭据必须明确不进入模型上下文。

### 计划

- [x] 复核经验记录、设计规范与 `../pole-control-plane` 最新能力边界。
- [x] 定义 AI Agent 治理场景的信息架构与双路径布局。
- [x] 重构桌面和移动治理动态图及首页文案。
- [x] 完成测试、构建、事实与视觉验收。
- [x] 提交、发布并验证线上版本。
- [x] 在本节记录实现与发布 Review。

### 本地实现 Review

- 首页默认首帧改为 AI 服务治理示例：请求进入 Agent Gateway 后按权重分流至两个 Agent Service 版本，经 Provider Adapter 调用主模型，并在已支持的执行路径中切换 Fallback。
- 治理能力带统一呈现 A/B 路由、限流、熔断、流量镜像与 Mock；蓝色路径表示治理视图，深色路径表示请求流量，灰色虚线表示镜像或旁路，三类语义在图例中分开。
- 桌面端完整展示 Shadow Eval 与 Mock Response；移动端为保证可读性，保留“请求 → Gateway → A/B Agent Service → Adapter → 主/降级模型”主链，镜像与 Mock 收进治理能力带。
- 事实边界按 `../pole-control-plane` HEAD `5d6e37c0` 收敛：图中 Agent Service 显式标注为 Pole Service 示例；通用服务治理不等于 A2A task 代理，A2A Registry 在桌面和移动图中都明确为仅注册发现、不在请求路径。
- Pole Agent 的 Prompt 明确限定为内置 Prompt 与 Operator Instructions 的版本化发布；Pole Secret 只在 Provider Adapter 运行时解析，凭据不进入浏览器、日志或模型上下文。
- 本地验证：15 项测试、lint、生产构建与 `git diff --check` 均通过；无头 Chrome 复核桌面和 390px 移动端无横向溢出，移动端节点、标签和连线无重叠。

### 发布 Review

- 实现提交：`1e1b45e`（`feat: present AI service governance on homepage`）。
- GitHub Pages workflow `30157479832` 构建与部署成功；线上首页返回 HTTP 200，并包含 AI Service Traffic、Pole Agent Prompt、Pole Secret 与 A2A Registry 边界说明。
- 线上 390px 真实浏览器复核：默认选中「01 治理生效」，页面 `scrollWidth` 与 `innerWidth` 均为 390；减少动态效果模式下无持续运行动画。

## 一级导航收敛与产品归属（2026-07-25）

### 用户纠正

- 服务治理与 Pole Agent 应归入产品体系，不再和「产品」并列；顶部导航只保留「产品 / 组件 / 文档 / 体验」，体验点击后提示“马上到来”。

### 计划

- [x] 审计顶部导航、页脚、产品专题入口与 active 状态。
- [x] 顶部导航收敛为产品、组件、文档与体验动作，移除顶栏 GitHub。
- [x] 治理与 Agent 保留深度页面，并在产品页增加对等专题入口。
- [x] 页脚同步收敛产品层级，避免治理与 Agent 再次被表达为一级栏目。
- [x] 为体验提示补齐桌面、移动端与无障碍交互。
- [x] 更新测试并完成 test、lint、构建、静态导出与浏览器验证。
- [x] 审查、提交、发布并验证线上交互。
- [x] 在本节记录 Review。

### 本地实现 Review

- 顶部导航现严格收敛为「产品 / 组件 / 文档 / 体验」四项；GitHub 仅保留在页脚，治理与 Pole Agent 不再以一级栏目重复出现。
- `/governance` 与 `/agent` 深度页面继续保留，并在 `/product` 新增「进入控制面的两个关键工作面」专题入口；访问这两个页面时，顶部「产品」保持 `aria-current="page"`，清楚表达它们的产品归属。
- 「体验」采用就地状态提示而非空白占位页：点击后显示“产品体验，马上到来。”，支持再次点击、关闭按钮与 Escape 关闭，并将焦点还给触发按钮；桌面与移动端点击目标均不少于 44×44px。
- 页脚统一为「产品 / 组件 / 文档 / GitHub」；首页、组件页与通用内页均从同一份 `siteFooterNav` 数据渲染，避免导航层级再次漂移。
- 本地验证：14 项测试、lint、普通生产构建、最终 `/website` 静态导出与 `git diff --check` 均通过。
- Chrome 实际交互覆盖桌面与 390px 移动端：四项导航文本准确；体验提示打开、切换关闭、Escape 与焦点恢复正常；移动抽屉跨断点无残留且页面无横向溢出。
- 产品页两张专题卡分别到达 `/governance/` 与 `/agent/`；两个深度页均将「产品」标记为当前一级栏目。信息架构与无障碍复核均已通过，未留下 blocker 或 important 问题。

### 发布 Review

- 实现提交：`912583c feat: simplify primary navigation`，已推送到 `origin/main`。
- GitHub Pages workflow run `30150273865` 的 build 与 deploy 均成功；workflow 内 14 项测试、lint、静态导出、Pages artifact 上传与生产部署全部通过。
- 线上首页、`/product/`、`/governance/` 与 `/agent/` 均返回 200；桌面与移动导航都严格显示「产品 / 组件 / 文档 / 体验」，浏览器未捕获 4xx / 5xx、控制台错误或页面异常。
- 线上实际点击「体验」后显示“产品体验，马上到来。”；再次点击、关闭按钮与 Escape 均可关闭，焦点正确回到对应触发按钮，390px 页面无横向溢出。
- 线上产品页已出现治理与 Agent 专题卡；进入两个专题页后，「产品」均为当前一级栏目。移动抽屉从 390px 拉宽再缩回后保持关闭，未残留错误状态。
- Workflow 仍有官方 action 从 Node.js 20 被平台强制运行到 Node.js 24 的非阻塞提示；本次构建和部署结果不受影响。

## 首页产品架构数据动态图（2026-07-25）

### 设计假设

- 动态图承担首页 Hero 的产品架构叙事角色，现有真实 Console 截图继续留在下一屏作为产品证据，避免同一信息重复出现。
- 动画表达“多协议入口 → 统一控制面 → 版本化变更 → 多形态运行时消费”的真实数据流，不使用虚构指标、服务状态或客户数据。
- 视觉延续已确认的 B+A 方向：暖白编辑感、克制品牌蓝、细线信息建筑；运动采用低噪声的一镜到底工具式节奏。
- 动画必须支持 `prefers-reduced-motion`、键盘可操作的暂停/播放和移动端静态降级，不引入重量级动画依赖。

### 计划

- [x] 核对首页、品牌规范与 `../pole-control-plane` 最新架构事实。
- [x] 形成架构节点、数据路径、时间轴和响应式规格。
- [x] 实现可访问的首页架构数据动态图组件。
- [x] 接入 Hero 并更新样式与内容回归测试。
- [x] 运行 test、lint、生产构建与静态导出。
- [x] 使用真实浏览器验证桌面、平板、移动端、reduced-motion 和交互。
- [x] 完成事实、视觉、无障碍与性能复核。
- [x] 在本节记录实现 Review 与交付结果。

### 本地实现 Review

- 使用 Huashu-Design 先探索三种叙事方向，最终采用“变化接力”：用一条品牌蓝主线串联「入口汇入 / 统一模型 / 确认与版本 / 生效视图 / 运行时消费」五个阶段。首轮深色控制台方案在真实截图复核后被主动舍弃，最终视觉回到暖白编辑感、细线分栏与克制动效。
- 动态图取代 Hero 右侧重复的 Console 截图；真实 Console 截图仍保留在下一屏作为产品证据。动态图只表达架构关系，不虚构实时吞吐、延迟、在线状态或客户数据。
- 事实边界按 `../pole-control-plane` 当前实现收敛：Polaris、Nacos、Apollo、Eureka 与 xDS v3 汇入统一控制面；MCP / A2A 只表达注册发现；只有配置与治理进入草稿、版本、Active 发布链；Pole Agent 只保存已有配置的编辑态草稿，正式发布仍由用户确认。
- 动画为 8.4 秒一次性叙事，完成后停留在全量视图并支持暂停、继续与重播；页面离屏、标签页隐藏时自动暂停。`prefers-reduced-motion` 和禁用 JavaScript 时直接显示完整静态架构，SSR 仍保留完整语义列表。
- 本地验证：14 项测试、lint、普通生产构建、`/website` 静态导出与 `git diff --check` 均通过。真实 Chrome 覆盖桌面、320 / 768 / 820 / 821px 与 390px 移动端，无横向溢出；暂停状态保持冻结，桌面和移动端完成后均显示重播；操作按钮为 88×44px。
- 事实、视觉与无障碍 / 性能终审均已通过，未留下 blocker 或 important 问题。

### 发布 Review

- 实现提交：`9c06ce3 feat: add homepage architecture motion graphic`，已推送到 `origin/main`。
- GitHub Pages workflow run `30151760638` 的 build 与 deploy 均成功；workflow 内 14 项测试、lint、静态导出、Pages artifact 上传与生产部署全部通过。
- 线上 `https://lattice-hub.github.io/` 返回 200；桌面与 390px 移动端均渲染五个阶段、无横向溢出，浏览器未捕获 4xx / 5xx、控制台错误或页面异常。
- 线上桌面动画完成后停留在终帧并显示“重新播放”；移动端滚动进入架构图后进入播放态；系统 reduced-motion 下直接进入静态终帧。
- Workflow 仍有官方 action 从 Node.js 20 被平台强制运行到 Node.js 24，以及 `deploy-pages` timeout 上限的非阻塞提示；本次构建和部署结果不受影响。

## 首页治理生效优先与多语言调用图（2026-07-25）

### 用户纠正

- 首页轮播应先讲「治理生效」，再讲「组件协作」。
- 「治理生效」不能继续停留在运行时组件清单，而要通过 Java、Rust、Go、Python 等多语言服务之间的真实调用关系，说明治理视图如何下发、在何处执行、怎样作用于每次调用。

### 计划

- [x] 记录本轮纠正并复核现有治理帧与多语言服务叙事边界。
- [x] 定义治理视图下发、执行点与多服务调用的无交叉布局。
- [x] 调整轮播顺序并重构治理生效桌面与移动图。
- [x] 完成测试、构建和桌面移动端视觉验收。
- [x] 提交、发布并验证线上版本。
- [x] 在本节记录实现与发布 Review。

### 本地实现 Review

- 首页轮播顺序调整为「01 治理生效 / 02 组件协作」，默认直接呈现治理价值；Hero 说明同步改为多语言服务通过 SDK 或代理执行统一治理意图。
- 桌面治理图重构为管理控制区与多语言服务区：平台工程师经 Console / API 一次发布，Control Plane 通过蓝色治理视图总线分发至 Java、Rust、Go、Python 服务；深色业务调用线独立串联 Order、Inventory、Payment 与 Risk Service。
- 每个服务节点只标明用户可理解的执行形态（SDK / Proxy、Rust SDK、Sidecar、Envoy / xDS），不展示 Pole Control Plane 的内部领域、存储或发布实现。
- Java、Rust、Go、Python 服务链明确标注为示例拓扑；文案限定治理只在已接入且支持对应能力的执行点生效，不把示意映射写成既有实现承诺。
- 移动端使用独立纵向布局：治理视图走左侧蓝色轨道，服务调用走右侧深色轨道并从节点侧边进入，避免路径穿过节点名称；390px 视口 `scrollWidth = innerWidth = 390`。
- 图例拆分为「治理视图 / 服务调用 / 演进接入」，桌面与移动均保持水平标签和 3D 基座语言；无头 Chrome 像素复核未发现路径穿字、节点越界或横向溢出。
- 本地验证：15 项测试、lint、生产构建与 `git diff --check` 全部通过。

### 发布 Review

- 实现提交：`5661826 feat: show governance across service calls`，已推送到 `origin/main`。
- GitHub Pages workflow run `30156755552` 的 build 与 deploy 均成功；workflow 内测试、lint、静态导出、Pages artifact 上传与生产部署全部通过。
- 线上 `https://lattice-hub.github.io/` 返回 200；页面默认激活「01 治理生效」，包含多语言示例拓扑与“已接入的跨服务调用点”事实边界。
- 线上 390px 浏览器复核 `scrollWidth = innerWidth = 390`，治理图完整使用移动布局，未出现横向溢出。
- Workflow 仍有官方 action 从 Node.js 20 被平台强制运行到 Node.js 24 的非阻塞提示；本次构建和部署结果不受影响。
