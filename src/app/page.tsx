import Link from 'next/link';
import {
  ArrowRight,
  Check,
  CircleDot,
  Database,
  FileDiff,
  Gauge,
  KeyRound,
  RadioTower,
  Server,
} from 'lucide-react';
import { HomeHero } from '@/components/site/HomeHero';
import { SiteHeader } from '@/components/site/SiteHeader';
import {
  capabilityPillars,
  docsSections,
  governanceDomains,
  platformFacts,
} from '@/lib/site-content';

const governanceGroups = ['流量路径', '稳定性', '安全与测试'] as const;

export default function HomePage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <HomeHero />

      <section className="fact-rail" aria-label="已确认产品事实">
        {platformFacts.map((fact) => (
          <article key={fact.label}>
            <strong>{fact.value}</strong>
            <div>
              <span>{fact.label}</span>
              <small>{fact.note}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="capabilities section-frame" id="capabilities" aria-labelledby="capabilities-title">
        <div className="section-intro">
          <p className="overline">One resource model</p>
          <h2 id="capabilities-title">把环境、资源和发布状态放回同一张图里。</h2>
          <p>
            控制面不只是协议聚合器。它先定义资源属于哪个运行环境、当前处于编辑态还是发布态，
            再让不同客户端和数据面消费一致结果。
          </p>
        </div>

        <div className="capability-list">
          {capabilityPillars.map((item) => (
            <Link className={`capability-row capability-${item.accent}`} href={item.href} key={item.index}>
              <span className="capability-index">{item.index}</span>
              <div className="capability-copy">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
              <p className="capability-detail">{item.detail}</p>
              <ArrowRight aria-hidden="true" size={19} />
            </Link>
          ))}
        </div>
      </section>

      <section className="governance section-frame" id="governance" aria-labelledby="governance-title">
        <div className="governance-heading">
          <p className="overline">Governance workbench</p>
          <h2 id="governance-title">九类治理能力，共用一套版本与发布语义。</h2>
          <p>
            Console 以结构化视图编辑规则。草稿、校验、灰度发布、历史与回滚彼此分离，
            避免“保存按钮”悄悄改变线上流量。
          </p>
          <Link className="text-link" href="/docs/principles/governance-release">
            了解治理发布链
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>

        <div className="governance-catalog">
          {governanceGroups.map((group) => (
            <div className="governance-group" key={group}>
              <div className="governance-group-title">
                <span>{group}</span>
                <small>{governanceDomains.filter((item) => item.group === group).length} 项</small>
              </div>
              {governanceDomains
                .filter((item) => item.group === group)
                .map((item) => (
                  <article className="governance-item" key={item.id}>
                    <CircleDot aria-hidden="true" size={15} />
                    <strong>{item.name}</strong>
                    <p>{item.summary}</p>
                    <span className="item-state">可编辑 · 可发布</span>
                  </article>
                ))}
            </div>
          ))}
        </div>
      </section>

      <section className="agent-section section-frame" aria-labelledby="agent-title">
        <div className="agent-workflow">
          <div className="agent-workflow-top">
            <div>
              <span className="panel-label">POLE AGENT / CONTROLLED CHANGE</span>
              <h3>更新 production / billing / timeout.yaml</h3>
            </div>
            <span className="runtime-ready"><i /> 需要人工确认</span>
          </div>

          <div className="agent-message user-message">
            <span>你</span>
            <p>把下游超时从 3s 调整到 5s，先给我看差异。</p>
          </div>

          <div className="tool-trace">
            <span className="trace-icon"><Database aria-hidden="true" size={15} /></span>
            <div>
              <strong>get_config_file</strong>
              <small>读取当前版本 · production/billing/timeout.yaml</small>
            </div>
            <Check aria-label="已完成" size={16} />
          </div>

          <div className="diff-view" aria-label="配置差异示意">
            <div className="diff-head"><FileDiff aria-hidden="true" size={15} /> 临时视图 · 尚未写入</div>
            <code><span>- request_timeout: 3s</span><span>+ request_timeout: 5s</span></code>
          </div>

          <div className="approval-row">
            <div>
              <KeyRound aria-hidden="true" size={16} />
              <span>确认后只保存编辑态草稿，不会发布。</span>
            </div>
            <button type="button" aria-label="界面示意，不执行真实操作" disabled>等待用户确认</button>
          </div>
        </div>

        <div className="agent-copy">
          <p className="overline">Human in the release loop</p>
          <h2 id="agent-title">Agent 可以准备变更，但不能绕过发布人。</h2>
          <p>
            Pole Agent 已通过 OpenAI-compatible 模型网关和白名单 MCP 工具形成最小真实闭环。
            当前配置修改会经过资源读取、不可变提案、预览哈希、并发检查和用户确认，最终只保存草稿。
          </p>
          <ul>
            <li><Check size={16} /> 使用当前 Console 用户身份与权限</li>
            <li><Check size={16} /> Secret 不进入模型上下文、diff 或日志</li>
            <li><Check size={16} /> 发布、回滚与删除仍由确定性产品流程承担</li>
          </ul>
          <p className="boundary-note">
            当前边界：写路径覆盖已有配置文件更新；治理规则写入、服务端会话持久化与流式输出仍在推进。
          </p>
        </div>
      </section>

      <section className="foundation section-frame" aria-labelledby="foundation-title">
        <div className="section-intro foundation-intro">
          <p className="overline">Operational foundation</p>
          <h2 id="foundation-title">控制面自己，也必须可配置、可观测、可部署。</h2>
        </div>
        <div className="foundation-grid">
          <article>
            <span className="foundation-icon"><Server size={20} /></span>
            <h3>类型化系统配置</h3>
            <p>Server / Console 共 63 项显式目录，区分部署锁定、待重启和受控热更新。</p>
            <small>Agent 配置支持版本、Secret 引用、发布前探活与 last-known-good。</small>
          </article>
          <article>
            <span className="foundation-icon"><Gauge size={20} /></span>
            <h3>OpenTelemetry 观测出口</h3>
            <p>控制面指标经 Collector 进入共享 GreptimeDB，由 Console 提供平台概览和查询。</p>
            <small>不把尚未落地的全链路 Trace / Event 能力包装成已完成。</small>
          </article>
          <article>
            <span className="foundation-icon"><RadioTower size={20} /></span>
            <h3>Kubernetes 与 Gateway</h3>
            <p>提供本地 Kubernetes 部署栈，Console 通过 Gateway 暴露，Controller 连接集群资源。</p>
            <small>同时保留 all、server 与 console 三种进程运行模式。</small>
          </article>
        </div>
      </section>

      <section className="architecture-strip" aria-label="控制面架构层次">
        <div className="architecture-copy">
          <span>PLUGIN-ORIENTED CONTROL PLANE</span>
          <strong>协议接入</strong>
          <i />
          <strong>业务服务</strong>
          <i />
          <strong>增量缓存</strong>
          <i />
          <strong>可替换存储</strong>
        </div>
        <Link href="/docs/principles/architecture">
          查看架构原理
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </section>

      <section className="docs-hub section-frame" aria-labelledby="docs-title">
        <div className="section-intro">
          <p className="overline">Documentation</p>
          <h2 id="docs-title">从产品能力进入，再按需下钻实现。</h2>
        </div>
        <div className="docs-list">
          {docsSections.map((section, index) => (
            <Link href={section.href} key={section.href}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{section.title}</h3>
                <p>{section.summary}</p>
              </div>
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <span>Build from a shared control plane.</span>
        <h2>先统一资源与发布语义，再扩展协议和运行时。</h2>
        <div>
          <Link className="button button-primary" href="/docs">
            阅读文档
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
          <Link className="button button-secondary" href="https://github.com/lattice-hub">
            GitHub
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <strong>Lattice Hub</strong>
          <span>面向服务与 Agent 的云原生治理控制面。</span>
        </div>
        <div className="footer-links">
          <Link href="/docs">文档</Link>
          <Link href="/components">组件生态</Link>
          <Link href="/docs/blog">博客</Link>
          <Link href="/docs/reports">报告</Link>
        </div>
        <span className="footer-note">Service governance, capability registry, and control-plane operations.</span>
      </footer>
    </main>
  );
}
