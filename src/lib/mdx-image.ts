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
