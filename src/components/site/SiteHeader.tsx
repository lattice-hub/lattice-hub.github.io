'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { DocsLanguageSwitch } from '@/components/site/DocsLanguageSwitch';
import { ThemeSwitch } from '@/components/site/ThemeSwitch';
import { GITHUB_ORGANIZATION_URL, isSiteNavActive } from '@/lib/site-content';
import { getSiteLanguageSwitch, localizeHref } from '@/lib/site-locale';
import { getSiteUi } from '@/lib/site-ui';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function GitHubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function SiteHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const pathname = usePathname();
  const siteLanguage = getSiteLanguageSwitch(pathname);
  const ui = getSiteUi(siteLanguage.locale);
  const homeHref = localizeHref('/', siteLanguage.locale);
  const experienceTriggerRef = useRef<HTMLButtonElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeExperience = (restoreFocus = false) => {
    setExperienceOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => experienceTriggerRef.current?.focus());
    }
  };

  const closeDrawer = (restoreFocus = false) => {
    setDrawerOpen(false);
    setExperienceOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  };

  const toggleExperienceNotice = (trigger: HTMLButtonElement) => {
    experienceTriggerRef.current = trigger;
    setExperienceOpen((current) => !current);
  };

  useEffect(() => {
    const resetFrame = window.requestAnimationFrame(() => {
      setDrawerOpen(false);
      setExperienceOpen(false);
    });

    return () => window.cancelAnimationFrame(resetFrame);
  }, [pathname]);

  useEffect(() => {
    const desktopBreakpoint = window.matchMedia('(min-width: 821px)');
    const resetNavigationState = () => {
      setDrawerOpen(false);
      setExperienceOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (experienceOpen) {
        closeExperience(true);
      } else if (drawerOpen) {
        closeDrawer(true);
      }
    };

    desktopBreakpoint.addEventListener('change', resetNavigationState);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      desktopBreakpoint.removeEventListener('change', resetNavigationState);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [drawerOpen, experienceOpen]);

  return (
    <header className="topnav">
      <div className="container topnav-inner">
        <Link
          aria-label={ui.brandHome}
          className="brand"
          href={homeHref}
          onClick={() => closeDrawer()}
        >
          <span className="glyph">
            <Image alt="" aria-hidden="true" height={32} priority src={`${basePath}/lattice-hub-logo.png`} width={32} />
          </span>
          <span className="brand-name">Lattice.Hub</span>
        </Link>

        <nav className="nav-links" aria-label={ui.primaryNav}>
          {ui.nav.map((item) => {
            const href = localizeHref(item.href, siteLanguage.locale);
            const active = isSiteNavActive(pathname, item.href);
            const className = [
              active ? 'active' : undefined,
              item.href === '/docs' ? 'nav-docs' : undefined,
            ]
              .filter(Boolean)
              .join(' ') || undefined;
            return (
              <Link
                aria-current={active ? 'page' : undefined}
                className={className}
                href={href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            aria-controls="experience-notice"
            aria-expanded={experienceOpen}
            className="experience-trigger"
            onClick={(event) => toggleExperienceNotice(event.currentTarget)}
            type="button"
          >
            {ui.experience}
          </button>
        </nav>

        <div className="nav-actions">
          <ThemeSwitch />
          <DocsLanguageSwitch
            enHref={siteLanguage.enHref}
            locale={siteLanguage.locale}
            zhHref={siteLanguage.zhHref}
          />
          <a
            aria-label={ui.githubAria}
            className="github-link"
            href={GITHUB_ORGANIZATION_URL}
            rel="noreferrer"
            target="_blank"
          >
            <GitHubIcon />
            <span>{ui.githubLabel}</span>
          </a>
          <button
            aria-controls="site-mobile-drawer"
            aria-expanded={drawerOpen}
            aria-label={drawerOpen ? ui.closeMenu : ui.openMenu}
            className="menu-btn"
            onClick={() => (
              drawerOpen ? closeDrawer(true) : setDrawerOpen(true)
            )}
            ref={menuButtonRef}
            type="button"
          >
            {drawerOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <nav
        aria-label={ui.mobileNav}
        className={drawerOpen ? 'drawer open' : 'drawer'}
        id="site-mobile-drawer"
      >
        {ui.nav.map((item) => {
          const href = localizeHref(item.href, siteLanguage.locale);
          const active = isSiteNavActive(pathname, item.href);
          const className = [
            active ? 'active' : undefined,
            item.href === '/docs' ? 'nav-docs' : undefined,
          ]
            .filter(Boolean)
            .join(' ') || undefined;
          return (
            <Link
              aria-current={active ? 'page' : undefined}
              className={className}
              href={href}
              key={item.href}
              onClick={() => closeDrawer()}
            >
              {item.label}
            </Link>
          );
        })}
        <button
          aria-controls="experience-notice"
          aria-expanded={experienceOpen}
          className="drawer-experience"
          onClick={(event) => toggleExperienceNotice(event.currentTarget)}
          type="button"
        >
          {ui.experience}
        </button>
        <div className="drawer-theme">
          <ThemeSwitch />
        </div>
        <div className="drawer-lang">
          <DocsLanguageSwitch
            enHref={siteLanguage.enHref}
            locale={siteLanguage.locale}
            zhHref={siteLanguage.zhHref}
          />
        </div>
        <a
          aria-label={ui.githubAria}
          className="drawer-github"
          href={GITHUB_ORGANIZATION_URL}
          onClick={() => closeDrawer()}
          rel="noreferrer"
          target="_blank"
        >
          <GitHubIcon />
          <span>{ui.githubLabel}</span>
        </a>
      </nav>

      <section
        aria-label={ui.experienceRegion}
        className="experience-notice"
        hidden={!experienceOpen}
        id="experience-notice"
        role="region"
      >
        <div>
          <span>{ui.experienceEyebrow}</span>
          <strong>{ui.experienceTitle}</strong>
          <p>{ui.experienceBody}</p>
        </div>
        <button
          aria-label={ui.experienceClose}
          className="experience-notice-close"
          onClick={() => closeExperience(true)}
          type="button"
        >
          <X size={17} />
        </button>
      </section>
      <p aria-live="polite" className="experience-live" role="status">
        {experienceOpen ? ui.experienceTitle : ''}
      </p>
    </header>
  );
}
