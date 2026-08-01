import type { Metadata } from 'next';
import Link from 'next/link';
import {
  InteriorFooter,
  InteriorHero,
  SectionHeading,
} from '@/components/site/InteriorPage';
import interior from '@/components/site/InteriorPage.module.css';
import { SiteHeader } from '@/components/site/SiteHeader';
import styles from './ComparePage.module.css';

export const metadata: Metadata = {
  title: {
    absolute: '产品对比｜Pole 与 Nacos、Apollo、PolarisMesh、Istio、Kmesh',
  },
  description:
    '理解 Pole 与 Nacos、Apollo、PolarisMesh、Istio、Kmesh 分别处在哪一层，以及兼容、竞争、组合与尚未直接集成的真实边界。',
};

const layers = [
  {
    index: '01',
    name: '注册、配置与治理控制面',
    products: 'Nacos · Apollo · PolarisMesh · Pole',
    detail: '决定管理哪些资源、如何授权，以及变化何时进入运行态。',
  },
  {
    index: '02',
    name: '完整 Service Mesh 生态',
    products: 'Istio',
    detail: '同时拥有 Mesh 控制面、数据面、安全与遥测体系。',
  },
  {
    index: '03',
    name: 'Service Mesh 数据面',
    products: 'Kmesh',
    detail: '在业务流量路径执行负载均衡、安全与治理策略。',
  },
] as const;

const comparisons = [
  {
    index: '01',
    product: 'Nacos',
    category: '注册发现 / 配置',
    relation: '当前协议兼容',
    tone: 'current',
    title: '保留客户端，渐进收敛控制面。',
    detail: 'Pole 提供 Nacos v1 / v2 协议入口，可承接存量注册发现与配置客户端。',
    boundary: '不等同于复刻 Nacos 全部 Console、SDK 与生态扩展。',
    source: 'https://nacos.io/en/docs/latest/manual/user/naming/overview/',
  },
  {
    index: '02',
    product: 'Apollo',
    category: '配置中心',
    relation: '当前协议兼容',
    tone: 'current',
    title: '让配置进入统一的服务变化链。',
    detail: 'Pole 兼容 Apollo 配置客户端接入，并把配置与服务、治理放进同一运行环境。',
    boundary: '协议接入不是对 Apollo 全部管理面和 Open API 的逐项等价。',
    source: 'https://github.com/apolloconfig/apollo',
  },
  {
    index: '03',
    product: 'PolarisMesh',
    category: '综合治理控制面',
    relation: '同层对比',
    tone: 'peer',
    title: '最接近 Pole 的控制面参照。',
    detail: '两者都覆盖服务发现、配置与治理；Pole 继续强化统一发布语义、AI 能力目录与多运行时边界。',
    boundary: 'Polaris 协议兼容不代表其全部 SDK、Sidecar、Controller 已被等价替代。',
    source: 'https://polarismesh.cn/',
  },
  {
    index: '04',
    product: 'Istio',
    category: '完整 Service Mesh',
    relation: '能力重叠 / 可分域组合',
    tone: 'overlap',
    title: '完整 Mesh，与统一控制面分工。',
    detail: 'Istio 负责 Mesh 流量、安全和遥测；Pole 面向服务、配置、治理与多协议入口。',
    boundary: 'Pole 的 Envoy xDS 不等于已替代 Istiod 或完整支持 Istio API、ambient。',
    source: 'https://istio.io/latest/docs/ops/deployment/architecture/',
  },
  {
    index: '05',
    product: 'Kmesh',
    category: 'eBPF Mesh 数据面',
    relation: '可组合方向 / 尚未直连',
    tone: 'direction',
    title: '数据路径候选，不是控制面替代。',
    detail: 'Kmesh 在节点 eBPF 与 Waypoint 执行治理；Pole 可以研究成为其上层资源与发布控制面。',
    boundary: '双方支持 xDS 不能直接推出已经开箱即用，仍需资源适配与 E2E 验证。',
    source: 'https://kmesh.net/docs/setup/quick-start/',
  },
] as const;

const decisions = [
  ['正在使用 Nacos', '优先保留客户端协议，先验证注册、配置与灰度语义，再渐进迁移管理面。'],
  ['正在使用 Apollo', '把配置接入作为第一步，再决定是否把服务发现与治理一并收敛到 Pole。'],
  ['正在使用 PolarisMesh', '按 SDK、规则、Controller 与数据面逐项核验；这是控制面级迁移，不是改一个地址。'],
  ['正在使用 Istio', '先确定谁拥有路由与安全策略权威；避免 Pole 与 Istiod 同时控制同一数据面。'],
  ['正在评估 Kmesh', '把它视为数据面技术选择；Pole 与 Kmesh 的直连能力目前仍是待验证方向。'],
] as const;

