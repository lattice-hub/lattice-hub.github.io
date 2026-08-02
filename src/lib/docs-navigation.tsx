import { BarChart3, BookOpen, Code2, Newspaper, Users } from 'lucide-react';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';
import type * as PageTree from 'fumadocs-core/page-tree';
import type { DocsLocale } from '@/lib/source';

type DocsSection = 'docs' | 'api' | 'blog' | 'reports' | 'developers';
type DocsPageAlias = {
  slugs: string[];
  name: string;
};

const navigationCopy = {
  'zh-CN': {
    sections: {
      docs: { title: '文档', description: '产品能力、原理和组件说明' },
      api: { title: 'API', description: 'OpenAPI、协议端口与兼容入口' },
      blog: { title: '博客', description: '最佳实践和接入经验' },
      reports: { title: '报告', description: '性能、配置和验证报告' },
      developers: { title: '开发者', description: 'Maintainer、Committer 与社区角色' },
    },
    folders: {
      overview: 'Lattice Hub 是什么',
      guides: '使用指南',
      practices: '最佳实践',
      principles: '原理细节',
    },
    pages: {
      intro: '简介',
      features: '功能特性',
      comparison: '产品对比',
      registryConfigComparison: '注册与配置中心对比',
      serviceMeshComparison: '服务治理与 Mesh 对比',
      access: '接入方式',
      install: '服务端安装',
      console: '控制台使用',
      consoleOverview: '控制台概览',
      consoleServices: '服务与环境',
      consoleConfiguration: '配置中心',
      consoleGovernance: '治理工作台',
      consoleGovernanceOverview: '治理工作台概览',
      consoleGovernanceRoute: '路由规则',
      consoleGovernanceRateLimit: '限流规则',
      consoleGovernanceCircuitBreaker: '熔断规则',
      consoleGovernanceFaultDetect: '主动探测',
      consoleGovernanceLossless: '无损发布',
      consoleGovernanceSecurity: '流量鉴权',
      consoleGovernanceMirror: '流量镜像',
      consoleGovernanceMock: '流量 Mock',
      consoleGovernanceLane: '泳道规则',
      consoleAuthorization: '权限管理',
      consoleMcp: 'MCP 服务',
      consoleA2a: 'A2A Agent',
      consoleAgent: 'Pole Agent 工作台',
      consoleSystem: '系统配置',
      consoleMetrics: '监控指标',
      rustSdk: 'Rust SDK 接入',
      thinSdk: 'Thin SDK',
      controller: 'K8s 和 Controller',
      sidecar: 'Pole Sidecar',
      specification: '协议与网关',
      grayRelease: '灰度发布',
      kubernetes: 'K8s 相关实践',
      agent: 'Agent 能力发现',
      sidecarPractice: 'Pole Sidecar 数据面',
      architecture: '控制面装配架构',
      cache: '增量缓存与事件流',
      governance: '治理规则与灰度发布',
      auth: '鉴权链与资源映射',
      aiRegistry: 'AI Registry 与 Pole Agent',
      observability: '观测链路',
    },
  },
  en: {
    sections: {
      docs: { title: 'Docs', description: 'Product capabilities, principles, and components' },
      api: { title: 'API', description: 'OpenAPI, protocol ports, and compatibility entries' },
      blog: { title: 'Blog', description: 'Practices and integration notes' },
      reports: { title: 'Reports', description: 'Performance and verification reports' },
      developers: { title: 'Developers', description: 'Maintainers, committers, and community roles' },
    },
    folders: {
      overview: 'What is Lattice Hub?',
      guides: 'Guides',
      practices: 'Best practices',
      principles: 'Principles',
    },
    pages: {
      intro: 'Introduction',
      features: 'Features',
      comparison: 'Product comparison',
      registryConfigComparison: 'Registry and configuration comparison',
      serviceMeshComparison: 'Service governance and Mesh comparison',
      access: 'Integration options',
      install: 'Server installation',
      console: 'Using the Console',
      consoleOverview: 'Console overview',
      consoleServices: 'Services and environments',
      consoleConfiguration: 'Configuration',
      consoleGovernance: 'Governance',
      consoleGovernanceOverview: 'Governance overview',
      consoleGovernanceRoute: 'Route rules',
      consoleGovernanceRateLimit: 'Rate limit',
      consoleGovernanceCircuitBreaker: 'Circuit breaker',
      consoleGovernanceFaultDetect: 'Fault detect',
      consoleGovernanceLossless: 'Lossless release',
      consoleGovernanceSecurity: 'Traffic security',
      consoleGovernanceMirror: 'Traffic mirror',
      consoleGovernanceMock: 'Traffic mock',
      consoleGovernanceLane: 'Lane rules',
      consoleAuthorization: 'Authorization',
      consoleMcp: 'MCP services',
      consoleA2a: 'A2A Agent',
      consoleAgent: 'Pole Agent workspace',
      consoleSystem: 'System configuration',
      consoleMetrics: 'Metrics',
      rustSdk: 'Rust SDK',
      thinSdk: 'Thin SDK',
      controller: 'Kubernetes Controller',
      sidecar: 'Pole Sidecar',
      specification: 'Protocols and gateways',
      grayRelease: 'Progressive delivery',
      kubernetes: 'Kubernetes integration',
      agent: 'Agent discovery',
      sidecarPractice: 'Pole Sidecar data plane',
      architecture: 'Control-plane assembly',
      cache: 'Incremental cache and events',
      governance: 'Governance releases',
      auth: 'Authorization and resources',
      aiRegistry: 'AI Registry and Pole Agent',
      observability: 'Observability pipeline',
    },
  },
} as const;

