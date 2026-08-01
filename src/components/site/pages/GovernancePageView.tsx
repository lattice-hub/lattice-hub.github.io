import Image from 'next/image';
import Link from 'next/link';
import {
  InteriorFooter,
  InteriorHero,
  SectionHeading,
} from '@/components/site/InteriorPage';
import styles from '@/components/site/InteriorPage.module.css';
import { SiteDocumentLanguage } from '@/components/site/SiteDocumentLanguage';
import { SiteHeader } from '@/components/site/SiteHeader';
import { getGovernanceCopy } from '@/lib/site-copy';
import { getGovernanceDomainGroupLabel, getGovernanceDomains } from '@/lib/site-content';
import type { SiteLocale } from '@/lib/site-locale';
import { localizeHref } from '@/lib/site-locale';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

type GovernancePageViewProps = {
  locale: SiteLocale;
};

export function GovernancePageView({ locale }: GovernancePageViewProps) {
  const copy = getGovernanceCopy(locale);
  const governanceDomains = getGovernanceDomains(locale);

  return (
    <main className="site-shell">
      <SiteDocumentLanguage locale={locale} />
      <SiteHeader />
      <InteriorHero
        accent={copy.hero.accent}
        eyebrow={copy.hero.eyebrow}
        items={copy.hero.items}
        lede={copy.hero.lede}
        locale={locale}
        primary={{
          href: localizeHref(copy.hero.primary.href, locale),
          label: copy.hero.primary.label,
        }}
        secondary={{
          href: copy.hero.secondary.href.startsWith('http')
            ? copy.hero.secondary.href
            : localizeHref(copy.hero.secondary.href, locale),
          label: copy.hero.secondary.label,
        }}
        title={copy.hero.title}
      />

      <section className={styles.section}>
        <div className={styles.split}>
          <div className={styles.splitCopy}>
            <p className={styles.sectionIndex}>{copy.scope.index}</p>
            <h2>{copy.scope.title}</h2>
            <p>{copy.scope.intro}</p>
            <div className={styles.rows}>
              {copy.scope.rows.map((row) => (
                <article className={styles.compactRow} key={row.index}>
                  <span>{row.index}</span>
                  <div>
                    <h3>{row.title}</h3>
                    <p>{row.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.productFrame}>
              <Image
                alt={copy.scope.imageAlt}
                height={520}
                priority
                sizes="(max-width: 1000px) 100vw, 58vw"
                src={`${basePath}/product/console-governance-scope.webp`}
                width={1340}
              />
            </div>
            <div className={styles.imageCaption}>
              <span>{copy.scope.captionLabel}</span>
              <span>{copy.scope.captionNote}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index={copy.domains.heading.index} title={copy.domains.heading.title}>
          <p>{copy.domains.heading.intro}</p>
        </SectionHeading>
        <div className={styles.cardGrid}>
          {governanceDomains.map((domain, index) => (
            <article className={styles.card} key={domain.id}>
              <span>
                {String(index + 1).padStart(2, '0')} / {getGovernanceDomainGroupLabel(domain.group, locale)}
              </span>
              <h3>{domain.name}</h3>
              <p>{domain.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index={copy.views.heading.index} title={copy.views.heading.title}>
          <p>{copy.views.heading.intro}</p>
        </SectionHeading>
        <div className={styles.twoColumnCards}>
          {copy.views.rows.map((row) => (
            <article className={styles.viewCard} key={row.index}>
              <span>{row.index}</span>
              <h3>{row.title}</h3>
              <p>{row.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.darkInner}>
          <SectionHeading index={copy.releaseLifecycle.heading.index} title={copy.releaseLifecycle.heading.title}>
            <p>{copy.releaseLifecycle.heading.intro}</p>
          </SectionHeading>
          <div className={styles.darkRows}>
            {copy.releaseLifecycle.steps.map((step) => (
              <article key={step.index}>
                <span>{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index={copy.runtime.heading.index} title={copy.runtime.heading.title}>
          <p>{copy.runtime.heading.intro}</p>
        </SectionHeading>
        <div className={styles.rows}>
          {copy.runtime.rows.map((row) => (
            <article className={styles.row} key={row.index}>
              <span>{row.index}</span>
              <h3>{row.title}</h3>
              <p>{row.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div>
            <p className={styles.kicker}>{copy.cta.kicker}</p>
            <h2>{copy.cta.title}</h2>
          </div>
          <div className={styles.ctaActions}>
            <Link
              className={`${styles.button} ${styles.buttonPrimary}`}
              href={localizeHref(copy.cta.primary.href, locale)}
            >
              {copy.cta.primary.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link className={`${styles.button} ${styles.buttonSecondary}`} href={copy.cta.secondary.href}>
              {copy.cta.secondary.label}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <InteriorFooter locale={locale} />
    </main>
  );
}
