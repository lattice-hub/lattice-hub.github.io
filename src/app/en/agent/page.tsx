import type { Metadata } from 'next';
import { AgentPageView } from '@/components/site/pages/AgentPageView';
import { getAgentCopy } from '@/lib/site-copy';

export function generateMetadata(): Metadata {
  const { metadata } = getAgentCopy('en');
  return metadata;
}

export default function Page() {
  return <AgentPageView locale="en" />;
}
