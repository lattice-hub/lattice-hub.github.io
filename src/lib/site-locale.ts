export const siteLocales = ['zh-CN', 'en'] as const;
export type SiteLocale = (typeof siteLocales)[number];

/** Marketing surfaces that mirror under `/en/...`. Docs keep `/docs` and `/en/docs`. */
export const siteMarketingPaths = [
  '/',
  '/product',
  '/components',
  '/governance',
  '/architecture',
  '/agent',
  '/compare',
] as const;

export type SiteMarketingPath = (typeof siteMarketingPaths)[number];

export function normalizePathname(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

/** Strip the English marketing/docs prefix so nav matching stays locale-agnostic. */
export function stripLocalePrefix(pathname: string): string {
  const path = normalizePathname(pathname);

  if (path === '/en') return '/';
  if (path.startsWith('/en/')) return path.slice(3) || '/';
  return path;
}

export function getDocsUrl(locale: SiteLocale, slugs: string[] = []): string {
  const baseUrl = locale === 'en' ? '/en/docs' : '/docs';
  return slugs.length > 0 ? `${baseUrl}/${slugs.join('/')}` : baseUrl;
}

export function getDocsLocaleFromPathname(pathname: string): SiteLocale | null {
  const path = normalizePathname(pathname);

  if (path === '/en/docs' || path.startsWith('/en/docs/')) {
    return 'en';
  }

  if (path === '/docs' || path.startsWith('/docs/')) {
    return 'zh-CN';
  }

  return null;
}

export function getDocsAlternateHrefs(pathname: string): {
  locale: SiteLocale;
  zhHref: string;
  enHref: string;
} | null {
  const locale = getDocsLocaleFromPathname(pathname);
  if (!locale) return null;

  const path = normalizePathname(pathname);
  const slugPath =
    locale === 'en' ? path.replace(/^\/en\/docs\/?/, '') : path.replace(/^\/docs\/?/, '');
  const slugs = slugPath.length > 0 ? slugPath.split('/').filter(Boolean) : [];

  return {
    locale,
    zhHref: getDocsUrl('zh-CN', slugs),
    enHref: getDocsUrl('en', slugs),
  };
}

export function getSiteLocaleFromPathname(pathname: string): SiteLocale {
  const docsLocale = getDocsLocaleFromPathname(pathname);
  if (docsLocale) return docsLocale;

  const path = normalizePathname(pathname);
  if (path === '/en' || path.startsWith('/en/')) return 'en';
  return 'zh-CN';
}

export function isMarketingPath(pathname: string): boolean {
  const bare = stripLocalePrefix(pathname);
  return (siteMarketingPaths as readonly string[]).includes(bare);
}

/** Prefix an internal site path for the active locale. External URLs pass through. */
export function localizeHref(href: string, locale: SiteLocale): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;

  const [pathnamePart, hash = ''] = href.split('#');
  const [pathOnly, query = ''] = pathnamePart.split('?');
  const bare = stripLocalePrefix(pathOnly);
  const suffix = `${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;

  if (bare === '/docs' || bare.startsWith('/docs/')) {
    if (locale === 'en') {
      return `/en${bare}${suffix}`;
    }
    return `${bare}${suffix}`;
  }

  if (locale === 'en') {
    return bare === '/' ? `/en${suffix}` : `/en${bare}${suffix}`;
  }

  return `${bare}${suffix}`;
}

export function getMarketingAlternateHrefs(pathname: string): {
  locale: SiteLocale;
  zhHref: string;
  enHref: string;
} | null {
  if (!isMarketingPath(pathname)) return null;

  const bare = stripLocalePrefix(pathname) as SiteMarketingPath;
  const locale = getSiteLocaleFromPathname(pathname);

  return {
    locale,
    zhHref: bare,
    enHref: localizeHref(bare, 'en'),
  };
}

/** Language control for every SiteHeader surface (marketing + docs). */
export function getSiteLanguageSwitch(pathname: string): {
  locale: SiteLocale;
  zhHref: string;
  enHref: string;
} {
  const docs = getDocsAlternateHrefs(pathname);
  if (docs) return docs;

  const marketing = getMarketingAlternateHrefs(pathname);
  if (marketing) return marketing;

  const path = normalizePathname(pathname);
  const locale = getSiteLocaleFromPathname(path);
  return {
    locale,
    zhHref: localizeHref(stripLocalePrefix(path), 'zh-CN'),
    enHref: localizeHref(stripLocalePrefix(path), 'en'),
  };
}
