import Link from 'next/link';
import { getHomeCopy } from '@/lib/site-copy';
import type { SiteLocale } from '@/lib/site-locale';
import { localizeHref } from '@/lib/site-locale';
import { ArchitectureFlow } from './ArchitectureFlow';
import styles from './HomePage.module.css';

type HomeHeroProps = {
  locale: SiteLocale;
};

export function HomeHero({ locale }: HomeHeroProps) {
  const { hero } = getHomeCopy(locale);

  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <h1 id="home-title">
          {hero.title}
          <span>{hero.titleAccent}</span>
        </h1>
        <p className={styles.heroLede}>{hero.lede}</p>
        <div className={styles.heroActions}>
          <Link
            className={`${styles.button} ${styles.buttonPrimary}`}
            href={localizeHref(hero.primary.href, locale)}
          >
            {hero.primary.label}
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            className={`${styles.button} ${styles.buttonSecondary}`}
            href={localizeHref(hero.secondary.href, locale)}
          >
            {hero.secondary.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className={styles.heroVisual}>
        <ArchitectureFlow locale={locale} />
      </div>
    </section>
  );
}
