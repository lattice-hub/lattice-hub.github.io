import { docs } from 'collections/server';
import type { I18nConfig } from 'fumadocs-core/i18n';
import { loader } from 'fumadocs-core/source';

export const docsLocales = ['zh-CN', 'en'] as const;
export type DocsLocale = (typeof docsLocales)[number];

export const docsI18n: I18nConfig<DocsLocale> = {
  languages: [...docsLocales],
  defaultLanguage: 'zh-CN',
  parser: 'dir',
  hideLocale: 'default-locale',
  fallbackLanguage: null,
};

export const source = loader({
  baseUrl: '/docs',
  i18n: docsI18n,
  source: docs.toFumadocsSource(),
});

export function getDocsUrl(locale: DocsLocale, slugs: string[] = []): string {
  const baseUrl = locale === 'en' ? '/en/docs' : '/docs';
  return slugs.length > 0 ? `${baseUrl}/${slugs.join('/')}` : baseUrl;
}

export function getDocsLocaleFromPathname(pathname: string): DocsLocale | null {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (path === '/en/docs' || path.startsWith('/en/docs/')) {
    return 'en';
  }

  if (path === '/docs' || path.startsWith('/docs/')) {
    return 'zh-CN';
  }

  return null;
}

export function getDocsAlternateHrefs(pathname: string): {
  locale: DocsLocale;
  zhHref: string;
  enHref: string;
} | null {
  const locale = getDocsLocaleFromPathname(pathname);
  if (!locale) return null;

  const path = pathname.replace(/\/+$/, '') || '/';
  const slugPath =
    locale === 'en' ? path.replace(/^\/en\/docs\/?/, '') : path.replace(/^\/docs\/?/, '');
  const slugs = slugPath.length > 0 ? slugPath.split('/').filter(Boolean) : [];

  return {
    locale,
    zhHref: getDocsUrl('zh-CN', slugs),
    enHref: getDocsUrl('en', slugs),
  };
}

/** Language control for every SiteHeader surface (marketing + docs). */
export function getSiteLanguageSwitch(pathname: string): {
  locale: DocsLocale;
  zhHref: string;
  enHref: string;
} {
  const docs = getDocsAlternateHrefs(pathname);
  if (docs) return docs;

  const path = pathname.replace(/\/+$/, '') || '/';
  return {
    locale: 'zh-CN',
    zhHref: path,
    enHref: getDocsUrl('en'),
  };
}
