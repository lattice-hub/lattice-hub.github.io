import type { Metadata } from 'next';
import { ArchitecturePageView } from '@/components/site/pages/ArchitecturePageView';
import { getArchitectureCopy } from '@/lib/site-copy';

export function generateMetadata(): Metadata {
  const { metadata } = getArchitectureCopy('en');
  return metadata;
}

export default function Page() {
  return <ArchitecturePageView locale="en" />;
}
