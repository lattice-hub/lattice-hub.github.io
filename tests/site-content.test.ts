import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import {
  blogPosts,
  capabilityPillars,
  componentGroups,
  docsSections,
  governanceDomains,
  isSiteNavActive,
  platformFacts,
  principles,
  productTopics,
  siteFooterNav,
  siteNav,
} from '../src/lib/site-content';
import { docsLayoutTabs, getDocsSectionTree } from '../src/lib/docs-navigation';
import { resolveImageSrc } from '../src/mdx-components';

test('site navigation exposes real site-level destinations', () => {
  assert.deepEqual(
    siteNav.map((item) => item.href),
    ['/product', '/components', '/docs'],
  );
  assert.ok(siteNav.every((item) => item.href.startsWith('/') || item.href.startsWith('https://')));
  assert.deepEqual(
    siteFooterNav.map((item) => item.href),
    ['/product', '/components', '/docs', 'https://github.com/lattice-hub/pole-control-plane'],
  );
  assert.deepEqual(productTopics.map((item) => item.href), ['/governance', '/agent']);
  assert.equal(isSiteNavActive('/product', '/product'), true);
  assert.equal(isSiteNavActive('/product/', '/product'), true);
  assert.equal(isSiteNavActive('/product/runtime', '/product'), true);
  assert.equal(isSiteNavActive('/governance', '/product'), true);
  assert.equal(isSiteNavActive('/governance/', '/product'), true);
  assert.equal(isSiteNavActive('/agent', '/product'), true);
  assert.equal(isSiteNavActive('/architecture', '/product'), true);
  assert.equal(isSiteNavActive('/components', '/product'), false);
  assert.equal(isSiteNavActive('/product', 'https://github.com/lattice-hub/pole-control-plane'), false);
});

