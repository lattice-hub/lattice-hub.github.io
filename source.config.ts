import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  // Locale directories are interpreted by the Fumadocs loader in src/lib/source.ts.
  dir: 'content/docs',
});

export default defineConfig({});
