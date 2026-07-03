import Link from 'next/link';
import { HomeHero } from '@/components/site/HomeHero';
import { HomeInteractions } from '@/components/site/HomeInteractions';
import { SiteHeader } from '@/components/site/SiteHeader';
import { architectureFacts, capabilityHighlights, docsSections, runtimeServices } from '@/lib/site-content';

export default function HomePage() {
  return (
    <main className="site-shell">
      <HomeInteractions />
      <SiteHeader />
      <HomeHero />

      <section className="home-lines" aria-labelledby="home-lines-title">
        <div className="section-heading compact">
          <p className="eyebrow">Two operating lines</p>
          <h2 id="home-lines-title">同一个控制面，覆盖治理链路与 Agent 能力目录</h2>
        </div>
        <div className="function-architecture" data-spotlight>
          <div className="control-capabilities" aria-label="Lattice Hub 控制面能力域">
            {capabilityHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <article className="capability-domain" key={item.title}>
                  <span className="card-icon">
                    <Icon size={18} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="capability-chips" aria-label={`${item.title} 子能力`}>
                    {item.features.map((feature) => (
                      <span key={feature}>{feature}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="control-plane-bar">
            <span>Lattice Hub 控制面</span>
          </div>

          <div className="runtime-topology" aria-label="控制面覆盖业务运行时">
            {runtimeServices.map((service) => (
              <article
                className={service.emphasis ? 'runtime-service runtime-service-primary' : 'runtime-service'}
                key={service.name}
              >
                <div className="runtime-service-body">
                  {service.blocks.map((block) => (
                    <section className="runtime-block" key={block.title}>
                      <h3>{block.title}</h3>
                      <div className="runtime-chips">
                        {block.items.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
                <footer>
                  <strong>{service.name}</strong>
                  <span>{service.role}</span>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-hub" aria-labelledby="docs-routing-title">
        <div className="section-heading compact">
          <h2 id="docs-routing-title">进入 fumadocs 文档体系</h2>
          <p>
            产品能力、架构原理、治理规则、组件生态、博客和报告都在 docs 信息架构中展开。
            首页只负责建立主张和分流路径。
          </p>
        </div>
        <div className="content-grid">
          {docsSections.map((section) => (
            <Link className="content-card glass-card" data-spotlight href={section.href} key={section.href}>
              <h3>{section.title}</h3>
              <p>{section.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="facts" aria-label="已确认架构事实">
        {architectureFacts.map((fact) => (
          <article className="fact glass-card" data-spotlight key={fact.label}>
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </article>
        ))}
      </section>

      <section className="cta-band">
        <p className="eyebrow">Build with facts</p>
        <h2>从真实组件、真实协议和可验证报告开始治理。</h2>
        <div className="hero-actions">
          <Link className="button-primary btn btn-primary btn-arrow" data-magnetic href="/docs">
            阅读文档
          </Link>
          <Link className="button-secondary btn btn-secondary" data-magnetic href="/docs/reports">
            查看报告
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <span>Pole.IO / Lattice Hub</span>
          <span>Service governance, capability registry, and component ecosystem.</span>
        </div>
        <strong className="wordmark">Lattice Hub</strong>
      </footer>
    </main>
  );
}
