import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { getDocsLayoutTabs, getDocsSectionTree } from '@/lib/docs-navigation';
import { source, type DocsLocale } from '@/lib/source';
import { DocsDocumentLanguage } from './DocsDocumentLanguage';

export function DocsLayoutContent({
  children,
  locale,
  slug,
}: {
  children: ReactNode;
  locale: DocsLocale;
  slug?: string[];
}) {
  return (
    <>
      <DocsDocumentLanguage locale={locale} />
      <DocsLayout
        containerProps={{ lang: locale }}
        tree={getDocsSectionTree(source.getPageTree(locale), slug, locale)}
        tabs={getDocsLayoutTabs(locale)}
        tabMode="auto"
        nav={{
          title: locale === 'en' ? 'Lattice Hub Docs' : 'Lattice Hub 文档',
          url: '/',
        }}
      >
        {children}
      </DocsLayout>
    </>
  );
}
