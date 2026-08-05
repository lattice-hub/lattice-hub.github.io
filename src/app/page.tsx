import type { Metadata } from 'next';
import { ProductPageView } from '@/components/site/pages/ProductPageView';
import { getProductCopy } from '@/lib/site-copy';

export function generateMetadata(): Metadata {
  const { metadata } = getProductCopy('zh-CN');
  return metadata;
}

export default function Page() {
  return <ProductPageView locale="zh-CN" showArchitecture />;
}
