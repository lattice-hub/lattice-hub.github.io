import { BarChart3, BookOpen, Newspaper } from 'lucide-react';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';
import type * as PageTree from 'fumadocs-core/page-tree';

type DocsSection = 'docs' | 'blog' | 'reports';

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

export function getDocsSectionTree(tree: PageTree.Root, slug: string[] = []): PageTree.Root {
  const section = getDocsSection(slug);

  if (section === 'blog' || section === 'reports') {
    const folder = findSectionFolder(tree, section);
    return folder ? treeFromFolder(folder) : tree;
  }

  return {
    ...tree,
    children: tree.children.filter((node) => !hasUrlPrefix(node, sectionConfig.blog.url) && !hasUrlPrefix(node, sectionConfig.reports.url)),
  };
}
