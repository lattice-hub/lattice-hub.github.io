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
import { governanceDomains } from '@/lib/site-content';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: {
    absolute: '服务治理｜Lattice.Hub',
  },
  description:
    '了解 Lattice.Hub 九类服务治理规则如何通过作用域、版本、灰度发布与回滚形成确定的运行时策略。',
};

const releaseLifecycle = [
  ['01 / EDIT', '编辑', '调整规则内容并保存编辑态；这一步不会改变运行时视图。'],
  ['02 / RELEASE', '发布', '选择已确认内容形成发布版本，并明确灰度或全量范围。'],
  ['03 / ACTIVE', '生效', '只有处于生效状态的发布版本会进入运行时消费链路。'],
  ['04 / RECOVER', '恢复', '通过发布历史回到已知版本，不用重新拼凑过去的规则状态。'],
] as const;

const scopeRows = [
  ['01', '服务调用范围', '先定义调用方与被调方，防止规则脱离实际调用关系。'],
  ['02', '规则与子规则', '在同一策略上下文中查看匹配条件、动作和具体治理参数。'],
  ['03', '版本与发布历史', '追踪规则如何从编辑内容变为运行时版本，并保留恢复入口。'],
] as const;

const viewRows = [
  ['01', '管理视图', '面向创建、修改与审阅，展示当前规则内容、Revision 与待发布变化。'],
  ['02', '发布视图', '面向运行时消费，展示已经形成并处于相应发布状态的不可变版本。'],
] as const;

const runtimeRows = [
  ['01', 'Thin SDK', '应用进程内读取可支持的治理视图。'],
  ['02', 'Local Proxy / Sidecar', '按当前组件支持范围消费治理视图，并为更多策略保留执行扩展点。'],
  ['03', 'Proxy Mesh / Gateway', '在网格或网关数据面消费已发布规则。'],
  ['04', '协议客户端', '通过兼容协议获得相应能力，但不承诺每种运行时覆盖全部九类规则。'],
] as const;

export default function GovernancePage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <InteriorHero
        accent="一套确定的发布语义。"
        eyebrow="SERVICE GOVERNANCE"
        items={[
          { index: '01', title: 'SCOPE', detail: '调用关系先于策略内容' },
          { index: '02', title: 'VERSION', detail: '编辑 Revision 与发布版本分离' },
          { index: '03', title: 'ACTIVE', detail: '只有已发布视图进入运行时' },
        ]}
        lede={`路由、泳道、限流、熔断、故障探测、无损上下线、调用鉴权、流量镜像与流量 Mock，共享“规则 → 版本化发布 → 生效视图”的完整链路。`}
        primary={{ href: '/docs/principles/governance-release', label: '阅读治理发布原理' }}
        secondary={{ href: 'https://github.com/lattice-hub/pole-control-plane', label: '查看源码' }}
        title="九类规则，"
      />

      <section className={styles.section}>
        <div className={styles.split}>
          <div className={styles.splitCopy}>
            <p className={styles.sectionIndex}>01 / SCOPE BEFORE POLICY</p>
            <h2>先回答「作用于谁」，再回答「执行什么」。</h2>
            <p>
              治理详情把服务调用范围、规则内容与历史记录留在同一个工作上下文中。
              这让策略审阅从抽象参数检查，回到一条真实调用关系。
            </p>
            <div className={styles.rows}>
              {scopeRows.map(([index, title, detail]) => (
                <article className={styles.compactRow} key={index}>
                  <span>{index}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.productFrame}>
              <Image
                alt="Lattice.Hub Console 治理规则详情真实界面"
                height={520}
                priority
                sizes="(max-width: 1000px) 100vw, 58vw"
                src={`${basePath}/product/console-governance-scope.webp`}
                width={1340}
              />
            </div>
            <div className={styles.imageCaption}>
              <span>Console · Governance Rule Detail</span>
              <span>真实产品界面：调用方、被调方、规则粒度与子规则。</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index="02 / NINE DOMAINS" title="治理能力不靠散落的开关表达。">
          <p>
            九类规则使用一致的页面语言理解作用域、内容、版本与发布状态。下列三组是官网的信息组织方式，不代表底层额外的存储层级。
          </p>
        </SectionHeading>
        <div className={styles.cardGrid}>
          {governanceDomains.map((domain, index) => (
            <article className={styles.card} key={domain.id}>
              <span>
                {String(index + 1).padStart(2, '0')} / {domain.group}
              </span>
              <h3>{domain.name}</h3>
              <p>{domain.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index="03 / TWO VIEWS" title="编辑中的规则，与运行中的版本，不是同一件事。">
          <p>
            Revision 用于标识管理视图中的内容变化；发布版本用于标识一次确定的运行时交付。
            两者都重要，但不能被同一个“已保存”状态混淆。
          </p>
        </SectionHeading>
        <div className={styles.twoColumnCards}>
          {viewRows.map(([index, title, detail]) => (
            <article className={styles.viewCard} key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.darkInner}>
          <SectionHeading index="04 / RELEASE LIFECYCLE" title="保存不是生效，发布才是边界。">
            <p>
              发布链把人的判断变成确定的运行时版本，并为灰度、全量与恢复保留清晰记录。
            </p>
          </SectionHeading>
          <div className={styles.darkRows}>
            {releaseLifecycle.map(([index, title, detail]) => (
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
        <SectionHeading index="05 / RUNTIME LANDING" title="一份发布语义，落到多种运行时。">
          <p>
            控制面提供确定的治理视图，各运行时按自身支持范围消费并执行；这里不把“协议兼容”夸大为“能力完全等价”。
          </p>
        </SectionHeading>
        <div className={styles.rows}>
          {runtimeRows.map(([index, title, detail]) => (
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
            <p className={styles.kicker}>MAKE RELEASE EXPLICIT</p>
            <h2>让每一条运行中规则，都能回到它的发布记录。</h2>
          </div>
          <div className={styles.ctaActions}>
            <Link
              className={`${styles.button} ${styles.buttonPrimary}`}
              href="/docs/principles/governance-release"
            >
              阅读发布原理
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
