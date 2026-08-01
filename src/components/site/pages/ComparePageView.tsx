import Link from 'next/link';
import {
  InteriorFooter,
  InteriorHero,
  SectionHeading,
} from '@/components/site/InteriorPage';
import interior from '@/components/site/InteriorPage.module.css';
import { SiteDocumentLanguage } from '@/components/site/SiteDocumentLanguage';
import { SiteHeader } from '@/components/site/SiteHeader';
import { getCompareCopy } from '@/lib/site-copy';
import type { SiteLocale } from '@/lib/site-locale';
import { localizeHref } from '@/lib/site-locale';
import styles from '@/app/compare/ComparePage.module.css';

type ComparePageViewProps = {
  locale: SiteLocale;
};

export function ComparePageView({ locale }: ComparePageViewProps) {
  const copy = getCompareCopy(locale);

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
          href: copy.hero.primary.href.startsWith('#')
            ? copy.hero.primary.href
            : localizeHref(copy.hero.primary.href, locale),
          label: copy.hero.primary.label,
        }}
        secondary={{
          href: localizeHref(copy.hero.secondary.href, locale),
          label: copy.hero.secondary.label,
        }}
        title={copy.hero.title}
      />

      <section className={interior.section}>
        <SectionHeading index={copy.layers.heading.index} title={copy.layers.heading.title}>
          <p>{copy.layers.heading.intro}</p>
        </SectionHeading>
        <div className={styles.layerMap} aria-label={copy.layers.ariaLabel}>
          {copy.layers.items.map((layer) => (
            <article className={styles.layer} key={layer.index}>
              <span>{layer.index}</span>
              <div>
                <p>{layer.name}</p>
                <strong>{layer.products}</strong>
              </div>
              <p>{layer.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.legendSection}>
        <div className={styles.legendInner}>
          <p>{copy.legend.title}</p>
          <div>
            {copy.legend.items.map((item) => (
              <span key={item.tone}>
                <i data-tone={item.tone} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={interior.section} id="products">
        <SectionHeading index={copy.comparisons.heading.index} title={copy.comparisons.heading.title}>
          <p>{copy.comparisons.heading.intro}</p>
        </SectionHeading>
        <div className={styles.productList}>
          {copy.comparisons.items.map((item) => (
            <article className={styles.productRow} key={item.product}>
              <div className={styles.productIdentity}>
                <span>{item.index}</span>
                <div>
                  <p>{item.category}</p>
                  <h2>{item.product}</h2>
                </div>
              </div>
              <div className={styles.productRelation}>
                <span data-tone={item.tone}>{item.relation}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
              <div className={styles.productBoundary}>
                <p>{copy.comparisons.boundaryLabel}</p>
                <span>{item.boundary}</span>
                <a href={item.source} rel="noreferrer" target="_blank">
                  {copy.comparisons.sourceLink} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.decisionSection}>
        <div className={styles.decisionInner}>
          <SectionHeading index={copy.decisions.heading.index} title={copy.decisions.heading.title}>
            <p>{copy.decisions.heading.intro}</p>
          </SectionHeading>
          <ol className={styles.decisionList}>
            {copy.decisions.items.map((decision, index) => (
              <li key={decision.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{decision.title}</strong>
                <p>{decision.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.poleSection}>
        <div className={styles.poleInner}>
          <p>{copy.pole.kicker}</p>
          <h2>{copy.pole.title}</h2>
          <div className={styles.poleFlow} aria-label={copy.pole.ariaLabel}>
            {copy.pole.flow.map((step) => (
              <div key={step.index}>
                <span>{step.index}</span>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={interior.cta}>
        <div className={interior.ctaInner}>
          <div>
            <p className={interior.kicker}>{copy.cta.kicker}</p>
            <h2>{copy.cta.title}</h2>
          </div>
          <div className={interior.ctaActions}>
            <Link
              className={`${interior.button} ${interior.buttonPrimary}`}
              href={localizeHref(copy.cta.primary.href, locale)}
            >
              {copy.cta.primary.label} <span aria-hidden="true">→</span>
            </Link>
            <Link
              className={`${interior.button} ${interior.buttonSecondary}`}
              href={localizeHref(copy.cta.secondary.href, locale)}
            >
              {copy.cta.secondary.label} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <InteriorFooter locale={locale} />
    </main>
  );
}
