import Link from 'next/link';
import {
  ComponentCollaborationDiagram,
  GovernanceExecutionDiagram,
} from '@/components/site/ArchitectureDiagrams';
import {
  InteriorFooter,
  InteriorHero,
  SectionHeading,
} from '@/components/site/InteriorPage';
import { SiteDocumentLanguage } from '@/components/site/SiteDocumentLanguage';
import { SiteHeader } from '@/components/site/SiteHeader';
import { getArchitectureCopy as getArchitecturePageCopy } from '@/lib/site-copy/architecture';
import type { SiteLocale } from '@/lib/site-locale';
import { localizeHref } from '@/lib/site-locale';
import styles from '@/app/architecture/ArchitecturePage.module.css';

type ArchitecturePageViewProps = {
  locale: SiteLocale;
};

export function ArchitecturePageView({ locale }: ArchitecturePageViewProps) {
  const copy = getArchitecturePageCopy(locale);

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
        <div className={styles.sectionInner}>
          <SectionHeading index={copy.componentMap.heading.index} title={copy.componentMap.heading.title}>
            <p>{copy.componentMap.heading.intro}</p>
          </SectionHeading>
          <div className={styles.diagramStage}>
            <ComponentCollaborationDiagram large locale={locale} />
          </div>
          <p className={styles.diagramNote}>{copy.componentMap.diagramNote}</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.componentSection}`}>
        <div className={styles.sectionInner}>
          <SectionHeading
            index={copy.responsibilities.heading.index}
            title={copy.responsibilities.heading.title}
          >
            <p>{copy.responsibilities.heading.intro}</p>
          </SectionHeading>
          <div className={styles.componentGrid}>
            {copy.responsibilities.components.map((component) => (
              <Link
                className={styles.componentCard}
                href={
                  component.href.startsWith('http')
                    ? component.href
                    : localizeHref(component.href, locale)
                }
                key={component.name}
              >
                <span>{component.index}</span>
                <small>{component.role}</small>
                <h3>{component.name}</h3>
                <p>{component.detail}</p>
                <strong>
                  {component.action}
                  <span aria-hidden="true">→</span>
                </strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.executionSection}`}>
        <div className={styles.sectionInner}>
          <SectionHeading index={copy.execution.heading.index} title={copy.execution.heading.title}>
            <p>{copy.execution.heading.intro}</p>
          </SectionHeading>
          <div className={styles.diagramStage}>
            <GovernanceExecutionDiagram large locale={locale} />
          </div>
          <div className={styles.executionNotes}>
            {copy.execution.notes.map((note) => (
              <article key={note.index}>
                <span>{note.index}</span>
                <h3>{note.title}</h3>
                <p>{note.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.boundarySection}`}>
        <div className={styles.sectionInner}>
          <SectionHeading index={copy.boundary.heading.index} title={copy.boundary.heading.title}>
            <p>{copy.boundary.heading.intro}</p>
          </SectionHeading>
          <div className={styles.responsibilityTable}>
            <div className={styles.tableHead}>
              {copy.boundary.tableHead.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            {copy.boundary.rows.map((row) => (
              <div className={styles.tableRow} key={row.layer}>
                <strong>{row.layer}</strong>
                <span>{row.names}</span>
                <p>{row.detail}</p>
              </div>
            ))}
          </div>
          <div className={styles.actions}>
            {copy.boundary.actions.map((action) => (
              <Link href={localizeHref(action.href, locale)} key={action.href}>
                {action.label}
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InteriorFooter locale={locale} />
    </main>
  );
}
