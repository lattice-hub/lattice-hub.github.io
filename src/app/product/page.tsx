import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  InteriorFooter,
  InteriorHero,
  SectionHeading,
} from '@/components/site/InteriorPage';
import styles from '@/components/site/InteriorPage.module.css';
import { SiteHeader } from '@/components/site/SiteHeader';
import { productTopics } from '@/lib/site-content';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: {
    absolute: '产品｜Lattice.Hub 服务治理控制面',
  },
  description:
    '了解 Lattice.Hub 如何统一运行环境、服务发现、配置、治理、身份与 AI 能力目录，并通过版本化发布让配置与治理变化可解释、可发布、可回退。',
};

const releaseFlow = [
  ['01 / CONNECT', '接入', '保留 Polaris、Nacos、Apollo、Eureka 与 Envoy xDS v3 等已有客户端入口。'],
  ['02 / MODEL', '建模', '把服务、配置、治理、身份与能力目录放入明确的运行环境边界。'],
  ['03 / RELEASE', '发布', '配置与治理变化经过确认后形成发布版本，再通过灰度或全量流程进入运行态。'],
  ['04 / CONSUME', '消费', 'Thin SDK、Sidecar 与 Gateway 消费治理视图；Controller 同步资源并编排接入。'],
] as const;

const capabilities = [
  ['01 / ENVIRONMENT', '运行环境', 'Namespace 承载同一逻辑资源的开发、预发与生产实例，并隔离各自的发布状态。'],
  ['02 / DISCOVERY', '服务发现', '统一多协议注册、发现、心跳与实例视图，不要求客户端迁移到单一协议。'],
  ['03 / CONFIG', '配置中心', '以编辑、版本、发布与回滚区分“正在改什么”和“运行时正在使用什么”。'],
  ['04 / GOVERNANCE', '服务治理', '九类治理规则共享作用域、版本与发布语义，避免不同策略各自为政。'],
  ['05 / IDENTITY', '身份与权限', '分别处理管理面资源授权与数据面服务身份，明确“谁能改”和“谁在调用”。'],
  ['06 / REGISTRY', 'AI 能力目录', 'MCP 与 A2A Registry 登记工具、Agent Card、技能和能力元数据，负责注册与发现。'],
] as const;

const protocols = [
  ['01', 'Polaris', 'gRPC / REST'],
  ['02', 'Nacos', 'v1 / v2'],
  ['03', 'Apollo', '配置协议'],
  ['04', 'Eureka', '注册发现'],
  ['05', 'Envoy', 'xDS v3'],
] as const;

const runtimes = [
  ['01', 'Thin SDK', '应用内直接读取治理视图'],
  ['02', 'Local Proxy / Sidecar', '在本地代理层执行治理'],
  ['03', 'Proxy Mesh / Gateway', '在集中或网格数据面消费策略'],
  ['04', 'Kubernetes Controller', '连接集群资源与控制面模型'],
] as const;

const boundaries = [
  ['01', '兼容，不强制替换', '控制面兼容既有协议入口；它不是要求所有应用一次性迁移的新客户端。'],
  ['02', '观测，不冒充 APM', 'Console 展示控制面自身指标与状态；它不是独立的全链路可观测平台。'],
  ['03', '目录，不承担执行', 'MCP 与 A2A Registry 负责能力登记和发现，不承担 Agent 任务或运行时托管。'],
  ['04', '变更，不跳过发布', '配置与治理的保存，以及 Agent 配置提案写入草稿，都不等于进入运行态。'],
] as const;

