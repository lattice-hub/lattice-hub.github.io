import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ComponentCollaborationDiagram,
  GovernanceExecutionDiagram,
} from '@/components/site/ArchitectureDiagrams';
import {
  InteriorFooter,
  InteriorHero,
  SectionHeading,
} from '@/components/site/InteriorPage';
import { SiteHeader } from '@/components/site/SiteHeader';
import styles from './ArchitecturePage.module.css';

export const metadata: Metadata = {
  title: {
    absolute: '组件架构｜Lattice.Hub',
  },
  description:
    '了解 Lattice.Hub 的 Control Plane、Console、Kubernetes Controller、Rust SDK、Pingora Sidecar、Limiter Server 与 Specification 如何协作，以及治理能力如何进入运行时执行。',
};

const components = [
  {
    index: '01',
    name: 'Control Plane',
    role: '核心控制面',
    detail: '统一服务发现、配置、治理、权限、能力目录与多协议入口，对外提供管理与运行时视图。',
    href: '/docs/components/control-plane',
  },
  {
    index: '02',
    name: 'Console',
    role: '管理入口',
    detail: '让平台团队查看资源、审阅变化和执行发布操作；它负责管理，不进入业务流量。',
    href: '/docs/components/console',
  },
  {
    index: '03',
    name: 'Kubernetes Controller',
    role: '集群集成',
    detail: '同步 Service、Endpoints、Namespace 与 ConfigMap，并按配置注入 Sidecar、Java Agent 或 Envoy。',
    href: '/docs/components/kubernetes-controller',
  },
  {
    index: '04',
    name: 'Rust SDK',
    role: 'Proxyless 客户端',
    detail: '为 Rust 应用提供轻量的 Proxyless 接入形态，并复用组织的开放协议契约。',
    href: '/docs/components/rust-sdk',
  },
  {
    index: '05',
    name: 'Pingora Sidecar',
    role: '本地数据面',
    detail: '当前是支持 HTTP、HTTP/2、gRPC-h2c 转发、前缀路由与轮询的轻量数据面骨架。',
    href: '/docs/components/pingora-sidecar',
  },
  {
    index: '06',
    name: 'Limiter Server',
    role: '分布式限流运行时',
    detail: '缓存并分配全局 Token，承接客户端配额获取与上报，是治理能力的专用运行时组件。',
    href: 'https://github.com/lattice-hub/pole-limiter-server',
  },
  {
    index: '07',
    name: 'Specification',
    role: '共享契约',
    detail: '定义服务管理、流量治理、容错、访问控制与 MCP 协议，并提供多语言生成入口。',
    href: '/docs/components/specification',
  },
] as const;

const responsibilityRows = [
  ['管理面', 'Console · Pole Agent', '准备、审阅和决定变化；不执行真实服务请求。'],
  ['控制面', 'Lattice.Hub · Controller', '管理统一资源视图，并连接 Kubernetes 等外部运行环境。'],
  ['执行面', 'Rust SDK · Limiter Server · Envoy / Gateway', '在各自已支持的协议和能力范围内影响服务调用。'],
  ['扩展数据面', 'Pingora Sidecar', '当前提供代理骨架；动态治理接入与更多执行能力按实现进度演进。'],
] as const;

export default function ArchitecturePage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <InteriorHero
        accent="围绕同一份治理语义协作。"
        eyebrow="ORGANIZATION ARCHITECTURE"
        items={[
          { index: '01', title: 'COMPONENTS', detail: '组件职责与协作关系' },
          { index: '02', title: 'EXECUTION', detail: '治理能力如何生效' },
          { index: '03', title: 'BOUNDARY', detail: '管理、控制与执行边界' },
        ]}
        lede="这里不展开 Control Plane 的内部存储、缓存或事件实现，只回答三个官网访客真正关心的问题：有哪些组件、它们如何连接、治理规则最终在哪里执行。"
        primary={{ href: '/components', label: '浏览全部组件' }}
        secondary={{ href: '/docs/principles/architecture', label: '阅读技术原理' }}
        title="多个组件，"
      />

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <SectionHeading index="01 / COMPONENT MAP" title="组件各司其职，控制面保持统一。">
            <p>
              Console 与 Controller 从管理和集群侧接入；SDK、Limiter Server 与代理数据面从运行时侧接入；
              Specification 让各组件共享稳定契约。
            </p>
          </SectionHeading>
          <div className={styles.diagramCard}>
            <ComponentCollaborationDiagram large />
          </div>
          <p className={styles.diagramNote}>
            图中的实线表示当前明确的管理或协议路径，虚线表示同步、注入或仍按组件实现范围演进的接入边界。
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.componentSection}`}>
        <div className={styles.sectionInner}>
          <SectionHeading index="02 / COMPONENT RESPONSIBILITIES" title="先看组件职责，再看内部实现。">
            <p>
              每个组件只承诺自己已经承担的角色。Pole Agent 属于 Console 工作模式，Observability 属于平台集成能力，
              它们不被包装成独立部署组件。
            </p>
          </SectionHeading>
          <div className={styles.componentGrid}>
            {components.map((component) => (
              <Link className={styles.componentCard} href={component.href} key={component.name}>
                <span>{component.index}</span>
                <small>{component.role}</small>
                <h3>{component.name}</h3>
                <p>{component.detail}</p>
                <strong>
                  了解组件
                  <span aria-hidden="true">→</span>
                </strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.executionSection}`}>
        <div className={styles.sectionInner}>
          <SectionHeading index="03 / GOVERNANCE EXECUTION" title="规则在控制面发布，在离流量最近的组件执行。">
            <p>
              平台工程师通过 Console 或 API 确认作用域并发布规则。Control Plane
              将可消费治理视图交给对应运行时；SDK、专用运行时或代理数据面只执行自身当前支持的能力。
            </p>
          </SectionHeading>
          <div className={styles.diagramCard}>
            <GovernanceExecutionDiagram large />
          </div>
          <div className={styles.executionNotes}>
            <article>
              <span>01 / DEFINE</span>
              <h3>管理面决定变化</h3>
              <p>调用方、被调方、规则内容与发布时间由平台工程师审阅，Console 只是操作入口。</p>
            </article>
            <article>
              <span>02 / DISTRIBUTE</span>
              <h3>控制面交付视图</h3>
              <p>控制面提供已发布、可消费的治理视图，但不进入每一次业务请求的同步热路径。</p>
            </article>
            <article>
              <span>03 / ENFORCE</span>
              <h3>运行时执行规则</h3>
              <p>路由、保护、鉴权与测试能力由 SDK 或代理数据面按协议与当前实现范围执行。</p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.boundarySection}`}>
        <div className={styles.sectionInner}>
          <SectionHeading index="04 / RESPONSIBILITY BOUNDARY" title="谁管理、谁分发、谁执行，不能混为一谈。">
            <p>
              这条边界让官网描述保持诚实：协议兼容不等于所有运行时已经完整覆盖全部治理规则，
              组件路线图也不会被写成当前能力。
            </p>
          </SectionHeading>
          <div className={styles.responsibilityTable}>
            <div className={styles.tableHead}>
              <span>层级</span>
              <span>组件</span>
              <span>职责</span>
            </div>
            {responsibilityRows.map(([layer, names, detail]) => (
              <div className={styles.tableRow} key={layer}>
                <strong>{layer}</strong>
                <span>{names}</span>
                <p>{detail}</p>
              </div>
            ))}
          </div>
          <div className={styles.actions}>
            <Link href="/components">
              进入组件目录
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/docs/principles/governance-release">
              阅读治理发布原理
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <InteriorFooter />
    </main>
  );
}
