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
import { getAgentCopy } from '@/lib/site-copy';
import type { SiteLocale } from '@/lib/site-locale';
import { localizeHref } from '@/lib/site-locale';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

type AgentPageViewProps = {
  locale: SiteLocale;
};

export function AgentPageView({ locale }: AgentPageViewProps) {
  const copy = getAgentCopy(locale);

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
        <SectionHeading index={copy.workbench.heading.index} title={copy.workbench.heading.title}>
          <p>{copy.workbench.heading.intro}</p>
        </SectionHeading>
        <div className={styles.productFrame}>
          <Image
            alt={copy.workbench.imageAlt}
            height={1000}
            sizes="(max-width: 720px) 100vw, 1180px"
            src={`${basePath}/product/console-agent-readiness.webp`}
            width={1600}
          />
        </div>
        <div className={styles.imageCaption}>
          <span>{copy.workbench.captionLabel}</span>
          <span>{copy.workbench.captionNote}</span>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index={copy.changeFlow.heading.index} title={copy.changeFlow.heading.title}>
          <p>{copy.changeFlow.heading.intro}</p>
        </SectionHeading>
        <div className={styles.rows}>
          {copy.changeFlow.steps.map((step) => (
            <article className={styles.row} key={step.index}>
              <span>{step.index}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.darkInner}>
          <SectionHeading index={copy.safetyLayers.heading.index} title={copy.safetyLayers.heading.title}>
            <p>{copy.safetyLayers.heading.intro}</p>
          </SectionHeading>
          <div className={styles.darkRows}>
            {copy.safetyLayers.layers.map((layer) => (
              <article key={layer.index}>
                <span>{layer.index}</span>
                <h3>{layer.title}</h3>
                <p>{layer.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index={copy.roles.heading.index} title={copy.roles.heading.title}>
          <p>{copy.roles.heading.intro}</p>
        </SectionHeading>
        <div className={styles.cardGrid}>
          {copy.roles.items.map((role) => (
            <article className={styles.card} key={role.index}>
              <span>{role.index}</span>
              <h3>{role.title}</h3>
              <p>{role.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index={copy.boundary.heading.index} title={copy.boundary.heading.title}>
          <p>{copy.boundary.heading.intro}</p>
        </SectionHeading>
        <div className={styles.twoColumnCards}>
          <article className={styles.viewCard}>
            <span>{copy.boundary.available.label}</span>
            <h3>{copy.boundary.available.title}</h3>
            <ul className={styles.plainList}>
              {copy.boundary.available.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className={styles.viewCard}>
            <span>{copy.boundary.notCovered.label}</span>
            <h3>{copy.boundary.notCovered.title}</h3>
            <ul className={styles.plainList}>
              {copy.boundary.notCovered.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index={copy.releaseChain.heading.index} title={copy.releaseChain.heading.title}>
          <p>{copy.releaseChain.heading.intro}</p>
        </SectionHeading>
        <div className={styles.releaseChain} aria-label={copy.releaseChain.ariaLabel}>
          {copy.releaseChain.steps.map((item, index) => (
            <div key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </div>
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
