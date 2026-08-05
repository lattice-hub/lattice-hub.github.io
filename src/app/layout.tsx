import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import 'fumadocs-ui/style.css';
import './global.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Lattice.Hub',
    template: '%s | Lattice.Hub',
  },
  description: '统一运行环境、服务发现、配置与治理发布的开源控制面，让不同客户端和数据面读取版本化服务与治理视图。',
  openGraph: {
    title: 'Lattice.Hub',
    description: 'AI Native 服务治理，一个控制面。',
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
    <html className={`${plexSans.variable} ${plexMono.variable}`} lang="zh-CN" suppressHydrationWarning>
      <body>
        <RootProvider
          theme={{
            defaultTheme: 'system',
            enableSystem: true,
            attribute: 'class',
            disableTransitionOnChange: true,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
