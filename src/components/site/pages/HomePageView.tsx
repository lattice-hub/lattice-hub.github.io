import Image from 'next/image';
import Link from 'next/link';
import { HomeHero } from '@/components/site/HomeHero';
import styles from '@/components/site/HomePage.module.css';
import { SiteDocumentLanguage } from '@/components/site/SiteDocumentLanguage';
import { SiteHeader } from '@/components/site/SiteHeader';
import { getHomeCopy } from '@/lib/site-copy';
import { getGovernanceDomains, getSiteFooterNav } from '@/lib/site-content';
import type { SiteLocale } from '@/lib/site-locale';
import { localizeHref } from '@/lib/site-locale';
import { getSiteUi } from '@/lib/site-ui';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

type HomePageViewProps = {
  locale: SiteLocale;
};

export function HomePageView({ locale }: HomePageViewProps) {
  const copy = getHomeCopy(locale);
  const ui = getSiteUi(locale);
  const footerNav = getSiteFooterNav(locale);
  const governanceDomains = getGovernanceDomains(locale);
  const domainSeparator = locale === 'en' ? ', ' : '、';

  return (
    <main className="site-shell">
      <SiteDocumentLanguage locale={locale} />
      <SiteHeader />
      <HomeHero locale={locale} />

      <aside className={styles.systemStrip} aria-label={copy.systemStrip.ariaLabel}>
        <div className={styles.systemStripInner}>
          {copy.systemStrip.items.map((item) => (
            <article key={item.index}>
              <span>{item.index}</span>
              <strong>{item.label}</strong>
            </article>
          ))}
        </div>
      </aside>

      <section className={`${styles.section} ${styles.evidence}`} id="capabilities">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionKicker}>{copy.evidence.kicker}</p>
            <div>
              <h2>
                {copy.evidence.title}
                {copy.evidence.titleBreak ? (
                  <>
                    <br />
                    {copy.evidence.titleBreak}
                  </>
                ) : null}
              </h2>
              <p className={styles.sectionIntro}>{copy.evidence.intro}</p>
            </div>
          </div>

          <div className={styles.evidenceStage}>
            <div className={styles.productFrame}>
              <Image
                alt={copy.evidence.imageAlt}
                height={1000}
                sizes="(max-width: 720px) 100vw, 1280px"
                src={`${basePath}/product/console-platform-metrics.webp`}
                width={1600}
              />
            </div>
            <div className={styles.captionRow} aria-label={locale === 'en' ? 'Screen notes' : '界面说明'}>
              {copy.evidence.captions.map((caption) => (
                <p key={caption.label}>
                  <b>{caption.label}</b>
                  <span>{caption.text}</span>
                </p>
              ))}
            </div>
            <div className={styles.sectionAction}>
              <Link
                className={`${styles.button} ${styles.buttonSecondary}`}
                href={localizeHref(copy.evidence.action.href, locale)}
              >
                {copy.evidence.action.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.release}`} id="governance">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionKicker}>{copy.release.kicker}</p>
            <h2>
              {copy.release.title}
              <br />
              <span>{copy.release.titleAccent}</span>
            </h2>
          </div>
          <div className={styles.releaseSteps} aria-label={copy.release.stepsAriaLabel}>
            {copy.release.steps.map((step) => (
              <article key={step.index}>
                <span>{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.governance}`}>
        <div className={`${styles.sectionInner} ${styles.governanceLayout}`}>
          <div className={styles.governanceCopy}>
            <p className={styles.sectionKicker}>{copy.governance.kicker}</p>
            <h2>{copy.governance.title}</h2>
            <p>
              {governanceDomains.map((domain) => domain.name).join(domainSeparator)}
              {copy.governance.introSuffix}
            </p>
            <ul>
              {copy.governance.scopeItems.map((item) => (
                <li key={item.tag}>
                  {item.label}
                  <span>{item.tag}</span>
                </li>
              ))}
            </ul>
            <div className={styles.sectionAction}>
              <Link
                className={`${styles.button} ${styles.buttonSecondary}`}
                href={localizeHref(copy.governance.action.href, locale)}
              >
                {copy.governance.action.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className={styles.governanceVisual}>
            <Image
              alt={copy.governance.imageAlt}
              height={520}
              loading="eager"
              sizes="(max-width: 1200px) 100vw, 58vw"
              src={`${basePath}/product/console-governance-scope.webp`}
              width={1340}
            />
            <p>{copy.governance.imageCaption}</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.agent}`} id="agent">
        <div className={`${styles.sectionInner} ${styles.agentGrid}`}>
          <div>
            <p className={styles.sectionKicker}>{copy.agent.kicker}</p>
            <h2>
              {copy.agent.title}
              {copy.agent.titleBreak ? (
                <>
                  <br />
                  {copy.agent.titleBreak}
                </>
              ) : null}
            </h2>
            <p className={styles.agentCopy}>{copy.agent.copy}</p>
            <div className={styles.sectionAction}>
              <Link
                className={`${styles.button} ${styles.buttonSecondary}`}
                href={localizeHref(copy.agent.action.href, locale)}
              >
                {copy.agent.action.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.agentBoundary} aria-label={copy.agent.boundariesAriaLabel}>
              {copy.agent.boundaries.map((boundary) => (
                <div className={styles.boundaryRow} key={boundary.index}>
                  <span>{boundary.index}</span>
                  <strong>{boundary.action}</strong>
                  <small>{boundary.owner}</small>
                </div>
              ))}
            </div>
            <p className={styles.agentNote}>{copy.agent.note}</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.scope}`}>
        <div className={`${styles.sectionInner} ${styles.scopeLayout}`}>
          <div className={styles.scopeCopy}>
            <p className={styles.sectionKicker}>{copy.scope.kicker}</p>
            <h2>{copy.scope.title}</h2>
            <p>{copy.scope.intro}</p>
          </div>
          <ol className={styles.scopeList}>
            {copy.scope.items.map((scope, index) => (
              <li key={scope.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{scope.title}</strong>
                  <p>{scope.detail}</p>
                </div>
                <span aria-hidden="true">→</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.comparison}>
        <div className={`${styles.sectionInner} ${styles.comparisonInner}`}>
          <div className={styles.comparisonHeading}>
            <p className={styles.sectionKicker}>{copy.comparison.kicker}</p>
            <h2>{copy.comparison.title}</h2>
            <p>{copy.comparison.intro}</p>
            <Link
              className={`${styles.button} ${styles.buttonSecondary}`}
              href={localizeHref(copy.comparison.action.href, locale)}
            >
              {copy.comparison.action.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={styles.relationshipList}>
            {copy.comparison.relationships.map((relationship) => (
              <article key={relationship.index}>
                <span>{relationship.index}</span>
                <p>{relationship.products}</p>
                <h3>{relationship.title}</h3>
                <small>{relationship.detail}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <div>
            <p className={styles.eyebrow}>{copy.finalCta.eyebrow}</p>
            <h2>{copy.finalCta.title}</h2>
          </div>
          <div className={styles.finalCtaActions}>
            <Link className={styles.finalCtaButton} href={localizeHref(copy.finalCta.primary.href, locale)}>
              {copy.finalCta.primary.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              className={`${styles.finalCtaButton} ${styles.finalCtaSecondary}`}
              href={copy.finalCta.secondary.href}
            >
              {copy.finalCta.secondary.label}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <Link className={styles.footerBrand} href={localizeHref('/', locale)}>
              <Image
                alt=""
                aria-hidden="true"
                height={30}
                loading="eager"
                src={`${basePath}/lattice-hub-logo.png`}
                width={30}
              />
              <span>{copy.footer.brand}</span>
            </Link>
            <nav className={styles.footerLinks} aria-label={ui.footerNav}>
              {footerNav.map((item) => (
                <Link href={localizeHref(item.href, locale)} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className={styles.footerBottom}>
            <span>{copy.footer.tagline}</span>
            <span>{copy.footer.githubNote}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
