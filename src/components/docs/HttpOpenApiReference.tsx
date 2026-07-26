'use client';

import { usePathname } from 'next/navigation';
import { ApiEndpoint } from '@/components/docs/ApiEndpoint';
import { httpOpenApiSections, type ApiLocale } from '@/lib/http-openapi-reference';
import styles from './HttpOpenApiReference.module.css';

function resolveLocale(pathname: string | null): ApiLocale {
  return pathname?.includes('/en/') ? 'en' : 'zh-CN';
}

export function HttpOpenApiReference() {
  const pathname = usePathname();
  const locale = resolveLocale(pathname);

  return (
    <div className={styles.root}>
      {httpOpenApiSections.map((section) => (
        <section className={styles.section} id={section.id} key={section.id}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{section.title[locale]}</h2>
            <p className={styles.sectionDesc}>{section.description[locale]}</p>
          </header>
          {section.endpoints.map((endpoint) => (
            <ApiEndpoint endpoint={endpoint} key={endpoint.id} locale={locale} />
          ))}
        </section>
      ))}
    </div>
  );
}