function getLocalizedDocsUrl(locale: DocsLocale, slugs: string[] = []): string {
  const baseUrl = locale === 'en' ? '/en/docs' : '/docs';
  return slugs.length > 0 ? `${baseUrl}/${slugs.join('/')}` : baseUrl;
}

function getSectionConfig(locale: DocsLocale) {
  const copy = navigationCopy[locale].sections;

  return {
    docs: { ...copy.docs, url: getLocalizedDocsUrl(locale) },
    api: { ...copy.api, url: getLocalizedDocsUrl(locale, ['api']) },
    blog: { ...copy.blog, url: getLocalizedDocsUrl(locale, ['blog']) },
    reports: { ...copy.reports, url: getLocalizedDocsUrl(locale, ['reports']) },
    developers: { ...copy.developers, url: getLocalizedDocsUrl(locale, ['developers']) },
  } satisfies Record<DocsSection, { title: string; url: string; description: string }>;
}

export function getDocsLayoutTabs(locale: DocsLocale): LayoutTab[] {
  const sectionConfig = getSectionConfig(locale);

  return [
    { ...sectionConfig.docs, icon: <BookOpen /> },
    { ...sectionConfig.api, icon: <Code2 /> },
    { ...sectionConfig.blog, icon: <Newspaper /> },
    { ...sectionConfig.reports, icon: <BarChart3 /> },
    { ...sectionConfig.developers, icon: <Users /> },
  ];
}

export const docsLayoutTabs = getDocsLayoutTabs('zh-CN');

function getDocsSection(slug: string[] = []): DocsSection {
  if (slug[0] === 'api') {
    return 'api';
  }

  if (slug[0] === 'blog') {
    return 'blog';
  }

  if (slug[0] === 'reports') {
    return 'reports';
  }

  if (slug[0] === 'developers') {
    return 'developers';
  }

  return 'docs';
}

function hasUrlPrefix(node: PageTree.Node, prefix: string): boolean {
  if (node.type === 'page') {
    return node.url === prefix || node.url.startsWith(`${prefix}/`);
  }

  if (node.type === 'folder') {
    return (
      (node.index ? hasUrlPrefix(node.index, prefix) : false) ||
      node.children.some((child) => hasUrlPrefix(child, prefix))
    );
  }

  return false;
}

function findSectionFolder(
  tree: PageTree.Root,
  section: Exclude<DocsSection, 'docs'>,
  locale: DocsLocale,
): PageTree.Folder | undefined {
  const prefix = getSectionConfig(locale)[section].url;

  return tree.children.find((node): node is PageTree.Folder => node.type === 'folder' && hasUrlPrefix(node, prefix));
}

function findPageByUrl(node: PageTree.Root | PageTree.Node, url: string): PageTree.Item | undefined {
  if ('type' in node && node.type === 'page') {
    return node.url === url ? node : undefined;
  }

  const children = 'children' in node ? node.children : [];

  if ('type' in node && node.type === 'folder' && node.index?.url === url) {
    return node.index;
  }

  for (const child of children) {
    const page = findPageByUrl(child, url);
    if (page) return page;
  }

  return undefined;
}

function pageAlias(tree: PageTree.Root, alias: DocsPageAlias, locale: DocsLocale): PageTree.Item {
  const url = getLocalizedDocsUrl(locale, alias.slugs);
  const page = findPageByUrl(tree, url);

  if (!page) {
    throw new Error(`Missing docs page for sidebar alias: ${url}`);
  }

  return {
    ...page,
    name: alias.name,
  };
}

function folder(
  name: string,
  children: PageTree.Node[],
  index?: PageTree.Item,
): PageTree.Folder {
  return {
    type: 'folder',
    name,
    defaultOpen: true,
    collapsible: true,
    index,
    children,
  };
}

function treeFromFolder(folder: PageTree.Folder): PageTree.Root {
  return {
    $id: folder.$id,
    $ref: folder.$ref,
    type: 'root',
    name: folder.name,
    description: folder.description,
    children: folder.index ? [folder.index, ...folder.children] : folder.children,
  };
}

