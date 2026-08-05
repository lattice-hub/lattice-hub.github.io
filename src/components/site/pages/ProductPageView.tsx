import Link from 'next/link';
import { ArchitectureFlow } from '@/components/site/ArchitectureFlow';
import {
  InteriorFooter,
  InteriorHero,
  SectionHeading,
} from '@/components/site/InteriorPage';
import styles from '@/components/site/InteriorPage.module.css';
import { ProductEvidenceCarousel } from '@/components/site/ProductEvidenceCarousel';
import { SiteDocumentLanguage } from '@/components/site/SiteDocumentLanguage';
import { SiteHeader } from '@/components/site/SiteHeader';
import { getProductCopy } from '@/lib/site-copy';
import { getProductTopics } from '@/lib/site-content';
import type { SiteLocale } from '@/lib/site-locale';
import { localizeHref } from '@/lib/site-locale';

type ProductPageViewProps = {
  locale: SiteLocale;
  /** Landing `/` keeps the architecture diagram under the product hero. */
  showArchitecture?: boolean;
};

export function ProductPageView({ locale, showArchitecture = false }: ProductPageViewProps) {
  const copy = getProductCopy(locale);
  const productTopics = getProductTopics(locale);

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
          href: localizeHref(copy.hero.secondary.href, locale),
          label: copy.hero.secondary.label,
        }}
        title={copy.hero.title}
      />

      {showArchitecture ? (
        <section
          aria-label={locale === 'en' ? 'Architecture overview' : '架构概览'}
          className={styles.architectureBand}
        >
          <div className={styles.architectureInner}>
            <ArchitectureFlow locale={locale} />
          </div>
        </section>
      ) : null}

      <section className={styles.section}>
        <SectionHeading index={copy.evidence.heading.index} title={copy.evidence.heading.title}>
          <p>{copy.evidence.heading.intro}</p>
        </SectionHeading>
        <ProductEvidenceCarousel
          closeLabel={copy.evidence.closeLabel}
          disclaimer={copy.evidence.disclaimer}
          expandLabel={copy.evidence.expandLabel}
          nextLabel={copy.evidence.nextLabel}
          prevLabel={copy.evidence.prevLabel}
          regionLabel={copy.evidence.regionLabel}
          slides={copy.evidence.slides}
        />
        <div className={styles.sectionAction}>
          <Link
            className={`${styles.button} ${styles.buttonSecondary}`}
            href={localizeHref(copy.evidence.action.href, locale)}
          >
            {copy.evidence.action.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.darkInner}>
          <SectionHeading index={copy.howItWorks.heading.index} title={copy.howItWorks.heading.title}>
            <p>{copy.howItWorks.heading.intro}</p>
          </SectionHeading>
          <div className={styles.darkRows}>
            {copy.howItWorks.steps.map((step) => (
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
        <SectionHeading index={copy.capabilityMap.heading.index} title={copy.capabilityMap.heading.title}>
          <p>{copy.capabilityMap.heading.intro}</p>
        </SectionHeading>
        <div className={styles.cardGrid}>
          {copy.capabilityMap.capabilities.map((capability) => (
            <article className={styles.card} key={capability.index}>
              <span>{capability.index}</span>
              <h3>{capability.title}</h3>
              <p>{capability.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index={copy.productTopics.heading.index} title={copy.productTopics.heading.title}>
          <p>{copy.productTopics.heading.intro}</p>
        </SectionHeading>
        <div className={styles.cardGrid}>
          {productTopics.map((topic, index) => (
            <Link
              className={`${styles.viewCard} ${styles.topicCard}`}
              href={localizeHref(topic.href, locale)}
              key={topic.href}
            >
              <span>
                {String(index + 1).padStart(2, '0')} / {topic.labelEn}
              </span>
              <h3>{topic.label}</h3>
              <p>{topic.summary}</p>
              <strong>
                {topic.action}
                <span aria-hidden="true">→</span>
              </strong>
            </Link>
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
