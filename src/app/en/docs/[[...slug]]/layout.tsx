import type { ReactNode } from 'react';
import { DocsLayoutContent } from '@/app/docs/_components/DocsLayoutContent';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;

  return (
    <DocsLayoutContent locale="en" slug={slug}>
      {children}
    </DocsLayoutContent>
  );
}
