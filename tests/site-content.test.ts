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
