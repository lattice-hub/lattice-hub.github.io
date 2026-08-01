export type SiteLocale = 'zh-CN' | 'en';

export type PageMetadata = {
  title: string | { absolute: string };
  description: string;
};

export type HeroAction = {
  href: string;
  label: string;
};

export type InteriorHeroCopy = {
  eyebrow: string;
  title: string;
  accent: string;
  lede: string;
  primary: HeroAction;
  secondary?: HeroAction;
  items: Array<{ index: string; title: string; detail: string }>;
};

export type SectionHeadingCopy = {
  index: string;
  title: string;
  intro?: string;
};

export type CtaCopy = {
  kicker: string;
  title: string;
  primary: HeroAction;
  secondary?: HeroAction;
};
