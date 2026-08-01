import type { SiteLocale } from '@/lib/site-locale';
import { GITHUB_ORGANIZATION_URL } from '@/lib/site-content';

export type SiteUiCopy = {
  brandHome: string;
  primaryNav: string;
  mobileNav: string;
  footerNav: string;
  experience: string;
  experienceRegion: string;
  experienceClose: string;
  experienceEyebrow: string;
  experienceTitle: string;
  experienceBody: string;
  githubLabel: string;
  githubAria: string;
  openMenu: string;
  closeMenu: string;
  themeMenu: string;
  themePrefix: string;
  themeOptions: {
    light: string;
    dark: string;
    system: string;
  };
  nav: Array<{ label: string; href: string }>;
  footer: Array<{ label: string; href: string }>;
};

const siteUiCopy = {
  'zh-CN': {
    brandHome: '返回 Lattice Hub 首页',
    primaryNav: '主导航',
    mobileNav: '移动主导航',
    footerNav: '页脚导航',
    experience: '体验',
    experienceRegion: '产品体验状态',
    experienceClose: '关闭产品体验提示',
    experienceEyebrow: 'PRODUCT EXPERIENCE',
    experienceTitle: '产品体验，马上到来。',
    experienceBody: 'Lattice.Hub Console 公开体验环境正在准备中。',
    githubLabel: 'GitHub',
    githubAria: '访问 Lattice Hub GitHub 组织（在新窗口打开）',
    openMenu: '打开导航菜单',
    closeMenu: '关闭导航菜单',
    themeMenu: '选择主题',
    themePrefix: '主题',
    themeOptions: {
      light: '亮色',
      dark: '暗色',
      system: '自动',
    },
    nav: [
      { label: '产品', href: '/product' },
      { label: '组件', href: '/components' },
      { label: '文档', href: '/docs' },
    ],
    footer: [
      { label: '产品', href: '/product' },
      { label: '组件', href: '/components' },
      { label: '文档', href: '/docs' },
      { label: 'GitHub', href: GITHUB_ORGANIZATION_URL },
    ],
  },
  en: {
    brandHome: 'Lattice Hub home',
    primaryNav: 'Primary navigation',
    mobileNav: 'Mobile primary navigation',
    footerNav: 'Footer navigation',
    experience: 'Try it',
    experienceRegion: 'Product experience status',
    experienceClose: 'Close product experience notice',
    experienceEyebrow: 'PRODUCT EXPERIENCE',
    experienceTitle: 'Product experience is coming soon.',
    experienceBody: 'The public Lattice.Hub Console experience environment is being prepared.',
    githubLabel: 'GitHub',
    githubAria: 'Visit the Lattice Hub GitHub organization (opens in a new window)',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    themeMenu: 'Choose theme',
    themePrefix: 'Theme',
    themeOptions: {
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },
    nav: [
      { label: 'Product', href: '/product' },
      { label: 'Components', href: '/components' },
      { label: 'Docs', href: '/docs' },
    ],
    footer: [
      { label: 'Product', href: '/product' },
      { label: 'Components', href: '/components' },
      { label: 'Docs', href: '/docs' },
      { label: 'GitHub', href: GITHUB_ORGANIZATION_URL },
    ],
  },
} as const satisfies Record<SiteLocale, SiteUiCopy>;

export function getSiteUi(locale: SiteLocale): SiteUiCopy {
  return siteUiCopy[locale];
}
