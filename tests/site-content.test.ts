import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import {
  blogPosts,
  componentGroups,
  docsSections,
  governanceRules,
  principles,
  siteNav,
} from '../src/lib/site-content';
import { docsLayoutTabs, getDocsSectionTree } from '../src/lib/docs-navigation';
import { resolveImageSrc } from '../src/mdx-components';

test('site navigation exposes real site-level destinations', () => {
  assert.deepEqual(
    siteNav.map((item) => item.href),
    ['/docs', '/components', '/docs/blog', '/docs/reports', 'https://github.com/lattice-hub'],
  );
  assert.ok(siteNav.every((item) => !item.href.startsWith('#')), 'navigation must not use homepage anchors');
});

test('component matrix covers the Lattice Hub ecosystem', () => {
  const componentNames = componentGroups.map((item) => item.name);

  assert.deepEqual(componentNames, [
    'Control Plane',
    'Console',
    'Rust SDK',
    'Kubernetes Controller',
    'Pingora Sidecar',
    'Specification',
  ]);
});

test('docs routing exposes the five PRD landing destinations', () => {
  assert.deepEqual(
    docsSections.map((section) => section.href),
    ['/docs', '/docs/principles/architecture', '/components', '/docs/blog', '/docs/reports'],
  );
});

test('governance carousel keeps seven unified topology rules', () => {
  assert.deepEqual(
    governanceRules.map((rule) => rule.id),
    ['routing', 'lane', 'rate-limit', 'circuit-breaker', 'mirror', 'mock', 'auth'],
  );
  assert.ok(
    governanceRules.every(
      (rule) => rule.clientLabel && rule.controlLabel && rule.upstreamA && rule.upstreamB && rule.edgeA && rule.edgeB,
    ),
    'each rule needs client, control, upstream, and edge labels',
  );
});

test('docs include principles and blog seed content', () => {
  assert.ok(principles.length >= 4, 'expected at least four principle articles');
  assert.ok(blogPosts.length >= 4, 'expected at least four blog posts');
});

test('docs index is a product capability overview', () => {
  const docsIndex = readFileSync('content/docs/index.mdx', 'utf8');

  assert.match(docsIndex, /title: 产品能力总览/);
  for (const keyword of ['服务发现', '流量治理', '配置中心', '权限审计', 'AI Registry', '多运行时接入']) {
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
  assert.doesNotMatch(globalCss, /^article img\s*{/m, 'docs images must not be styled through a global article selector');
  assert.match(globalCss, /\.site-shell\s*{[\s\S]*--bg:/, 'homepage design tokens should be scoped to the homepage shell');
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
      '鉴权链与资源映射',
      '观测链路',
    ],
  );
});
