import Image from 'next/image';
import Link from 'next/link';
import { HomeHero } from '@/components/site/HomeHero';
import styles from '@/components/site/HomePage.module.css';
import { SiteHeader } from '@/components/site/SiteHeader';
import { governanceDomains, siteFooterNav } from '@/lib/site-content';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const releaseSteps = [
  {
    index: '01 / DRAFT',
    title: '保存草稿',
    detail: '先记录变化，不直接改变运行态。',
  },
  {
    index: '02 / VERSION',
    title: '形成版本',
    detail: '配置生成不可变发布快照，治理规则保留版本记录。',
  },
  {
    index: '03 / RELEASE',
    title: '受控发布',
    detail: '通过灰度或全量流程，将已确认版本送入运行时。',
  },
  {
    index: '04 / ROLLBACK',
    title: '历史回滚',
    detail: '出现偏差时返回已知版本，而不是重新猜测旧状态。',
  },
] as const;

const agentBoundaries = [
  ['01', '读取已有配置', 'Agent'],
  ['02', '生成不可变提案', 'Agent'],
  ['03', '预览差异并确认', '人'],
  ['04', '保存编辑态草稿', 'Agent'],
] as const;

const environmentScopes = [
  {
    title: '运行环境',
    detail: 'Namespace 组织服务、配置与治理资源，但不冒充租户或团队空间。',
  },
  {
    title: '协议接入',
    detail: '接入 Polaris gRPC / REST、Nacos v1 / v2、Apollo、Eureka 与 Envoy xDS v3。',
  },
  {
    title: '运行时视图',
    detail: 'Rust SDK、Pole Sidecar 与 Proxy Mesh / Gateway 读取版本化治理视图。',
  },
  {
    title: '能力目录',
    detail: 'MCP 与 A2A Registry 登记工具、Agent Card、技能和能力元数据，只承担注册发现。',
  },
] as const;

const productRelationships = [
  {
    index: '01 / KEEP THE ENTRY',
    products: 'Nacos · Apollo',
    title: '兼容接入，渐进收敛',
    detail: '保留熟悉的客户端协议，把注册与配置逐步带入统一控制面。',
  },
  {
    index: '02 / COMPARE THE PLANE',
    products: 'PolarisMesh',
    title: '同层控制面参照',
    detail: '按服务、配置、治理、运行时与发布语义逐项比较，而不是只看功能名称。',
  },
  {
    index: '03 / COMPOSE THE RUNTIME',
    products: 'Istio · Kmesh',
    title: 'Mesh 与数据面关系',
    detail: '明确控制权边界；组合方向必须经过协议适配和真实流量验证。',
  },
] as const;

