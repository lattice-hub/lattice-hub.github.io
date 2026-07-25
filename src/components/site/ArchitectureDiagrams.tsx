import styles from './ArchitectureFlow.module.css';

function FlowArrow({
  d,
  markerPrefix,
  muted = false,
  delay = 0,
}: {
  d: string;
  markerPrefix: 'collaboration' | 'governance';
  muted?: boolean;
  delay?: number;
}) {
  return (
    <>
      <path
        className={`${styles.flowLine} ${muted ? styles.flowLineMuted : ''}`}
        d={d}
        markerEnd={
          muted
            ? `url(#arrow-muted-${markerPrefix})`
            : `url(#arrow-blue-${markerPrefix})`
        }
      />
      {!muted ? (
        <path
          className={styles.flowPulse}
          d={d}
          pathLength="1"
          style={{ animationDelay: `${delay}s` }}
        />
      ) : null}
    </>
  );
}

function Node({
  x,
  y,
  width,
  eyebrow,
  title,
  detail,
  tone = 'paper',
}: {
  x: number;
  y: number;
  width: number;
  eyebrow: string;
  title: string;
  detail: string;
  tone?: 'paper' | 'blue' | 'soft';
}) {
  return (
    <g className={`${styles.diagramNode} ${styles[`node${tone}`]}`}>
      <rect height="72" rx="10" width={width} x={x} y={y} />
      <text className={styles.nodeEyebrow} x={x + 15} y={y + 20}>
        {eyebrow}
      </text>
      <text className={styles.nodeTitle} x={x + 15} y={y + 42}>
        {title}
      </text>
      <text className={styles.nodeDetail} x={x + 15} y={y + 59}>
        {detail}
      </text>
    </g>
  );
}

function DiagramDefinitions({ suffix }: { suffix: string }) {
  return (
    <defs>
      <pattern height="24" id={`diagram-grid-${suffix}`} patternUnits="userSpaceOnUse" width="24">
        <circle className={styles.gridDot} cx="1" cy="1" r="1" />
      </pattern>
      <marker
        id={`arrow-blue-${suffix}`}
        markerHeight="7"
        markerWidth="8"
        orient="auto"
        refX="7"
        refY="3.5"
      >
        <path className={styles.arrowBlue} d="M0,0 L8,3.5 L0,7 Z" />
      </marker>
      <marker
        id={`arrow-muted-${suffix}`}
        markerHeight="7"
        markerWidth="8"
        orient="auto"
        refX="7"
        refY="3.5"
      >
        <path className={styles.arrowMuted} d="M0,0 L8,3.5 L0,7 Z" />
      </marker>
    </defs>
  );
}

