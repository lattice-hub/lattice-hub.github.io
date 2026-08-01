import Link from 'next/link';
import type { SiteLocale } from '@/lib/site-locale';
import styles from './DocsLanguageSwitch.module.css';

export function DocsLanguageSwitch({
  locale,
  zhHref,
  enHref,
}: {
  locale: SiteLocale;
  zhHref: string;
  enHref: string;
}) {
  return (
    <nav aria-label={locale === 'en' ? 'Site language' : '站点语言'} className={styles.switch}>
      <Link aria-current={locale === 'zh-CN' ? 'page' : undefined} href={zhHref}>
        中
      </Link>
      <Link aria-current={locale === 'en' ? 'page' : undefined} href={enHref}>
        EN
      </Link>
    </nav>
  );
}
