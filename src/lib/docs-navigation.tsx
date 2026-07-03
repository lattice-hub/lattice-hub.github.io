import { BarChart3, BookOpen, Newspaper } from 'lucide-react';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';
import type * as PageTree from 'fumadocs-core/page-tree';

type DocsSection = 'docs' | 'blog' | 'reports';
type DocsPageAlias = {
  url: string;
  name: string;
};

const sectionConfig: Record<DocsSection, { title: string; url: string; description: string }> = {
  docs: {
    title: '文档',
    url: '/docs',
    description: '产品能力、原理和组件说明',
  },
  blog: {
    title: '博客',
    url: '/docs/blog',
    description: '最佳实践和接入经验',
  },
  reports: {
    title: '报告',
    url: '/docs/reports',
    description: '性能、配置和验证报告',
  },
};

export const docsLayoutTabs: LayoutTab[] = [
  {
    ...sectionConfig.docs,
    icon: <BookOpen />,
  },
  {
    ...sectionConfig.blog,
    icon: <Newspaper />,
  },
  {
    ...sectionConfig.reports,
    icon: <BarChart3 />,
  },
];

function getDocsSection(slug: string[] = []): DocsSection {
  if (slug[0] === 'blog') {
    return 'blog';
  }

  if (slug[0] === 'reports') {
    return 'reports';
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

function findSectionFolder(tree: PageTree.Root, section: Exclude<DocsSection, 'docs'>): PageTree.Folder | undefined {
  const prefix = sectionConfig[section].url;

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

function pageAlias(tree: PageTree.Root, alias: DocsPageAlias): PageTree.Item {
  const page = findPageByUrl(tree, alias.url);

  if (!page) {
    throw new Error(`Missing docs page for sidebar alias: ${alias.url}`);
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

function getProductDocsTree(tree: PageTree.Root): PageTree.Root {
  return {
    ...tree,
    children: [
      folder('Lattice Hub 是什么', [
        pageAlias(tree, { name: '简介', url: '/docs' }),
        pageAlias(tree, { name: '功能特性', url: '/docs/what-is/features' }),
        pageAlias(tree, { name: '接入方式', url: '/docs/what-is/access' }),
      ]),
      folder('使用指南', [
        pageAlias(tree, { name: '服务端安装', url: '/docs/guides/server-install' }),
        pageAlias(tree, { name: '控制台使用', url: '/docs/guides/console-use' }),
        pageAlias(tree, { name: 'Rust SDK 接入', url: '/docs/components/rust-sdk' }),
        pageAlias(tree, { name: 'K8s 和 Controller', url: '/docs/components/kubernetes-controller' }),
        pageAlias(tree, { name: 'Sidecar 和网格代理', url: '/docs/components/pingora-sidecar' }),
        pageAlias(tree, { name: '协议与网关', url: '/docs/components/specification' }),
      ]),
      folder('最佳实践', [
        pageAlias(tree, { name: '灰度发布', url: '/docs/practices/gray-release' }),
        pageAlias(tree, { name: 'K8s 相关实践', url: '/docs/practices/kubernetes-sync' }),
        pageAlias(tree, { name: 'Agent 能力发现', url: '/docs/practices/agent-discovery' }),
        pageAlias(tree, { name: 'Sidecar 数据面', url: '/docs/practices/sidecar-data-plane' }),
      ]),
      folder('原理细节', [
        pageAlias(tree, { name: '控制面装配架构', url: '/docs/principles/architecture' }),
        pageAlias(tree, { name: '增量缓存与事件流', url: '/docs/principles/cache-eventhub' }),
        pageAlias(tree, { name: '鉴权链与资源映射', url: '/docs/principles/auth-protocols' }),
        pageAlias(tree, { name: '观测链路', url: '/docs/principles/observability-chain' }),
      ]),
    ],
  };
}

export function getDocsSectionTree(tree: PageTree.Root, slug: string[] = []): PageTree.Root {
  const section = getDocsSection(slug);

  if (section === 'blog' || section === 'reports') {
    const folder = findSectionFolder(tree, section);
    return folder ? treeFromFolder(folder) : tree;
  }

  return getProductDocsTree(tree);
}
