import type { Metadata } from 'next';
import { ComponentsPageView } from '@/components/site/pages/ComponentsPageView';
import { getComponentsCopy } from '@/lib/site-copy';

export function generateMetadata(): Metadata {
  const { metadata } = getComponentsCopy('en');
  return metadata;
}

export default function Page() {
  return <ComponentsPageView locale="en" />;
}
