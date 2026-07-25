import { BarChart3, BookOpen, Newspaper, Users } from 'lucide-react';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';
import type * as PageTree from 'fumadocs-core/page-tree';
import type { DocsLocale } from '@/lib/source';

type DocsSection = 'docs' | 'blog' | 'reports' | 'developers';
type DocsPageAlias = {
  slugs: string[];
  name: string;
};

const navigationCopy = {
  'zh-CN': {
    sections: {
      docs: { title: '文档', description: '产品能力、原理和组件说明' },
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
      access: '接入方式',
      install: '服务端安装',
      console: '控制台使用',
      rustSdk: 'Rust SDK 接入',
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
      access: 'Integration options',
      install: 'Server installation',
      console: 'Using the Console',
      rustSdk: 'Rust SDK',
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
    blog: { ...copy.blog, url: getLocalizedDocsUrl(locale, ['blog']) },
    reports: { ...copy.reports, url: getLocalizedDocsUrl(locale, ['reports']) },
    developers: { ...copy.developers, url: getLocalizedDocsUrl(locale, ['developers']) },
  } satisfies Record<DocsSection, { title: string; url: string; description: string }>;
}

export function getDocsLayoutTabs(locale: DocsLocale): LayoutTab[] {
  const sectionConfig = getSectionConfig(locale);

  return [
    { ...sectionConfig.docs, icon: <BookOpen /> },
    { ...sectionConfig.blog, icon: <Newspaper /> },
    { ...sectionConfig.reports, icon: <BarChart3 /> },
    { ...sectionConfig.developers, icon: <Users /> },
  ];
}

export const docsLayoutTabs = getDocsLayoutTabs('zh-CN');

function getDocsSection(slug: string[] = []): DocsSection {
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

function folder(name: string, children: PageTree.Node[]): PageTree.Folder {
  return {
    type: 'folder',
    name,
    defaultOpen: true,
    collapsible: true,
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
        alias(copy.pages.access, ['what-is', 'access']),
      ]),
      folder(copy.folders.guides, [
        alias(copy.pages.install, ['guides', 'server-install']),
        alias(copy.pages.console, ['guides', 'console-use']),
        alias(copy.pages.rustSdk, ['components', 'rust-sdk']),
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

  if (section === 'blog' || section === 'reports' || section === 'developers') {
    const folder = findSectionFolder(tree, section, locale);
    return folder ? treeFromFolder(folder) : tree;
  }

  return getProductDocsTree(tree, locale);
}
