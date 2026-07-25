import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { siteFooterNav } from '@/lib/site-content';
import styles from './InteriorPage.module.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export type InteriorHeroItem = {
  index: string;
  title: string;
  detail: string;
};

type InteriorHeroProps = {
  eyebrow: string;
  title: string;
  accent: string;
  lede: string;
  primary: {
    href: string;
    label: string;
  };
  secondary?: {
    href: string;
    label: string;
  };
  items: InteriorHeroItem[];
};

export function InteriorHero({
  eyebrow,
  title,
  accent,
  lede,
  primary,
  secondary,
  items,
}: InteriorHeroProps) {
  const secondaryIsExternal = secondary?.href.startsWith('http') ?? false;

  return (
    <section className={styles.hero}>
      <div>
        <p className={styles.kicker}>{eyebrow}</p>
        <h1>
          {title}
          <span>{accent}</span>
        </h1>
        <p className={styles.heroLede}>{lede}</p>
        <div className={styles.actions}>
          <Link className={`${styles.button} ${styles.buttonPrimary}`} href={primary.href}>
            {primary.label}
            <span aria-hidden="true">→</span>
          </Link>
          {secondary ? (
            <Link className={`${styles.button} ${styles.buttonSecondary}`} href={secondary.href}>
              {secondary.label}
              <span aria-hidden="true">{secondaryIsExternal ? '↗' : '→'}</span>
            </Link>
          ) : null}
        </div>
      </div>

      <aside className={styles.heroIndex} aria-label={`${eyebrow} 页面索引`}>
        <ol>
          {items.map((item) => (
            <li key={item.index}>
              <span>{item.index}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}

export function InteriorFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <Link className={styles.footerBrand} href="/">
            <Image
              alt=""
              aria-hidden="true"
              height={30}
              loading="eager"
              src={`${basePath}/lattice-hub-logo.png`}
              width={30}
            />
            <span>Lattice.Hub</span>
          </Link>
          <nav className={styles.footerLinks} aria-label="页脚导航">
            {siteFooterNav.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <span>Open source service governance control plane.</span>
          <span>Open source on GitHub.</span>
        </div>
      </div>
    </footer>
  );
}

export function SectionHeading({
  index,
  title,
  children,
}: {
  index: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.sectionIndex}>{index}</p>
      <div>
        <h2>{title}</h2>
        {children ? <div className={styles.sectionLede}>{children}</div> : null}
      </div>
    </div>
  );
}
