import { docs } from 'collections/server';
import type { I18nConfig } from 'fumadocs-core/i18n';
import { loader } from 'fumadocs-core/source';
import {
  getDocsAlternateHrefs,
  getDocsLocaleFromPathname,
  getDocsUrl,
  getSiteLanguageSwitch,
  siteLocales,
  type SiteLocale,
} from '@/lib/site-locale';

export const docsLocales = siteLocales;
export type DocsLocale = SiteLocale;

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

export {
  getDocsAlternateHrefs,
  getDocsLocaleFromPathname,
  getDocsUrl,
  getSiteLanguageSwitch,
};
