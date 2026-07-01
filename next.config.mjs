import { createMDX } from 'fumadocs-mdx/next';

const isStaticExport = process.env.NEXT_OUTPUT === 'export';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  devIndicators: false,
  ...(isStaticExport
    ? {
        output: 'export',
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
        ...(basePath
          ? {
              assetPrefix: basePath,
              basePath,
            }
          : {}),
      }
    : {}),
};

const withMDX = createMDX();

export default withMDX(config);
