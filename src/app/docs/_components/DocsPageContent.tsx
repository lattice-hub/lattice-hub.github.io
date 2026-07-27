import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { mdxComponents } from '@/mdx-components';
import {
  getHttpOpenApiToc,
  resolveHttpOpenApiSectionId,
} from '@/lib/http-openapi-toc';
import { source, type DocsLocale } from '@/lib/source';

type DocsPageParams = Promise<{ slug?: string[] }>;
const docsBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function getDocsMetadataUrl(url: string): string {
  return `${docsBasePath}${url}`;
}

export async function DocsPageContent({
  locale,
  params,
}: {
  locale: DocsLocale;
  params: DocsPageParams;
}) {
  const { slug } = await params;
  const page = source.getPage(slug, locale);

  if (!page) {
    notFound();
  }

  const zhPage = source.getPage(slug, 'zh-CN');
  const enPage = source.getPage(slug, 'en');
  const MDX = page.data.body;

  if (!zhPage || !enPage) {
    throw new Error(`Missing bilingual document pair for: ${slug?.join('/') ?? 'index'}`);
  }

  const openApiSectionId = resolveHttpOpenApiSectionId(slug);
  const openApiToc = openApiSectionId
    ? getHttpOpenApiToc(openApiSectionId, locale)
    : [];
  const toc = [...(page.data.toc ?? []), ...openApiToc];
  const full = Boolean(page.data.full);

  return (
    <DocsPage
      full={full}
      tableOfContent={
        full && toc.length > 0
          ? {
              enabled: true,
            }
          : undefined
      }
      toc={toc}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={mdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateDocsStaticParams(locale: DocsLocale) {
  return source.getPages(locale).map((page) => ({
    slug: page.slugs,
  }));
}

export async function generateDocsMetadata(
  locale: DocsLocale,
  params: DocsPageParams,
): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug, locale);

  if (!page) {
    notFound();
  }

  const zhPage = source.getPage(slug, 'zh-CN');
  const enPage = source.getPage(slug, 'en');

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: getDocsMetadataUrl(page.url),
      languages: {
        'zh-CN': getDocsMetadataUrl(zhPage?.url ?? '/docs'),
        en: getDocsMetadataUrl(enPage?.url ?? '/en/docs'),
      },
    },
  };
}
