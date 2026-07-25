'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GitFork, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  GITHUB_ORGANIZATION_URL,
  isSiteNavActive,
  siteNav,
} from '@/lib/site-content';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function SiteHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const pathname = usePathname();
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
        <Link aria-label="返回 Lattice Hub 首页" className="brand" href="/" onClick={() => closeDrawer()}>
          <span className="glyph">
            <Image alt="" aria-hidden="true" height={32} priority src={`${basePath}/lattice-hub-logo.png`} width={32} />
          </span>
          <span className="brand-name">Lattice.Hub</span>
        </Link>

        <nav className="nav-links" aria-label="主导航">
          {siteNav.map((item) => (
            <Link
              aria-current={isSiteNavActive(pathname, item.href) ? 'page' : undefined}
              className={isSiteNavActive(pathname, item.href) ? 'active' : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <button
            aria-controls="experience-notice"
            aria-expanded={experienceOpen}
            className="experience-trigger"
            onClick={(event) => toggleExperienceNotice(event.currentTarget)}
            type="button"
          >
            体验
          </button>
        </nav>

        <div className="nav-actions">
          <a
            aria-label="访问 Lattice Hub GitHub 组织（在新窗口打开）"
            className="github-link"
            href={GITHUB_ORGANIZATION_URL}
            rel="noreferrer"
            target="_blank"
          >
            <GitFork aria-hidden="true" size={17} strokeWidth={1.8} />
            <span>GitHub</span>
          </a>
          <button
            aria-controls="site-mobile-drawer"
            aria-expanded={drawerOpen}
            aria-label={drawerOpen ? '关闭导航菜单' : '打开导航菜单'}
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
        aria-label="移动主导航"
        className={drawerOpen ? 'drawer open' : 'drawer'}
        id="site-mobile-drawer"
      >
        {siteNav.map((item) => (
          <Link
            aria-current={isSiteNavActive(pathname, item.href) ? 'page' : undefined}
            className={isSiteNavActive(pathname, item.href) ? 'active' : undefined}
            href={item.href}
            key={item.href}
            onClick={() => closeDrawer()}
          >
            {item.label}
          </Link>
        ))}
        <button
          aria-controls="experience-notice"
          aria-expanded={experienceOpen}
          className="drawer-experience"
          onClick={(event) => toggleExperienceNotice(event.currentTarget)}
          type="button"
        >
          体验
        </button>
        <a
          className="drawer-github"
          href={GITHUB_ORGANIZATION_URL}
          onClick={() => closeDrawer()}
          rel="noreferrer"
          target="_blank"
        >
          <GitFork aria-hidden="true" size={17} strokeWidth={1.8} />
          <span>GitHub</span>
        </a>
      </nav>

      <section
        aria-label="产品体验状态"
        className="experience-notice"
        hidden={!experienceOpen}
        id="experience-notice"
        role="region"
      >
        <div>
          <span>PRODUCT EXPERIENCE</span>
          <strong>产品体验，马上到来。</strong>
          <p>Lattice.Hub Console 公开体验环境正在准备中。</p>
        </div>
        <button
          aria-label="关闭产品体验提示"
          className="experience-notice-close"
          onClick={() => closeExperience(true)}
          type="button"
        >
          <X size={17} />
        </button>
      </section>
      <p aria-live="polite" className="experience-live" role="status">
        {experienceOpen ? '产品体验，马上到来。' : ''}
      </p>
    </header>
  );
}
