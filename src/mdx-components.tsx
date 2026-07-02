import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ImgHTMLAttributes } from 'react';

type StructuredImageSrc = {
  src: string;
};

export function resolveImageSrc(src: unknown): string | undefined {
  if (typeof src === 'string') {
    return src;
  }

  if (src && typeof src === 'object' && 'src' in src && typeof (src as StructuredImageSrc).src === 'string') {
    return (src as StructuredImageSrc).src;
  }

  return undefined;
}

function DocsImage({ src, alt = '', ...props }: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & { src?: unknown }) {
  // SVG diagrams are authored assets; native img avoids Next image wrapping in MDX docs.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={alt} src={resolveImageSrc(src)} />;
}

export const mdxComponents: MDXComponents = {
  ...defaultMdxComponents,
  img: DocsImage,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
