import type { Metadata } from 'next';
import { ComparePageView } from '@/components/site/pages/ComparePageView';
import { getCompareCopy } from '@/lib/site-copy';

export function generateMetadata(): Metadata {
  const { metadata } = getCompareCopy('en');
  return metadata;
}

export default function Page() {
  return <ComparePageView locale="en" />;
}
