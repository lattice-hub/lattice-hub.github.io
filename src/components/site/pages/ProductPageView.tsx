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
import { getProductCopy } from '@/lib/site-copy';
import { getProductTopics } from '@/lib/site-content';
import type { SiteLocale } from '@/lib/site-locale';
import { localizeHref } from '@/lib/site-locale';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

type ProductPageViewProps = {
  locale: SiteLocale;
};

export function ProductPageView({ locale }: ProductPageViewProps) {
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

      <section className={styles.section}>
        <SectionHeading index={copy.evidence.heading.index} title={copy.evidence.heading.title}>
          <p>{copy.evidence.heading.intro}</p>
        </SectionHeading>
        <div className={styles.productFrame}>
          <Image
            alt={copy.evidence.imageAlt}
            height={1000}
            priority
            sizes="(max-width: 720px) 100vw, 1180px"
            src={`${basePath}/product/console-platform-metrics.webp`}
            width={1600}
          />
        </div>
        <div className={styles.imageCaption}>
          <span>{copy.evidence.captionLabel}</span>
          <span>{copy.evidence.captionNote}</span>
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

      <section className={styles.section}>
        <div className={styles.split}>
          <div className={styles.splitCopy}>
            <p className={styles.sectionIndex}>{copy.governance.index}</p>
            <h2>{copy.governance.title}</h2>
            <p>{copy.governance.intro}</p>
            <p className={styles.note}>{copy.governance.note}</p>
            <div className={styles.actions}>
              <Link
                className={`${styles.button} ${styles.buttonPrimary}`}
                href={localizeHref(copy.governance.action.href, locale)}
              >
                {copy.governance.action.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.productFrame}>
              <Image
                alt={copy.governance.imageAlt}
                height={520}
                sizes="(max-width: 1000px) 100vw, 58vw"
                src={`${basePath}/product/console-governance-scope.webp`}
                width={1340}
              />
            </div>
            <div className={styles.imageCaption}>
              <span>{copy.governance.captionLabel}</span>
              <span>{copy.governance.captionNote}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index={copy.accessRuntime.heading.index} title={copy.accessRuntime.heading.title}>
          <p>{copy.accessRuntime.heading.intro}</p>
        </SectionHeading>
        <div className={styles.dualGrid}>
          <div>
            <p className={styles.columnLabel}>{copy.accessRuntime.protocolLabel}</p>
            <div className={styles.matrix}>
              {copy.accessRuntime.protocols.map((protocol) => (
                <div className={styles.matrixRow} key={protocol.name}>
                  <span>{protocol.index}</span>
                  <strong>{protocol.name}</strong>
                  <small>{protocol.detail}</small>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className={styles.columnLabel}>{copy.accessRuntime.runtimeLabel}</p>
            <div className={styles.matrix}>
              {copy.accessRuntime.runtimes.map((runtime) => (
                <div className={styles.matrixRow} key={runtime.name}>
                  <span>{runtime.index}</span>
                  <strong>{runtime.name}</strong>
                  <small>{runtime.detail}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index={copy.boundaries.heading.index} title={copy.boundaries.heading.title}>
          <p>{copy.boundaries.heading.intro}</p>
        </SectionHeading>
        <div className={styles.rows}>
          {copy.boundaries.items.map((item) => (
            <article className={styles.row} key={item.index}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
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