export default function ComparePage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <InteriorHero
        accent="先分清彼此在哪一层。"
        eyebrow="WHY POLE / PRODUCT LANDSCAPE"
        items={[
          { index: '01', title: 'COMPATIBLE', detail: 'Nacos、Apollo 与 Polaris 协议入口' },
          { index: '02', title: 'PEER', detail: 'PolarisMesh 是同层控制面参照' },
          { index: '03', title: 'COMPOSE', detail: 'Istio 与 Kmesh 位于 Mesh 运行层' },
        ]}
        lede="不是所有带有“服务治理”标签的项目都在解决同一个问题。Pole 负责统一资源、权限与发布；其它系统可能是协议入口、同层控制面、完整 Mesh，或真正执行流量的数据面。"
        primary={{ href: '#products', label: '查看五项关系' }}
        secondary={{ href: '/docs/what-is/comparison', label: '阅读技术对比' }}
        title="比较产品之前，"
      />

      <section className={interior.section}>
        <SectionHeading index="01 / LAYERS, NOT LOGOS" title="先看职责层次，再看功能清单。">
          <p>
            一张同权的 Logo 表会把控制面、Mesh 与数据面混在一起。下面三层说明每个产品真正拥有的系统边界。
          </p>
        </SectionHeading>
        <div className={styles.layerMap} aria-label="产品层级关系">
          {layers.map((layer) => (
            <article className={styles.layer} key={layer.index}>
              <span>{layer.index}</span>
              <div>
                <p>{layer.name}</p>
                <strong>{layer.products}</strong>
              </div>
              <p>{layer.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.legendSection}>
        <div className={styles.legendInner}>
          <p>READ THE RELATIONSHIP</p>
          <div>
            <span><i data-tone="current" />当前协议兼容</span>
            <span><i data-tone="peer" />同层控制面对比</span>
            <span><i data-tone="overlap" />能力重叠 / 可分域</span>
            <span><i data-tone="direction" />组合方向 / 尚未直连</span>
          </div>
        </div>
      </section>

      <section className={interior.section} id="products">
        <SectionHeading index="02 / FIVE RELATIONSHIPS" title="不是谁取代谁，而是谁负责什么。">
          <p>
            每一项都同时写明当前关系和不能越过的边界。协议兼容只证明接入路径存在，不自动继承对方的全部产品行为。
          </p>
        </SectionHeading>
        <div className={styles.productList}>
          {comparisons.map((item) => (
            <article className={styles.productRow} key={item.product}>
              <div className={styles.productIdentity}>
                <span>{item.index}</span>
                <div>
                  <p>{item.category}</p>
                  <h2>{item.product}</h2>
                </div>
              </div>
              <div className={styles.productRelation}>
                <span data-tone={item.tone}>{item.relation}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
              <div className={styles.productBoundary}>
                <p>BOUNDARY</p>
                <span>{item.boundary}</span>
                <a href={item.source} rel="noreferrer" target="_blank">
                  官方来源 <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.decisionSection}>
        <div className={styles.decisionInner}>
          <SectionHeading index="03 / START FROM TODAY" title="从你已经运行的系统开始。">
            <p>迁移顺序应由当前系统的权威职责决定，而不是由一张功能打勾表决定。</p>
          </SectionHeading>
          <ol className={styles.decisionList}>
            {decisions.map(([title, detail], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.poleSection}>
        <div className={styles.poleInner}>
          <p>POLE OWNS THE CHANGE MODEL</p>
          <h2>入口可以保留，变化必须可解释。</h2>
          <div className={styles.poleFlow} aria-label="Pole 控制面职责">
            <div><span>01</span><strong>多协议接入</strong><p>保留熟悉的客户端入口</p></div>
            <div><span>02</span><strong>统一资源模型</strong><p>环境、服务、配置与治理</p></div>
            <div><span>03</span><strong>确定性发布</strong><p>草稿、版本、灰度与回滚</p></div>
            <div><span>04</span><strong>多运行时消费</strong><p>SDK、Proxy 与 Gateway</p></div>
          </div>
        </div>
      </section>

      <section className={interior.cta}>
        <div className={interior.ctaInner}>
          <div>
            <p className={interior.kicker}>VERIFY BEFORE YOU MIGRATE</p>
            <h2>先确认控制权，再设计迁移路径。</h2>
          </div>
          <div className={interior.ctaActions}>
            <Link className={`${interior.button} ${interior.buttonPrimary}`} href="/docs/what-is/comparison">
              阅读完整技术对比 <span aria-hidden="true">→</span>
            </Link>
            <Link className={`${interior.button} ${interior.buttonSecondary}`} href="/architecture">
              查看 Pole 架构 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <InteriorFooter />
    </main>
  );
}
