import type { Metadata } from 'next';
import { GovernancePageView } from '@/components/site/pages/GovernancePageView';
import { getGovernanceCopy } from '@/lib/site-copy';

export function generateMetadata(): Metadata {
  const { metadata } = getGovernanceCopy('en');
  return metadata;
}

export default function Page() {
  return <GovernancePageView locale="en" />;
}