function getProductDocsTree(tree: PageTree.Root, locale: DocsLocale): PageTree.Root {
  const copy = navigationCopy[locale];
  const alias = (name: string, slugs: string[]) => pageAlias(tree, { name, slugs }, locale);

  return {
    ...tree,
    children: [
      folder(copy.folders.overview, [
        alias(copy.pages.intro, []),
        alias(copy.pages.features, ['what-is', 'features']),
        folder(
          copy.pages.comparison,
          [
            alias(copy.pages.registryConfigComparison, [
              'what-is',
              'comparison',
              'registry-config',
            ]),
            alias(copy.pages.serviceMeshComparison, [
              'what-is',
              'comparison',
              'service-mesh',
            ]),
          ],
          alias(copy.pages.comparison, ['what-is', 'comparison']),
        ),
        alias(copy.pages.access, ['what-is', 'access']),
      ]),
      folder(copy.folders.guides, [
        alias(copy.pages.install, ['guides', 'server-install']),
        folder(copy.pages.console, [
          alias(copy.pages.consoleOverview, ['guides', 'console']),
          alias(copy.pages.consoleServices, ['guides', 'console', 'services']),
          alias(copy.pages.consoleConfiguration, ['guides', 'console', 'configuration']),
          folder(copy.pages.consoleGovernance, [
            alias(copy.pages.consoleGovernanceOverview, ['guides', 'console', 'governance']),
            alias(copy.pages.consoleGovernanceRoute, ['guides', 'console', 'governance', 'route']),
            alias(copy.pages.consoleGovernanceRateLimit, [
              'guides',
              'console',
              'governance',
              'rate-limit',
            ]),
            alias(copy.pages.consoleGovernanceCircuitBreaker, [
              'guides',
              'console',
              'governance',
              'circuit-breaker',
            ]),
            alias(copy.pages.consoleGovernanceFaultDetect, [
              'guides',
              'console',
              'governance',
              'fault-detect',
            ]),
            alias(copy.pages.consoleGovernanceLossless, [
              'guides',
              'console',
              'governance',
              'lossless',
            ]),
            alias(copy.pages.consoleGovernanceSecurity, [
              'guides',
              'console',
              'governance',
              'security',
            ]),
            alias(copy.pages.consoleGovernanceMirror, ['guides', 'console', 'governance', 'mirror']),
            alias(copy.pages.consoleGovernanceMock, ['guides', 'console', 'governance', 'mock']),
            alias(copy.pages.consoleGovernanceLane, ['guides', 'console', 'governance', 'lane']),
          ]),
          alias(copy.pages.consoleAuthorization, ['guides', 'console', 'authorization']),
          alias(copy.pages.consoleMcp, ['guides', 'console', 'mcp']),
          alias(copy.pages.consoleA2a, ['guides', 'console', 'a2a']),
          alias(copy.pages.consoleAgent, ['guides', 'console', 'agent']),
          alias(copy.pages.consoleSystem, ['guides', 'console', 'system']),
          alias(copy.pages.consoleMetrics, ['guides', 'console', 'metrics']),
        ]),
        alias(copy.pages.rustSdk, ['components', 'rust-sdk']),
        alias(copy.pages.thinSdk, ['components', 'thin-sdk']),
        alias(copy.pages.controller, ['components', 'kubernetes-controller']),
        alias(copy.pages.sidecar, ['components', 'pingora-sidecar']),
        alias(copy.pages.specification, ['components', 'specification']),
      ]),
      folder(copy.folders.practices, [
        alias(copy.pages.grayRelease, ['practices', 'gray-release']),
        alias(copy.pages.kubernetes, ['practices', 'kubernetes-sync']),
        alias(copy.pages.agent, ['practices', 'agent-discovery']),
        alias(copy.pages.sidecarPractice, ['practices', 'sidecar-data-plane']),
      ]),
      folder(copy.folders.principles, [
        alias(copy.pages.architecture, ['principles', 'architecture']),
        alias(copy.pages.cache, ['principles', 'cache-eventhub']),
        alias(copy.pages.governance, ['principles', 'governance-release']),
        alias(copy.pages.auth, ['principles', 'auth-protocols']),
        alias(copy.pages.aiRegistry, ['principles', 'ai-registry']),
        alias(copy.pages.observability, ['principles', 'observability-chain']),
      ]),
    ],
  };
}

export function getDocsSectionTree(
  tree: PageTree.Root,
  slug: string[] = [],
  locale: DocsLocale = 'zh-CN',
): PageTree.Root {
  const section = getDocsSection(slug);

  if (
    section === 'api' ||
    section === 'blog' ||
    section === 'reports' ||
    section === 'developers'
  ) {
    const folder = findSectionFolder(tree, section, locale);
    return folder ? treeFromFolder(folder) : tree;
  }

  return getProductDocsTree(tree, locale);
}