test('product topics stay available without occupying primary navigation', () => {
  const header = readFileSync('src/components/site/SiteHeader.tsx', 'utf8');
  const homepage = readFileSync('src/app/page.tsx', 'utf8');
  const productPage = readFileSync('src/app/product/page.tsx', 'utf8');
  const interiorFooter = readFileSync('src/components/site/InteriorPage.tsx', 'utf8');
  const pages = [
    ['src/app/product/page.tsx', /一个控制面，/, /console-platform-metrics\.webp/],
    ['src/app/governance/page.tsx', /九类规则，/, /governanceDomains\.map/],
    ['src/app/agent/page.tsx', /让 Agent 理解变更，/, /只保存编辑态草稿/],
  ] as const;

  assert.doesNotMatch(JSON.stringify(siteNav), /\/#(?:capabilities|governance|agent)/);
  assert.match(header, /usePathname/);
  assert.match(header, /移动主导航/);
  assert.match(header, /aria-current/);
  assert.match(header, /产品体验，马上到来/);
  assert.match(header, /role="region"/);
  assert.match(header, /aria-live="polite"/);
  assert.doesNotMatch(header, /href="\/experience"/);
  assert.doesNotMatch(JSON.stringify(siteNav), /governance|agent|GitHub/);

  for (const [file, heading, evidence] of pages) {
    assert.ok(existsSync(file), `missing dedicated primary navigation page: ${file}`);
    const source = readFileSync(file, 'utf8');
    assert.match(source, heading);
    assert.match(source, evidence);
    assert.match(source, /<SiteHeader \/>/);
    assert.match(source, /<InteriorFooter \/>/);
  }

  assert.match(homepage, /href="\/product"/);
  assert.match(homepage, /href="\/governance"/);
  assert.match(homepage, /href="\/agent"/);
  assert.match(productPage, /productTopics\.map/);
  assert.match(productPage, /href=\{topic\.href\}/);
  assert.match(homepage, /siteFooterNav\.map/);
  assert.match(interiorFooter, /siteFooterNav\.map/);
  assert.doesNotMatch(`${homepage}\n${interiorFooter}`, /href="\/#(?:capabilities|governance|agent)"/);
});

test('component matrix covers the Lattice Hub ecosystem', () => {
  const componentNames = componentGroups.map((item) => item.name);

  assert.deepEqual(componentNames, [
    'Control Plane',
    'Console',
    'Rust SDK',
    'Kubernetes Controller',
    'Pingora Sidecar',
    'Limiter Server',
    'Specification',
  ]);
});

test('docs routing exposes the five PRD landing destinations', () => {
  assert.deepEqual(
    docsSections.map((section) => section.href),
    ['/docs', '/docs/principles/architecture', '/components', '/docs/practices/gray-release', '/docs/reports'],
  );
});

test('homepage uses the selected B+A direction and real product evidence', () => {
  const homepage = readFileSync('src/app/page.tsx', 'utf8');
  const hero = readFileSync('src/components/site/HomeHero.tsx', 'utf8');
  const architectureFlow = readFileSync('src/components/site/ArchitectureFlow.tsx', 'utf8');
  const architectureDiagrams = readFileSync('src/components/site/ArchitectureDiagrams.tsx', 'utf8');
  const architectureCss = readFileSync('src/components/site/ArchitectureFlow.module.css', 'utf8');
  const architectureDiagramCss = readFileSync(
    'src/components/site/ArchitectureDiagrams.module.css',
    'utf8',
  );
  const homeCss = readFileSync('src/components/site/HomePage.module.css', 'utf8');
  const globalCss = readFileSync('src/app/global.css', 'utf8');

  assert.match(hero, /把服务变化/);
  assert.match(hero, /收进一个控制面/);
  assert.match(hero, /<ArchitectureFlow \/>/);
  assert.doesNotMatch(hero, /console-platform-metrics\.webp/);
  assert.match(homepage, /console-platform-metrics\.webp/);
  assert.match(homepage, /console-governance-scope\.webp/);
  assert.match(homepage, /变更不是保存/);
  assert.match(homepage, /Agent 准备变更/);
  assert.match(homepage, /只保存编辑态草稿/);
  assert.match(homepage, /governanceDomains\.map/);
  assert.doesNotMatch(`${hero}\n${homepage}`, /console-preview|agent-workflow|fact-rail|get_config_file/);
  assert.doesNotMatch(`${hero}\n${homepage}`, />24<|>186<|22 正常|3 隔离|canary 20%/);
  assert.doesNotMatch(homepage, /负载均衡、超时、重试、节点熔断、故障转移/);
  assert.doesNotMatch(homeCss, /:root\s*{/);
  assert.doesNotMatch(globalCss, /aurora|glass-card|backdrop-filter|radial-gradient/);

  for (const keyword of ['组件协作', '治理生效', '查看完整架构', 'ArchitectureDiagrams']) {
    assert.ok(architectureFlow.includes(keyword), `missing architecture carousel fact: ${keyword}`);
  }

  for (const keyword of [
    'Console',
    'Kubernetes Controller',
    'Control Plane',
    'Rust SDK',
    'Pingora Sidecar',
    'Envoy / Gateway',
    'Specification',
    'SERVICE CALL',
  ]) {
    assert.ok(architectureDiagrams.includes(keyword), `missing component architecture fact: ${keyword}`);
  }

  assert.match(architectureFlow, /aria-pressed/);
  assert.match(architectureFlow, /aria-controls="architecture-flow-canvas"/);
  assert.match(architectureFlow, /ComponentCollaborationDiagram/);
  assert.match(architectureFlow, /GovernanceExecutionDiagram/);
  assert.match(architectureDiagrams, /<svg/);
  assert.match(architectureDiagrams, /<FlowPath/);
  assert.match(architectureDiagrams, /<PanoramaPlane/);
  assert.match(architectureDiagrams, /<PlatformNode/);
  assert.match(architectureDiagrams, /<ControlPlane/);
  assert.match(architectureDiagrams, /desktopDiagram/);
  assert.match(architectureDiagrams, /mobileDiagram/);
  assert.match(architectureCss, /prefers-reduced-motion: reduce/);
  assert.match(architectureCss, /scripting: none/);
  assert.match(architectureDiagramCss, /prefers-reduced-motion: reduce/);
  assert.match(architectureDiagramCss, /scripting: none/);
  assert.match(architectureDiagramCss, /node-receive/);
  assert.match(architectureDiagramCss, /path-reveal/);
  assert.doesNotMatch(architectureCss, /border-radius|box-shadow/);
  assert.doesNotMatch(architectureDiagramCss, /infinite|linear/);
  assert.doesNotMatch(
    `${architectureFlow}\n${architectureDiagrams}`,
    /MySQL|CacheManager|EventHub|CONFIG \+ GOVERNANCE ONLY|setInterval|Math\.random|requests per second|latency|uptime/,
  );
});

test('architecture page explains organization components without control-plane internals', () => {
  const architecturePage = readFileSync('src/app/architecture/page.tsx', 'utf8');
  const architectureCss = readFileSync(
    'src/app/architecture/ArchitecturePage.module.css',
    'utf8',
  );

  assert.match(architecturePage, /ORGANIZATION ARCHITECTURE/);
  assert.match(architecturePage, /多个组件/);
  assert.match(architecturePage, /治理能力如何生效/);
  assert.match(architecturePage, /ComponentCollaborationDiagram/);
  assert.match(architecturePage, /GovernanceExecutionDiagram/);
  assert.match(architecturePage, /Limiter Server/);
  assert.match(architecturePage, /当前是支持 HTTP、HTTP\/2、gRPC-h2c/);
  assert.match(architecturePage, /不进入每一次业务请求的同步热路径/);
  assert.match(architecturePage, /自身当前支持的能力/);
  assert.doesNotMatch(architecturePage, /MySQL|CacheManager|EventHub|内部存储层|增量缓存/);
  assert.match(architectureCss, /prefers-reduced-motion: reduce/);
  assert.match(architecturePage, /diagramStage/);
  assert.doesNotMatch(architectureCss, /\.diagramStage\s*{[^}]*border-radius/s);
  assert.doesNotMatch(architectureCss, /\.diagramStage\s*{[^}]*box-shadow/s);
});

test('website product screenshots are checked-in optimized assets', () => {
  const assets = [
    'public/product/console-platform-metrics.webp',
    'public/product/console-governance-scope.webp',
    'public/product/console-agent-readiness.webp',
  ];

  for (const asset of assets) {
    assert.ok(existsSync(asset), `missing website product asset: ${asset}`);
    assert.ok(statSync(asset).size > 5_000, `website product asset is unexpectedly small: ${asset}`);
    assert.ok(statSync(asset).size < 200_000, `website product asset should stay optimized: ${asset}`);
  }
});

test('governance catalog covers the nine implemented domains', () => {
  assert.deepEqual(
    governanceDomains.map((rule) => rule.id),
    ['route', 'lane', 'mirror', 'rate-limit', 'circuit-breaker', 'fault-detect', 'lossless', 'auth', 'mock'],
  );
  assert.equal(new Set(governanceDomains.map((rule) => rule.group)).size, 3);
});

test('homepage facts reflect the latest typed configuration catalog', () => {
  assert.deepEqual(platformFacts.map((fact) => fact.value), ['6', '9', '63', '1s']);
  assert.ok(capabilityPillars.some((item) => item.title.includes('运行环境')));
});

test('docs include principles and blog seed content', () => {
  assert.ok(principles.length >= 4, 'expected at least four principle articles');
  assert.ok(blogPosts.length >= 4, 'expected at least four blog posts');
});

test('docs index is a product capability overview', () => {
  const docsIndex = readFileSync('content/docs/index.mdx', 'utf8');

  assert.match(docsIndex, /title: 产品能力总览/);
  for (const keyword of ['运行环境', '服务注册发现', '流量治理', '配置中心', 'AI Registry', 'Pole Agent']) {
    assert.match(docsIndex, new RegExp(keyword));
  }
  assert.doesNotMatch(docsIndex, /title: .*fumadocs 目录组织/);
});

test('docs diagrams use compact static SVG assets', () => {
  const docsFiles = [
    'content/docs/index.mdx',
    'content/docs/principles/architecture.mdx',
    'content/docs/principles/cache-eventhub.mdx',
    'content/docs/principles/governance-release.mdx',
    'content/docs/principles/auth-protocols.mdx',
    'content/docs/principles/ai-registry.mdx',
    'content/docs/principles/observability-chain.mdx',
  ];

  const combined = docsFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
  const svgAssets = readdirSync('public/diagrams').filter((file) => file.endsWith('.svg'));

  assert.doesNotMatch(combined, /```mermaid/);
  assert.match(combined, /\/diagrams\/control-plane-startup\.svg/);
  assert.ok(svgAssets.length >= 20, 'expected generated SVG diagrams for docs architecture content');
});

test('mdx image component resolves structured image src objects', () => {
  assert.equal(resolveImageSrc('/diagrams/product-capability-map.svg'), '/diagrams/product-capability-map.svg');
  assert.equal(
    resolveImageSrc({ src: '/_next/static/media/product-capability-map.svg' }),
    '/_next/static/media/product-capability-map.svg',
  );
});

test('global styles do not override fumadocs document theming', () => {
  const globalCss = readFileSync('src/app/global.css', 'utf8');

  assert.doesNotMatch(globalCss, /:root\s*{[\s\S]*--radius(?:-lg)?:/, 'Fumadocs radius tokens must stay intact');
  assert.doesNotMatch(globalCss, /body\s*{[^}]*background:\s*var\(--bg\)/, 'body background should follow Fumadocs');
  assert.doesNotMatch(globalCss, /body\s*{[^}]*color:\s*var\(--fg\)/, 'body text color should follow Fumadocs');
  assert.doesNotMatch(globalCss, /body\s*{[^}]*font-family:/, 'body typography should follow Fumadocs');
  assert.doesNotMatch(globalCss, /^article img\s*{/m, 'docs images must not be styled through a global article selector');
  assert.match(globalCss, /\.site-shell\s*{[\s\S]*--page:/, 'homepage design tokens should be scoped to the homepage shell');
  assert.match(globalCss, /\.site-shell\s*{[\s\S]*font-family:/, 'homepage typography should be scoped to the homepage shell');
});

test('docs layout uses fumadocs section switcher for docs blog and reports', () => {
  assert.deepEqual(
    docsLayoutTabs.map((tab) => ({ title: tab.title, url: tab.url })),
    [
      { title: '文档', url: '/docs' },
      { title: '博客', url: '/docs/blog' },
      { title: '报告', url: '/docs/reports' },
    ],
  );

  const tree = {
    name: 'Lattice Hub',
    children: [
      { type: 'page', name: '产品能力总览', url: '/docs' },
      {
        type: 'folder',
        name: 'Lattice Hub 是什么',
        children: [
          { type: 'page', name: '功能特性', url: '/docs/what-is/features' },
          { type: 'page', name: '接入方式', url: '/docs/what-is/access' },
        ],
      },
      {
        type: 'folder',
        name: '使用指南',
        children: [
          { type: 'page', name: '服务端安装', url: '/docs/guides/server-install' },
          { type: 'page', name: '控制台使用', url: '/docs/guides/console-use' },
        ],
      },
      {
        type: 'folder',
        name: '原理',
        children: [
          { type: 'page', name: '架构', url: '/docs/principles/architecture' },
          { type: 'page', name: '缓存', url: '/docs/principles/cache-eventhub' },
          { type: 'page', name: '鉴权', url: '/docs/principles/auth-protocols' },
          { type: 'page', name: '观测', url: '/docs/principles/observability-chain' },
          { type: 'page', name: '治理发布', url: '/docs/principles/governance-release' },
          { type: 'page', name: 'AI Registry', url: '/docs/principles/ai-registry' },
        ],
      },
      {
        type: 'folder',
        name: '组件',
        children: [
          { type: 'page', name: 'Rust SDK', url: '/docs/components/rust-sdk' },
          { type: 'page', name: 'Kubernetes Controller', url: '/docs/components/kubernetes-controller' },
          { type: 'page', name: 'Pingora Sidecar', url: '/docs/components/pingora-sidecar' },
          { type: 'page', name: 'Specification', url: '/docs/components/specification' },
        ],
      },
      {
        type: 'folder',
        name: '最佳实践',
        children: [
          { type: 'page', name: '灰度', url: '/docs/practices/gray-release' },
          { type: 'page', name: 'K8s', url: '/docs/practices/kubernetes-sync' },
          { type: 'page', name: 'Agent', url: '/docs/practices/agent-discovery' },
          { type: 'page', name: 'Sidecar', url: '/docs/practices/sidecar-data-plane' },
        ],
      },
      {
        type: 'folder',
        name: '博客',
        index: { type: 'page', name: '博客', url: '/docs/blog' },
        children: [{ type: 'page', name: '实践', url: '/docs/blog/practice' }],
      },
      {
        type: 'folder',
        name: '报告',
        index: { type: 'page', name: '报告', url: '/docs/reports' },
        children: [{ type: 'page', name: '性能', url: '/docs/reports/performance' }],
      },
    ],
  };

  assert.deepEqual(
    getDocsSectionTree(tree, ['blog']).children.map((node) => node.name),
    ['博客', '实践'],
  );
  assert.deepEqual(
    getDocsSectionTree(tree, ['reports', 'performance']).children.map((node) => node.name),
    ['报告', '性能'],
  );
  assert.deepEqual(
    getDocsSectionTree(tree, ['principles', 'architecture']).children.map((node) => node.name),
    ['Lattice Hub 是什么', '使用指南', '最佳实践', '原理细节'],
  );
  assert.deepEqual(
    getDocsSectionTree(tree, []).children
      .filter((node) => node.type === 'folder')
      .flatMap((node) => node.children.map((child) => child.name)),
    [
      '简介',
      '功能特性',
      '接入方式',
      '服务端安装',
      '控制台使用',
      'Rust SDK 接入',
      'K8s 和 Controller',
      'Sidecar 和网格代理',
      '协议与网关',
      '灰度发布',
      'K8s 相关实践',
      'Agent 能力发现',
      'Sidecar 数据面',
      '控制面装配架构',
      '增量缓存与事件流',
      '治理规则与灰度发布',
      '鉴权链与资源映射',
      'AI Registry 与 Pole Agent',
      '观测链路',
    ],
  );
});
