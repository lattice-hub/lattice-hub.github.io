import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ImgHTMLAttributes } from 'react';
import { HttpOpenApiReference } from '@/components/docs/HttpOpenApiReference';
import { resolveImageSrc } from '@/lib/mdx-image';

export { resolveImageSrc } from '@/lib/mdx-image';

function DocsImage({ src, alt = '', ...props }: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & { src?: unknown }) {
  // SVG diagrams are authored assets; native img avoids Next image wrapping in MDX docs.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={alt} src={resolveImageSrc(src)} />;
}

export const mdxComponents: MDXComponents = {
  ...defaultMdxComponents,
  img: DocsImage,
  HttpOpenApiReference,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
