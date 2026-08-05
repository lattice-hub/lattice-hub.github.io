import type { Metadata } from 'next';
import { ProductPageView } from '@/components/site/pages/ProductPageView';
import { getProductCopy } from '@/lib/site-copy';

export function generateMetadata(): Metadata {
  const { metadata } = getProductCopy('en');
  return metadata;
}

/** Legacy `/en/product` URL renders the same product landing as `/en`. */
export default function Page() {
  return <ProductPageView locale="en" showArchitecture />;
}
