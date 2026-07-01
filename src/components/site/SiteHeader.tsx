'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { siteNav } from '@/lib/site-content';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const primaryNav = siteNav.filter((item) => item.label !== 'GitHub');
  const githubNav = siteNav.find((item) => item.label === 'GitHub');

  const closeDrawer = () => setOpen(false);

  return (
    <header className="topnav">
      <div className="container topnav-inner">
        <Link aria-label="返回 Lattice Hub 首页" className="brand" href="/" onClick={closeDrawer}>
          <span className="glyph">
            <Image alt="" aria-hidden="true" height={32} priority src={`${basePath}/lattice-hub-logo.png`} width={32} />
          </span>
          <span className="brand-name">Lattice Hub</span>
        </Link>

        <nav className="nav-links" aria-label="主导航">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          {githubNav ? (
            <Link className="ghost github-link" href={githubNav.href}>
              <GitHubMark />
              <span>GitHub</span>
            </Link>
          ) : null}
          <Link className="nav-doc-button btn btn-primary btn-arrow" data-magnetic href="/docs">
            阅读文档
          </Link>
          <button
            aria-controls="site-mobile-drawer"
            aria-expanded={open}
            aria-label={open ? '关闭导航菜单' : '打开导航菜单'}
            className="menu-btn"
            onClick={() => setOpen((current) => !current)}
            type="button"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className={open ? 'drawer open' : 'drawer'} id="site-mobile-drawer">
        {primaryNav.map((item) => (
          <Link href={item.href} key={item.href} onClick={closeDrawer}>
            {item.label}
          </Link>
        ))}
        {githubNav ? (
          <Link href={githubNav.href} onClick={closeDrawer}>
            GitHub
          </Link>
        ) : null}
        <Link className="btn btn-primary btn-arrow" data-magnetic href="/docs" onClick={closeDrawer}>
          阅读文档
        </Link>
      </div>
    </header>
  );
}

function GitHubMark() {
  return (
    <svg aria-hidden="true" className="github-mark" fill="currentColor" height="16" viewBox="0 0 24 24" width="16">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.99c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.08 10.08 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}