export default function ProductPage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <InteriorHero
        accent="统一服务变化的入口。"
        eyebrow="POLE CONTROL PLANE"
        items={[
          { index: '01', title: 'MODEL', detail: '运行环境与资源模型' },
          { index: '02', title: 'RELEASE', detail: '版本化发布语义' },
          { index: '03', title: 'RUNTIME', detail: '多形态运行时视图' },
        ]}
        lede="Lattice.Hub 将运行环境、服务发现、配置、治理、身份与 AI 能力目录收进同一个控制面。现有客户端继续使用熟悉的协议；需要发布的配置与治理变化，则进入可解释、可发布、可回退的版本链。"
        primary={{ href: '/docs', label: '阅读产品文档' }}
        secondary={{ href: '/docs/principles/architecture', label: '查看系统架构' }}
        title="一个控制面，"
      />

      <section className={styles.section}>
        <SectionHeading index="01 / PRODUCT EVIDENCE" title="控制面的状态，应该真实可见。">
          <p>
            Console 将组件、接口指标与延迟分布放进同一工作视图，帮助操作者判断控制面自身是否健康。
            以下为当前产品真实界面，不使用概念图替代已实现能力。
          </p>
        </SectionHeading>
        <div className={styles.productFrame}>
          <Image
            alt="Lattice.Hub Console 平台监控真实界面"
            height={1000}
            priority
            sizes="(max-width: 720px) 100vw, 1180px"
            src={`${basePath}/product/console-platform-metrics.webp`}
            width={1600}
          />
        </div>
        <div className={styles.imageCaption}>
          <span>Console · Platform Metrics</span>
          <span>产品界面用于证明能力存在，不将本地测试数据描述为线上运行指标。</span>
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.darkInner}>
          <SectionHeading index="02 / HOW IT WORKS" title="不改变客户端习惯，改变背后的控制方式。">
            <p>从接入到运行时消费，每一步都有独立职责；协议兼容、领域建模与发布语义不会混成一个黑盒。</p>
          </SectionHeading>
          <div className={styles.darkRows}>
            {releaseFlow.map(([index, title, detail]) => (
              <article key={index}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index="03 / CAPABILITY MAP" title="六类资源，一套控制面语言。">
          <p>
            能力边界各自清晰，并共享运行环境与身份上下文；配置和治理进一步共享版本化发布语义。
            操作者因此能从一次变化追溯到它的作用域和运行状态。
          </p>
        </SectionHeading>
        <div className={styles.cardGrid}>
          {capabilities.map(([index, title, detail]) => (
            <article className={styles.card} key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index="04 / PRODUCT TOPICS" title="进入控制面的两个关键工作面。">
          <p>产品页说明整体模型；专题页继续展开治理发布与智能变更的具体边界。</p>
        </SectionHeading>
        <div className={styles.twoColumnCards}>
          {productTopics.map((topic, index) => (
            <Link className={`${styles.viewCard} ${styles.topicCard}`} href={topic.href} key={topic.href}>
              <span>
                {String(index + 1).padStart(2, '0')} / {topic.labelEn}
              </span>
              <h3>{topic.label}</h3>
              <p>{topic.summary}</p>
              <strong>
                {topic.label === '服务治理' ? '深入服务治理' : '了解 Pole Agent'}
                <span aria-hidden="true">→</span>
              </strong>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <div className={styles.splitCopy}>
            <p className={styles.sectionIndex}>05 / GOVERNANCE</p>
            <h2>先确认作用域，再讨论规则。</h2>
            <p>
              调用方、被调方、规则内容与版本历史共同构成一条完整治理记录。管理面所见的编辑内容，
              与运行时正在消费的发布版本始终分离。
            </p>
            <p className={styles.note}>治理不是控制面中的附加表单，而是有明确作用域与发布生命周期的一等资源。</p>
            <div className={styles.actions}>
              <Link className={`${styles.button} ${styles.buttonPrimary}`} href="/governance">
                深入服务治理
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.productFrame}>
              <Image
                alt="Lattice.Hub Console 治理规则详情真实界面"
                height={520}
                sizes="(max-width: 1000px) 100vw, 58vw"
                src={`${basePath}/product/console-governance-scope.webp`}
                width={1340}
              />
            </div>
            <div className={styles.imageCaption}>
              <span>Console · Governance Scope</span>
              <span>服务调用范围、策略与子规则在同一上下文中确认。</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index="06 / ACCESS & RUNTIME" title="入口可以不同，运行视图必须确定。">
          <p>
            服务端兼容多类既有协议，运行时则按部署形态选择合适的消费方式。控制面统一模型，不强制统一所有技术栈。
          </p>
        </SectionHeading>
        <div className={styles.dualGrid}>
          <div>
            <p className={styles.columnLabel}>PROTOCOL ACCESS</p>
            <div className={styles.matrix}>
              {protocols.map(([index, name, detail]) => (
                <div className={styles.matrixRow} key={name}>
                  <span>{index}</span>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className={styles.columnLabel}>RUNTIME CONSUMERS</p>
            <div className={styles.matrix}>
              {runtimes.map(([index, name, detail]) => (
                <div className={styles.matrixRow} key={name}>
                  <span>{index}</span>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index="07 / CLEAR BOUNDARIES" title="产品边界，也是可信度的一部分。">
          <p>我们只描述当前控制面真正承担的职责，不把相邻系统能力包装成已经实现的承诺。</p>
        </SectionHeading>
        <div className={styles.rows}>
          {boundaries.map(([index, title, detail]) => (
            <article className={styles.row} key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div>
            <p className={styles.kicker}>START WITH THE MODEL</p>
            <h2>从一份确定的控制面视图开始。</h2>
          </div>
          <div className={styles.ctaActions}>
            <Link className={`${styles.button} ${styles.buttonPrimary}`} href="/docs">
              阅读文档
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              className={`${styles.button} ${styles.buttonSecondary}`}
              href="https://github.com/lattice-hub/pole-control-plane"
            >
              查看源码
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <InteriorFooter />
    </main>
  );
}
