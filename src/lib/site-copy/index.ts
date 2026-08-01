export type SiteLocale = 'zh-CN' | 'en';

export type SiteMarketingPage =
  | 'home'
  | 'product'
  | 'components'
  | 'governance'
  | 'architecture'
  | 'agent'
  | 'compare';

export type SitePageMetadata = {
  title: string | { absolute: string };
  description: string;
};

export { getHomeCopy, type HomeCopy } from './home';
export { getProductCopy, type ProductCopy } from './product';
export { getComponentsCopy, type ComponentsCopy } from './components';
export { getGovernanceCopy, type GovernanceCopy } from './governance';
export { getArchitectureCopy, type ArchitectureCopy } from './architecture';
export { getAgentCopy, type AgentCopy } from './agent';
export { getCompareCopy, type CompareCopy } from './compare';

export type SitePageCopy =
  | ReturnType<typeof import('./home').getHomeCopy>
  | ReturnType<typeof import('./product').getProductCopy>
  | ReturnType<typeof import('./components').getComponentsCopy>
  | ReturnType<typeof import('./governance').getGovernanceCopy>
  | ReturnType<typeof import('./architecture').getArchitectureCopy>
  | ReturnType<typeof import('./agent').getAgentCopy>
  | ReturnType<typeof import('./compare').getCompareCopy>;

import { getAgentCopy } from './agent';
import { getArchitectureCopy } from './architecture';
import { getCompareCopy } from './compare';
import { getComponentsCopy } from './components';
import { getGovernanceCopy } from './governance';
import { getHomeCopy } from './home';
import { getProductCopy } from './product';

const pageCopyGetters = {
  home: getHomeCopy,
  product: getProductCopy,
  components: getComponentsCopy,
  governance: getGovernanceCopy,
  architecture: getArchitectureCopy,
  agent: getAgentCopy,
  compare: getCompareCopy,
} as const;

/** Return structured marketing copy for a site page and locale. */
export function getSitePageCopy(page: SiteMarketingPage, locale: SiteLocale): SitePageCopy {
  return pageCopyGetters[page](locale);
}

/** Return Next.js metadata fields for a marketing page. */
export function getSitePageMetadata(page: SiteMarketingPage, locale: SiteLocale): SitePageMetadata {
  const copy = getSitePageCopy(page, locale);
  return copy.metadata;
}

/** Resolve a metadata title string for `<title>` rendering. */
export function resolveSitePageTitle(
  title: SitePageMetadata['title'],
  fallback?: string,
): string {
  if (typeof title === 'string') return title;
  return title.absolute ?? fallback ?? 'Lattice.Hub';
}

/** All supported marketing pages in navigation order. */
export const siteMarketingPages: SiteMarketingPage[] = [
  'home',
  'product',
  'components',
  'governance',
  'architecture',
  'agent',
  'compare',
];
