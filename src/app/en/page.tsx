import type { Metadata } from 'next';
import { HomePageView } from '@/components/site/pages/HomePageView';
import { getHomeCopy } from '@/lib/site-copy';

export function generateMetadata(): Metadata {
  const { metadata } = getHomeCopy('en');
  return metadata;
}

export default function Page() {
  return <HomePageView locale="en" />;
}
