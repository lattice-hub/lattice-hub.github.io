import {
  DocsPageContent,
  generateDocsMetadata,
  generateDocsStaticParams,
} from '@/app/docs/_components/DocsPageContent';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  return <DocsPageContent locale="en" params={props.params} />;
}

export function generateStaticParams() {
  return generateDocsStaticParams('en');
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  return generateDocsMetadata('en', props.params);
}
