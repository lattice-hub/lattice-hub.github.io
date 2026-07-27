'use client';

import { useMemo, useState } from 'react';
import type { ApiEndpointDef, ApiLocale, ApiParam } from '@/lib/http-openapi-reference';
import styles from './ApiEndpoint.module.css';

const locationLabel: Record<ApiLocale, Record<ApiParam['location'], string>> = {
  'zh-CN': {
    path: 'path',
    query: 'query',
    header: 'header',
    body: 'body',
  },
  en: {
    path: 'path',
    query: 'query',
    header: 'header',
    body: 'body',
  },
};

function ParamTree({
  params,
  locale,
  depth = 0,
}: {
  params: ApiParam[];
  locale: ApiLocale;
  depth?: number;
}) {
  return (
    <ul className={depth === 0 ? styles.paramList : styles.paramChildren}>
      {params.map((param) => (
        <li key={`${depth}-${param.location}-${param.name}`}>
          <div className={styles.paramHead}>
            <span className={styles.paramName}>{param.name}</span>
            <span className={styles.paramMeta}>
              {locationLabel[locale][param.location]} · {param.type}
            </span>
            {param.required ? (
              <span className={styles.required}>
                {locale === 'en' ? 'required' : '必填'}
              </span>
            ) : (
              <span className={styles.paramMeta}>
                {locale === 'en' ? 'optional' : '可选'}
              </span>
            )}
          </div>
          <p className={styles.paramDesc}>{param.description[locale]}</p>
          {param.children?.length ? (
            <ParamTree depth={depth + 1} locale={locale} params={param.children} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function ApiEndpoint({
  endpoint,
  locale,
}: {
  endpoint: ApiEndpointDef;
  locale: ApiLocale;
}) {
  const [sampleLang, setSampleLang] = useState(endpoint.samples[0]?.lang ?? 'curl');
  const [copied, setCopied] = useState<'sample' | 'response' | null>(null);

  const activeSample = useMemo(
    () => endpoint.samples.find((sample) => sample.lang === sampleLang) ?? endpoint.samples[0],
    [endpoint.samples, sampleLang],
  );

  const copyText = async (text: string, kind: 'sample' | 'response') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      // ignore clipboard failures in restricted contexts
    }
  };

  return (
    <article className={styles.endpoint} id={endpoint.id}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.methodRow}>
            <span className={`${styles.method} ${styles[`method${endpoint.method}`]}`}>
              {endpoint.method}
            </span>
            <code className={styles.path}>{endpoint.path}</code>
            {endpoint.auth ? (
              <span className={styles.authBadge}>
                {locale === 'en' ? 'Auth required' : '需要鉴权'}
              </span>
            ) : null}
          </div>
          <h3 className={styles.title}>{endpoint.title[locale]}</h3>
          <p className={styles.description}>{endpoint.description[locale]}</p>

          <p className={styles.sectionLabel}>
            {locale === 'en' ? 'Parameters' : '参数'}
          </p>
          {endpoint.params.length === 0 ? (
            <p className={styles.emptyParams}>
              {locale === 'en' ? 'No parameters.' : '无额外参数。'}
            </p>
          ) : (
            <ParamTree locale={locale} params={endpoint.params} />
          )}

          {endpoint.responseFields?.length ? (
            <>
              <p className={`${styles.sectionLabel} ${styles.responseFieldsLabel}`}>
                {locale === 'en' ? 'Response fields' : '响应字段'}
              </p>
              <ParamTree locale={locale} params={endpoint.responseFields} />
            </>
          ) : null}
        </div>

        <div className={styles.right}>
          <div className={styles.panel}>
            <div className={styles.tabs} role="tablist" aria-label={locale === 'en' ? 'Code language' : '示例语言'}>
              {endpoint.samples.map((sample) => (
                <button
                  aria-selected={activeSample?.lang === sample.lang}
                  key={sample.lang}
                  onClick={() => setSampleLang(sample.lang)}
                  role="tab"
                  type="button"
                >
                  {sample.label}
                </button>
              ))}
            </div>
            <div className={styles.panelHead}>
              <span>{locale === 'en' ? 'Request' : '请求示例'}</span>
              <button
                className={styles.copy}
                onClick={() => activeSample && copyText(activeSample.code, 'sample')}
                type="button"
              >
                {copied === 'sample'
                  ? locale === 'en'
                    ? 'Copied'
                    : '已复制'
                  : locale === 'en'
                    ? 'Copy'
                    : '复制'}
              </button>
            </div>
            <pre className={styles.code}>
              <code>{activeSample?.code}</code>
            </pre>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <span>{endpoint.responseLabel[locale]}</span>
              <button
                className={styles.copy}
                onClick={() => copyText(endpoint.responseExample, 'response')}
                type="button"
              >
                {copied === 'response'
                  ? locale === 'en'
                    ? 'Copied'
                    : '已复制'
                  : locale === 'en'
                    ? 'Copy'
                    : '复制'}
              </button>
            </div>
            <pre className={styles.code}>
              <code>{endpoint.responseExample}</code>
            </pre>
          </div>
        </div>
      </div>
    </article>
  );
}
