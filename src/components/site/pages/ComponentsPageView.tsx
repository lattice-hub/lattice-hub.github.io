import Link from 'next/link';
import { SiteDocumentLanguage } from '@/components/site/SiteDocumentLanguage';
import { SiteHeader } from '@/components/site/SiteHeader';
import { getComponentsCopy } from '@/lib/site-copy';
import { getComponentGroups, getComponentPageActions, getSiteFooterNav } from '@/lib/site-content';
import type { SiteLocale } from '@/lib/site-locale';
import { localizeHref } from '@/lib/site-locale';

type ComponentsPageViewProps = {
  locale: SiteLocale;
};

export function ComponentsPageView({ locale }: ComponentsPageViewProps) {
  const copy = getComponentsCopy(locale);
  const componentGroups = getComponentGroups(locale);
  const componentPageActions = getComponentPageActions(locale);
  const siteFooterNav = getSiteFooterNav(locale);

  return (
    <main className="site-shell">
      <SiteDocumentLanguage locale={locale} />
      <SiteHeader />
      <section className="page-hero">
        <p className="overline">{copy.hero.overline}</p>
        <h1>{copy.hero.title}</h1>
        <p>{copy.hero.intro}</p>
        <div className="hero-actions">
          {componentPageActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                className="button button-secondary"
                href={
                  action.href.startsWith('http') ? action.href : localizeHref(action.href, locale)
                }
                key={action.href}
              >
                <Icon size={17} />
                {action.title}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="component-directory section-frame">
        <div className="component-directory-head">
          {copy.directory.columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </div>
        <div className="component-list">
          {componentGroups.map((component, index) => {
            const Icon = component.icon;
            return (
              <Link
                className="component-row"
                href={
                  component.href.startsWith('http')
                    ? component.href
                    : localizeHref(component.href, locale)
                }
                key={component.name}
              >
                <span className="card-icon">
                  <Icon size={20} />
                </span>
                <div className="component-name">
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <h2>{component.name}</h2>
                </div>
                <p>{component.summary}</p>
                <div className="component-details">
                  {component.details.map((detail) => (
                    <span key={detail}>{detail}</span>
                  ))}
                </div>
                <span className="component-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="site-footer compact-footer">
        <div className="footer-brand">
          <strong>{copy.footer.brand}</strong>
          <span>{copy.footer.tagline}</span>
        </div>
        <div className="footer-links">
          <Link href={localizeHref('/', locale)}>{copy.footer.homeLink}</Link>
          {siteFooterNav.map((item) => (
            <Link href={localizeHref(item.href, locale)} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </footer>
    </main>
  );
}
