'use client';

import { usePathname } from 'next/navigation';
import { ApiEndpoint } from '@/components/docs/ApiEndpoint';
import { getHttpOpenApiSection, type ApiLocale } from '@/lib/http-openapi-reference';
import styles from './HttpOpenApiReference.module.css';

function resolveLocale(pathname: string | null): ApiLocale {
  return pathname?.includes('/en/') ? 'en' : 'zh-CN';
}

type Props = {
  section: string;
};

export function HttpOpenApiReference({ section: sectionId }: Props) {
  const pathname = usePathname();
  const locale = resolveLocale(pathname);
  const section = getHttpOpenApiSection(sectionId);

  if (!section) {
    return (
      <p className={styles.sectionDesc}>
        {locale === 'en'
          ? `Unknown OpenAPI section: ${sectionId}`
          : `未知 OpenAPI 场景：${sectionId}`}
      </p>
    );
  }

  return (
    <div className={styles.root}>
      <section className={styles.section} id={section.id}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{section.title[locale]}</h2>
          <p className={styles.sectionDesc}>{section.description[locale]}</p>
        </header>
        {section.endpoints.map((endpoint) => (
          <ApiEndpoint endpoint={endpoint} key={endpoint.id} locale={locale} />
        ))}
      </section>
    </div>
  );
}
