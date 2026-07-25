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
