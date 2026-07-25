import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { componentGroups, componentPageActions, siteNav } from '@/lib/site-content';

export const metadata: Metadata = {
  title: '组件生态',
  description: 'Pole.IO 组件矩阵与文档入口。',
};

export default function ComponentsPage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <section className="page-hero">
        <p className="overline">Component ecosystem</p>
        <h1>从控制面到运行时，组件围绕同一套资源模型协作。</h1>
        <p>
          Control Plane 定义治理模型和多协议入口；Console、Pole Agent、Controller、Sidecar、SDK、
          Observability 与 Specification 分别承担操作、接入、执行、观测和开放契约。
        </p>
        <div className="hero-actions">
          {componentPageActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link className="button button-secondary" href={action.href} key={action.href}>
                <Icon size={17} />
                {action.title}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="component-directory section-frame">
        <div className="component-directory-head">
          <span>COMPONENT</span>
          <span>RESPONSIBILITY</span>
          <span>IMPLEMENTATION NOTES</span>
        </div>
        <div className="component-list">
          {componentGroups.map((component, index) => {
            const Icon = component.icon;
            return (
              <Link className="component-row" href={component.href} key={component.name}>
                <span className="card-icon">
                  <Icon size={20} />
                </span>
                <div className="component-name">
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <h2>{component.name}</h2>
                </div>
                <p>{component.summary}</p>
                <div className="component-details">
                  {component.details.map((detail) => <span key={detail}>{detail}</span>)}
                </div>
                <span className="component-arrow" aria-hidden="true">→</span>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="site-footer compact-footer">
        <div className="footer-brand">
          <strong>Lattice Hub</strong>
          <span>面向服务与 Agent 的云原生治理控制面。</span>
        </div>
        <div className="footer-links">
          <Link href="/">首页</Link>
          {siteNav.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </footer>
    </main>
  );
}
