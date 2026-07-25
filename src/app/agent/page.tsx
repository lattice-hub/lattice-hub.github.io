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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: {
    absolute: 'Pole Agent｜由人把关的控制面变更助手',
  },
  description:
    '了解 Pole Agent 如何在登录用户权限内读取控制面上下文、生成已有配置更新提案，并在人工确认后仅保存草稿。',
};

const changeFlow = [
  ['01', '描述意图', '用户用自然语言说明要修改的已有配置与期望结果。'],
  ['02', '读取上下文', '在登录用户权限内读取 Namespace、MCP Registry 与配置文件。'],
  ['03', '形成提案', 'LLM 结合 Pole MCP 读取的上下文，由内部 proposal 工具与确认内核形成不可变提案。'],
  ['04', '检查差异', '把原始内容与提议内容并列呈现，让人判断变化是否正确。'],
  ['05', '确认草稿', '人工确认后，Agent 只把内容写入编辑态草稿。'],
  ['06', '进入发布', '后续发布、回滚与删除继续由确定性的产品流程承担。'],
] as const;

const safetyLayers = [
  ['01 / INTERACTION', 'Pole Agent', '组织对话、上下文与提案预览，让意图和差异可被人理解。'],
  ['02 / TOOL BOUNDARY', 'Pole MCP', '只暴露白名单工具与明确参数，不把任意内部能力直接交给模型。'],
  ['03 / CONFIRMATION', '确认内核', '校验登录身份、资源权限、提案内容与确认动作；提示词不是安全边界。'],
  ['04 / RELEASE', '产品发布链', '草稿之外的生效、灰度、回滚与删除仍进入确定性的人工流程。'],
] as const;

const roles = [
  ['01 / ASSISTANT', 'Pole Agent', '理解控制面上下文、准备变化、解释差异；不替操作者执行最终发布。'],
  ['02 / TOOL CATALOG', 'MCP Registry', '登记可被发现的 MCP Server、工具与能力元数据，不承担任意工具执行。'],
  ['03 / AGENT CATALOG', 'A2A Registry', '登记 Agent Card、技能与能力元数据，不承担 Agent 任务和运行时托管。'],
] as const;

const available = [
  '读取 Namespace、MCP Registry 与已有配置文件',
  'LLM 结合 Pole MCP 只读上下文，由内部 proposal 工具形成已有配置更新提案',
  '展示不可变提案与差异预览',
  '人工确认后保存编辑态草稿',
] as const;

const notCovered = [
  '自动发布、自动回滚或自动删除',
  '治理规则写入与新建配置文件',
  '任意控制面资源的通用写入',
  '流式输出与服务端会话持久化',
] as const;

export default function AgentPage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <InteriorHero
        accent="但不替你发布。"
        eyebrow="POLE AGENT / HUMAN-GATED CONTROL PLANE"
        items={[
          { index: '01', title: 'READ', detail: 'Namespace、配置与 MCP Registry' },
          { index: '02', title: 'PROPOSE', detail: '已有配置的更新提案' },
          { index: '03', title: 'WRITE', detail: '人工确认后的编辑态草稿' },
          { index: '04', title: 'RELEASE', detail: '始终回到确定性的人工流程' },
        ]}
        lede="Pole Agent 在登录用户权限内通过 Pole MCP 读取 Namespace、MCP Registry 与已有配置。LLM 结合这些上下文，由内部 proposal 工具与确认内核形成更新提案；人检查并确认后，它只保存编辑态草稿，真正的发布仍由人把关。"
        primary={{ href: '/docs/principles/ai-registry', label: '阅读 AI Registry 原理' }}
        secondary={{ href: '/docs/practices/agent-discovery', label: '了解能力目录发现' }}
        title="让 Agent 理解变更，"
      />

      <section className={styles.section}>
        <SectionHeading index="01 / REAL WORKBENCH" title="安全边界，应该在工作台里真实可见。">
          <p>
            Pole Agent 会展示当前资源范围、连接状态、记忆窗口与操作权限。运行配置不完整时，
            工作台保持不可执行状态，而不是让模型带着未知上下文继续尝试。
          </p>
        </SectionHeading>
        <div className={styles.productFrame}>
          <Image
            alt="Pole Agent 工作台真实界面，展示连接状态、操作权限与运行配置检查"
            height={1000}
            sizes="(max-width: 720px) 100vw, 1180px"
            src={`${basePath}/product/console-agent-readiness.webp`}
            width={1600}
          />
        </div>
        <div className={styles.imageCaption}>
          <span>Console · Pole Agent Readiness</span>
          <span>真实就绪检查状态：配置不完整时 fail closed；资源查询允许，生成变更需确认，直接发布禁止。</span>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index="02 / CONTROLLED CHANGE" title="一次可审阅的变化，而不是一句不可追溯的指令。">
          <p>
            Pole Agent 的价值不在于跳过控制面，而在于把自然语言意图翻译为可检查的差异，
            再把明确的人类确认交还给既有产品流程。
          </p>
        </SectionHeading>
        <div className={styles.rows}>
          {changeFlow.map(([index, title, detail]) => (
            <article className={styles.row} key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.darkInner}>
          <SectionHeading index="03 / SAFETY LAYERS" title="提示词负责表达，边界必须由系统执行。">
            <p>
              从工具白名单到确认内核，再到独立发布链，每一层都缩小 Agent 可做的事情，并让变化保留可审计的产品语义。
            </p>
          </SectionHeading>
          <div className={styles.darkRows}>
            {safetyLayers.map(([index, title, detail]) => (
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
        <SectionHeading index="04 / THREE ROLES" title="助手、工具目录与 Agent 目录，各自负责一件事。">
          <p>
            三个概念共同服务于 AI Native 控制面，但不能互相替代。把角色分清，才能避免把“可发现”误解为“可自动执行”。
          </p>
        </SectionHeading>
        <div className={styles.cardGrid}>
          {roles.map(([index, title, detail]) => (
            <article className={styles.card} key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index="05 / CURRENT BOUNDARY" title="今天能做什么，同样要说清还不能做什么。">
          <p>
            官网只描述当前已经形成的最小闭环。以下边界会随着产品演进更新，但不会用未来方向替代当前事实。
          </p>
        </SectionHeading>
        <div className={styles.twoColumnCards}>
          <article className={styles.viewCard}>
            <span>AVAILABLE TODAY</span>
            <h3>已形成闭环</h3>
            <ul className={styles.plainList}>
              {available.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className={styles.viewCard}>
            <span>NOT COVERED</span>
            <h3>当前不在范围内</h3>
            <ul className={styles.plainList}>
              {notCovered.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading index="06 / HUMAN RELEASE CHAIN" title="Agent 准备变更，人拥有发布决定。">
          <p>
            这不是对自动化能力的削弱，而是让 AI 进入生产控制面时仍然服从权限、版本、发布与回滚语义。
          </p>
        </SectionHeading>
        <div className={styles.releaseChain} aria-label="Pole Agent 人工发布链">
          {['自然语言意图', '不可变提案', '差异预览', '人工确认', '编辑态草稿', '确定性发布'].map(
            (item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
              </div>
            ),
          )}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div>
            <p className={styles.kicker}>HUMAN-GATED BY DESIGN</p>
            <h2>让 Agent 看懂控制面，让发布继续可控。</h2>
          </div>
          <div className={styles.ctaActions}>
            <Link className={`${styles.button} ${styles.buttonPrimary}`} href="/docs/principles/ai-registry">
              阅读设计原理
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
