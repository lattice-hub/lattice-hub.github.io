import type { CSSProperties, ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { SiteHeader } from '@/components/site/SiteHeader';
import { getDocsLayoutTabs, getDocsSectionTree } from '@/lib/docs-navigation';
import { source, type DocsLocale } from '@/lib/source';
import { DocsDocumentLanguage } from './DocsDocumentLanguage';

const docsBannerHeight = '64px';

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
      <div className="site-shell site-shell--chrome">
        <SiteHeader />
      </div>
      <DocsLayout
        containerProps={{
          lang: locale,
          style: {
            '--fd-banner-height': docsBannerHeight,
          } as CSSProperties,
        }}
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
