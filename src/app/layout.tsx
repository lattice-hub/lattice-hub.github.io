import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import 'fumadocs-ui/style.css';
import './global.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: {
    default: 'Lattice Hub',
    template: '%s | Lattice Hub',
  },
  description: '面向服务与 Agent 的云原生治理控制面，统一服务发现、配置发布、流量治理、身份与平台观测。',
  openGraph: {
    title: 'Lattice Hub',
    description: '面向服务与 Agent 的云原生治理控制面。',
    type: 'website',
  },
  icons: {
    icon: `${basePath}/lattice-hub-logo.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
