import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docsLayoutTabs, getDocsSectionTree } from '@/lib/docs-navigation';
import { source } from '@/lib/source';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;

  return (
    <DocsLayout
      tree={getDocsSectionTree(source.pageTree, slug)}
      tabs={docsLayoutTabs}
      tabMode="auto"
      nav={{
        title: 'Lattice Hub',
      }}
    >
      {children}
    </DocsLayout>
  );
}
