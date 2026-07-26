import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import 'fumadocs-ui/style.css';
import './global.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: {
    default: 'Lattice.Hub',
    template: '%s | Lattice.Hub',
  },
  description: '统一运行环境、服务发现、配置与治理发布的开源控制面，让不同客户端和数据面读取版本化服务与治理视图。',
  openGraph: {
    title: 'Lattice.Hub',
    description: '把服务变化，收进一个控制面。',
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
