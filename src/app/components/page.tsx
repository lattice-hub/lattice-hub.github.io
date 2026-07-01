import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { componentGroups, componentPageActions } from '@/lib/site-content';

export const metadata: Metadata = {
  title: '组件生态',
  description: 'Pole.IO 组件矩阵与文档入口。',
};

export default function ComponentsPage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Component ecosystem</p>
        <h1>组件矩阵围绕同一个控制面协作</h1>
        <p>
          Control Plane 提供治理模型和多协议入口，Console、Controller、Sidecar、SDK 与
          Specification 分别覆盖可视化管理、Kubernetes 接入、数据面执行、Proxyless 接入和开放标准。
        </p>
        <div className="hero-actions">
          {componentPageActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link className="button-secondary" href={action.href} key={action.href}>
                <Icon size={17} />
                {action.title}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-band">
        <div className="component-grid">
          {componentGroups.map((component) => {
            const Icon = component.icon;
            return (
              <Link className="component-card" href={component.href} key={component.name}>
                <span className="card-icon">
                  <Icon size={20} />
                </span>
                <h2>{component.name}</h2>
                <p>{component.summary}</p>
                <ul>
                  {component.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