export function ComponentCollaborationDiagram({ large = false }: { large?: boolean }) {
  return (
    <svg
      aria-label="Lattice.Hub 组织组件协作图：Console 和 Kubernetes Controller 连接控制面，控制面向 Thin SDK、Pingora Sidecar 与 Envoy 或 Gateway 提供能力，Specification 提供开放契约。"
      className={`${styles.diagram} ${large ? styles.diagramLarge : ''}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      viewBox="0 0 760 440"
    >
      <DiagramDefinitions suffix="collaboration" />
      <rect className={styles.diagramBackground} height="440" width="760" />
      <rect fill="url(#diagram-grid-collaboration)" height="440" width="760" />

      <rect className={styles.region} height="338" rx="14" width="196" x="546" y="35" />
      <text className={styles.regionLabel} x="562" y="58">RUNTIME EXECUTION</text>

      <FlowArrow d="M190 141 H232 V187 H270" delay={0} markerPrefix="collaboration" />
      <FlowArrow d="M190 294 H232 V251 H270" markerPrefix="collaboration" muted />
      <FlowArrow d="M490 177 H520 V109 H566" delay={0.6} markerPrefix="collaboration" />
      <FlowArrow d="M490 219 H566" markerPrefix="collaboration" muted />
      <FlowArrow d="M490 261 H520 V307 H566" delay={1.6} markerPrefix="collaboration" />
      <FlowArrow d="M380 360 V300" markerPrefix="collaboration" muted />

      <Node
        detail="操作与审阅"
        eyebrow="MANAGEMENT"
        title="Console"
        width={150}
        x={40}
        y={105}
      />
      <Node
        detail="同步与工作负载注入"
        eyebrow="KUBERNETES"
        title="Controller"
        tone="soft"
        width={150}
        x={40}
        y={258}
      />

      <g className={`${styles.controlNode} ${styles.diagramNode}`}>
        <rect height="150" rx="14" width="220" x="270" y="150" />
        <text className={styles.controlEyebrow} textAnchor="middle" x="380" y="180">
          LATTICE.HUB
        </text>
        <text className={styles.controlTitle} textAnchor="middle" x="380" y="215">
          Control Plane
        </text>
        <text className={styles.controlDetail} textAnchor="middle" x="380" y="241">
          统一服务、配置与治理视图
        </text>
        <g className={styles.controlChips}>
          <rect height="25" rx="12.5" width="62" x="309" y="257" />
          <rect height="25" rx="12.5" width="62" x="379" y="257" />
          <text textAnchor="middle" x="340" y="274">管理</text>
          <text textAnchor="middle" x="410" y="274">发布</text>
        </g>
      </g>

      <Node
        detail="应用进程内消费"
        eyebrow="PROXYLESS"
        title="Thin SDK"
        tone="soft"
        width={156}
        x={566}
        y={73}
      />
      <Node
        detail="数据面骨架 · 扩展接入"
        eyebrow="LOCAL PROXY"
        title="Pingora Sidecar"
        tone="soft"
        width={156}
        x={566}
        y={183}
      />
      <Node
        detail="xDS / 协议适配"
        eyebrow="PROXY MESH"
        title="Envoy / Gateway"
        tone="soft"
        width={156}
        x={566}
        y={271}
      />

      <g className={`${styles.specNode} ${styles.diagramNode}`}>
        <rect height="48" rx="9" width="220" x="270" y="360" />
        <text className={styles.nodeEyebrow} x="286" y="380">OPEN CONTRACT</text>
        <text className={styles.specTitle} x="286" y="398">Specification · shared across components</text>
      </g>

      <text className={styles.pathLabel} x="201" y="132">管理变化</text>
      <text className={styles.pathLabel} x="498" y="168">分发能力</text>
      <text className={styles.pathLabel} x="197" y="316">同步 / 注入</text>
    </svg>
  );
}

export function GovernanceExecutionDiagram({ large = false }: { large?: boolean }) {
  return (
    <svg
      aria-label="治理能力生效图：平台工程师通过 Console 或 API 发布治理规则，Lattice.Hub Control Plane 向 Thin SDK、Pingora Sidecar 或 Envoy 与 Gateway 提供已发布治理视图，由执行组件作用于真实服务调用。"
      className={`${styles.diagram} ${large ? styles.diagramLarge : ''}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      viewBox="0 0 760 440"
    >
      <DiagramDefinitions suffix="governance" />
      <rect className={styles.diagramBackground} height="440" width="760" />
      <rect fill="url(#diagram-grid-governance)" height="440" width="760" />

      <FlowArrow d="M173 83 H212" delay={0} markerPrefix="governance" />
      <FlowArrow d="M370 83 H408" delay={0.5} markerPrefix="governance" />
      <FlowArrow d="M514 119 V164 H124 V224" delay={1} markerPrefix="governance" />
      <FlowArrow d="M514 119 V164 H350 V224" markerPrefix="governance" muted />
      <FlowArrow d="M514 119 V164 H576 V224" delay={1.7} markerPrefix="governance" />
      <FlowArrow d="M124 296 V343" delay={2.2} markerPrefix="governance" />
      <FlowArrow d="M350 296 V343" delay={2.45} markerPrefix="governance" />
      <FlowArrow d="M576 296 V343" delay={2.7} markerPrefix="governance" />

      <Node
        detail="定义目标与决定发布"
        eyebrow="OPERATOR"
        title="平台工程师"
        width={143}
        x={30}
        y={47}
      />
      <Node
        detail="治理规则管理入口"
        eyebrow="MANAGEMENT"
        title="Console / API"
        width={158}
        x={212}
        y={47}
      />
      <Node
        detail="发布可消费治理视图"
        eyebrow="CONTROL PLANE"
        title="Lattice.Hub"
        tone="blue"
        width={188}
        x={408}
        y={47}
      />

      <text className={styles.pathLabel} textAnchor="middle" x="193" y="68">定义 / 审阅</text>
      <text className={styles.pathLabel} textAnchor="middle" x="389" y="68">发布请求</text>
      <text className={styles.railLabel} textAnchor="middle" x="380" y="187">
        已发布治理视图 · 按接入形态交付
      </text>

      <rect className={styles.executionRegion} height="104" rx="14" width="672" x="44" y="207" />
      <text className={styles.regionLabel} x="60" y="228">RUNTIME EXECUTION</text>

      <Node
        detail="应用进程内执行"
        eyebrow="SDK"
        title="Thin SDK"
        tone="soft"
        width={164}
        x={42}
        y={224}
      />
      <Node
        detail="按当前接入范围扩展"
        eyebrow="LOCAL PROXY"
        title="Pingora Sidecar"
        tone="soft"
        width={164}
        x={268}
        y={224}
      />
      <Node
        detail="代理或网格数据面"
        eyebrow="XDS / ADAPTER"
        title="Envoy / Gateway"
        tone="soft"
        width={164}
        x={494}
        y={224}
      />

      <g className={styles.serviceCall}>
        <rect height="60" rx="12" width="620" x="70" y="343" />
        <text textAnchor="middle" x="380" y="369">SERVICE CALL</text>
        <text className={styles.serviceDetail} textAnchor="middle" x="380" y="388">
          路由 · 保护 · 鉴权 · 测试进入真实调用路径
        </text>
      </g>
    </svg>
  );
}