export default function HomePage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <HomeHero />

      <aside className={styles.systemStrip} aria-label="产品能力概览">
        <div className={styles.systemStripInner}>
          <article>
            <span>01 / PROTOCOLS</span>
            <strong>Polaris、Nacos、Apollo、Eureka 与 Envoy xDS v3</strong>
          </article>
          <article>
            <span>02 / RELEASE</span>
            <strong>草稿、版本、灰度、发布与回滚</strong>
          </article>
          <article>
            <span>03 / RUNTIME</span>
            <strong>Rust SDK、Pole Sidecar 与 Proxy Mesh / Gateway</strong>
          </article>
        </div>
      </aside>

      <section className={`${styles.section} ${styles.evidence}`} id="capabilities">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionKicker}>01 / Product evidence</p>
            <div>
              <h2>
                控制面应该可见，
                <br />
                而不是靠想象。
              </h2>
              <p className={styles.sectionIntro}>
                当前 Console 将控制面组件、接口指标与延迟分布放进同一视图，
                帮助操作者检查系统状态和变化影响。它是控制面自身的观测入口，
                不是独立的全链路观测平台。
              </p>
            </div>
          </div>

          <div className={styles.evidenceStage}>
            <div className={styles.productFrame}>
              <Image
                alt="Lattice.Hub Console 平台监控完整真实界面"
                height={1000}
                sizes="(max-width: 720px) 100vw, 1280px"
                src={`${basePath}/product/console-platform-metrics.webp`}
                width={1600}
              />
            </div>
            <div className={styles.captionRow} aria-label="界面说明">
              <p>
                <b>A</b>
                <span>当前 Console 真实界面 · Platform Metrics。</span>
              </p>
              <p>
                <b>B</b>
                <span>界面只证明产品能力存在，不把本地测试数据描述成线上运行指标。</span>
              </p>
            </div>
            <div className={styles.sectionAction}>
              <Link className={`${styles.button} ${styles.buttonSecondary}`} href="/product">
                了解完整产品
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.release}`} id="governance">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionKicker}>02 / Deterministic release</p>
            <h2>
              变更不是保存，
              <br />
              <span>是版本。</span>
            </h2>
          </div>
          <div className={styles.releaseSteps} aria-label="发布语义">
            {releaseSteps.map((step) => (
              <article key={step.index}>
                <span>{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.governance}`}>
        <div className={`${styles.sectionInner} ${styles.governanceLayout}`}>
          <div className={styles.governanceCopy}>
            <p className={styles.sectionKicker}>03 / Governance semantics</p>
            <h2>规则的作用域，和规则本身一样重要。</h2>
            <p>
              {governanceDomains.map((domain) => domain.name).join('、')}，
              共享一致的资源表达与发布语义。
            </p>
            <ul>
              <li>
                服务调用范围
                <span>WHO → WHOM</span>
              </li>
              <li>
                规则与子规则
                <span>POLICY</span>
              </li>
              <li>
                版本与发布记录
                <span>HISTORY</span>
              </li>
            </ul>
            <div className={styles.sectionAction}>
              <Link className={`${styles.button} ${styles.buttonSecondary}`} href="/governance">
                深入服务治理
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className={styles.governanceVisual}>
            <Image
              alt="Lattice.Hub Console 治理规则详情真实界面，展示服务调用范围与熔断子规则"
              height={520}
              loading="eager"
              sizes="(max-width: 1200px) 100vw, 58vw"
              src={`${basePath}/product/console-governance-scope.webp`}
              width={1340}
            />
            <p>
              真实治理详情：调用方、被调方、熔断粒度与子规则在同一上下文中确认。
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.agent}`} id="agent">
        <div className={`${styles.sectionInner} ${styles.agentGrid}`}>
          <div>
            <p className={styles.sectionKicker}>04 / Pole Agent</p>
            <h2>
              Agent 准备变更，
              <br />
              人决定发布。
            </h2>
            <p className={styles.agentCopy}>
              当前 Pole Agent 可在登录用户权限内读取命名空间、MCP Registry 和配置文件。
              对已有配置文件的更新，它会生成不可变提案与差异预览；确认后只保存编辑态草稿。
            </p>
            <div className={styles.sectionAction}>
              <Link className={`${styles.button} ${styles.buttonSecondary}`} href="/agent">
                了解 Pole Agent
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.agentBoundary} aria-label="Pole Agent 权限边界">
              {agentBoundaries.map(([index, action, owner]) => (
                <div className={styles.boundaryRow} key={index}>
                  <span>{index}</span>
                  <strong>{action}</strong>
                  <small>{owner}</small>
                </div>
              ))}
            </div>
            <p className={styles.agentNote}>
              发布、回滚与删除仍由确定性的产品流程承担。当前写路径仅覆盖已有配置文件更新；
              治理规则写入、新建资源、流式输出与服务端会话持久化仍未覆盖。
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.scope}`}>
        <div className={`${styles.sectionInner} ${styles.scopeLayout}`}>
          <div className={styles.scopeCopy}>
            <p className={styles.sectionKicker}>05 / One environment</p>
            <h2>不替换现有入口，统一背后的控制面。</h2>
            <p>从协议接入到运行时消费，每类资源都回到同一份版本化控制面视图。</p>
          </div>
          <ol className={styles.scopeList}>
            {environmentScopes.map((scope, index) => (
              <li key={scope.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{scope.title}</strong>
                  <p>{scope.detail}</p>
                </div>
                <span aria-hidden="true">→</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.comparison}>
        <div className={`${styles.sectionInner} ${styles.comparisonInner}`}>
          <div className={styles.comparisonHeading}>
            <p className={styles.sectionKicker}>06 / Why Pole</p>
            <h2>不是所有服务治理产品，都在同一层。</h2>
            <p>先判断是保留入口、迁移控制面，还是组合 Mesh 数据面，再决定 Pole 应该负责什么。</p>
            <Link className={`${styles.button} ${styles.buttonSecondary}`} href="/compare">
              查看完整产品对比
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={styles.relationshipList}>
            {productRelationships.map((relationship) => (
              <article key={relationship.index}>
                <span>{relationship.index}</span>
                <p>{relationship.products}</p>
                <h3>{relationship.title}</h3>
                <small>{relationship.detail}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <div>
            <p className={styles.eyebrow}>Read the control plane</p>
            <h2>从一份确定的发布语义开始。</h2>
          </div>
          <div className={styles.finalCtaActions}>
            <Link className={styles.finalCtaButton} href="/docs">
              阅读文档
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              className={`${styles.finalCtaButton} ${styles.finalCtaSecondary}`}
              href="https://github.com/lattice-hub/pole-control-plane"
            >
              查看 Pole Control Plane
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <Link className={styles.footerBrand} href="/">
              <Image
                alt=""
                aria-hidden="true"
                height={30}
                loading="eager"
                src={`${basePath}/lattice-hub-logo.png`}
                width={30}
              />
              <span>Lattice.Hub</span>
            </Link>
            <nav className={styles.footerLinks} aria-label="页脚导航">
              {siteFooterNav.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className={styles.footerBottom}>
            <span>Open source service governance control plane.</span>
            <span>Open source on GitHub.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
