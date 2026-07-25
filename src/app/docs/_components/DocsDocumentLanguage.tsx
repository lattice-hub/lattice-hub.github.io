'use client';

import { useEffect } from 'react';
import type { DocsLocale } from '@/lib/source';

export function DocsDocumentLanguage({ locale }: { locale: DocsLocale }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = locale;

    return () => {
      document.documentElement.lang = previous || 'zh-CN';
    };
  }, [locale]);

  return null;
}
