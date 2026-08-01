'use client';

import { useEffect } from 'react';
import type { SiteLocale } from '@/lib/site-locale';

/** Keeps `<html lang>` aligned with the active site/docs locale. */
export function SiteDocumentLanguage({ locale }: { locale: SiteLocale }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = locale;

    return () => {
      document.documentElement.lang = previous || 'zh-CN';
    };
  }, [locale]);

  return null;
}
