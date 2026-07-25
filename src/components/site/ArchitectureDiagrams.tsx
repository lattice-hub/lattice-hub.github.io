import type { CSSProperties, ReactNode } from 'react';
import styles from './ArchitectureDiagrams.module.css';

type DiagramKind = 'collaboration' | 'governance';
type NodeTone = 'paper' | 'blue' | 'dark' | 'external';
type FlowTone = 'governance' | 'traffic';

function FlowPath({
  d,
  delay,
  markerId,
  duration = 1.05,
  muted = false,
  tone = 'governance',
}: {
  d: string;
  delay: number;
  markerId: string;
  duration?: number;
  muted?: boolean;
  tone?: FlowTone;
}) {
  const timing = {
    '--path-delay': `${delay}s`,
    '--path-duration': `${duration}s`,
  } as CSSProperties;

  return (
    <>
      <path
        className={`${styles.connection} ${tone === 'traffic' ? styles.connectionTraffic : ''} ${muted ? styles.connectionMuted : ''}`}
        d={d}
        markerEnd={
          muted
            ? `url(#${markerId}-muted)`
            : tone === 'traffic'
              ? `url(#${markerId}-traffic)`
              : undefined
        }
        pathLength="1"
      />
      {!muted ? (
        <>
          <path
            className={`${styles.connectionActive} ${tone === 'traffic' ? styles.connectionActiveTraffic : ''}`}
            d={d}
            markerEnd={`url(#${markerId}-${tone === 'traffic' ? 'traffic-active' : 'active'})`}
            pathLength="1"
            style={timing}
          />
          <path
            className={`${styles.dataPacket} ${tone === 'traffic' ? styles.dataPacketTraffic : ''}`}
            d={d}
            pathLength="1"
            style={timing}
          />
        </>
      ) : null}
    </>
  );
}

function DiagramDefs({ id, compact = false }: { id: string; compact?: boolean }) {
  return (
    <defs>
      <pattern
        height={compact ? 22 : 30}
        id={`${id}-grid`}
        patternUnits="userSpaceOnUse"
        width={compact ? 22 : 30}
      >
        <circle className={styles.gridDot} cx="1" cy="1" r="1" />
      </pattern>
      <marker
        id={`${id}-active`}
        markerHeight="7"
        markerWidth="9"
        orient="auto"
        refX="8"
        refY="3.5"
        viewBox="0 0 9 7"
      >
        <path className={styles.activeArrow} d="M0 0 L9 3.5 L0 7 Z" />
      </marker>
      <marker
        id={`${id}-muted`}
        markerHeight="7"
        markerWidth="9"
        orient="auto"
        refX="8"
        refY="3.5"
        viewBox="0 0 9 7"
      >
        <path className={styles.mutedArrow} d="M0 0 L9 3.5 L0 7 Z" />
      </marker>
      <marker
        id={`${id}-traffic`}
        markerHeight="7"
        markerWidth="9"
        orient="auto"
        refX="8"
        refY="3.5"
        viewBox="0 0 9 7"
      >
        <path className={styles.trafficArrow} d="M0 0 L9 3.5 L0 7 Z" />
      </marker>
      <marker
        id={`${id}-traffic-active`}
        markerHeight="7"
        markerWidth="9"
        orient="auto"
        refX="8"
        refY="3.5"
        viewBox="0 0 9 7"
      >
        <path className={styles.trafficActiveArrow} d="M0 0 L9 3.5 L0 7 Z" />
      </marker>
    </defs>
  );
}

function PanoramaPlane({
  x,
  y,
  width,
  height,
  index,
  label,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  index: string;
  label: string;
}) {
  return (
    <g className={styles.panoramaPlane}>
      <rect className={styles.planeDepth} height={height} rx="20" width={width} x={x} y={y + 9} />
      <rect className={styles.planeTop} height={height} rx="20" width={width} x={x} y={y} />
      <text className={styles.planeIndex} x={x + 18} y={y + 27}>{index}</text>
      <text className={styles.planeLabel} x={x + 48} y={y + 27}>{label}</text>
    </g>
  );
}

function PlatformNode({
  x,
  y,
  label,
  mark,
  meta,
  width = 92,
  depth = 10,
  delay = 0,
  tone = 'paper',
}: {
  x: number;
  y: number;
  label: string;
  mark: string;
  meta?: string;
  width?: number;
  depth?: number;
  delay?: number;
  tone?: NodeTone;
}) {
  const radiusX = width / 2;
  const radiusY = Math.max(13, Math.round(width * 0.15));
  const timing = { '--node-delay': `${delay}s` } as CSSProperties;
  const labelY = radiusY + depth + 25;

  return (
    <g
      className={`${styles.platformNode} ${styles[`tone${tone}`]}`}
      transform={`translate(${x} ${y})`}
    >
      <g className={styles.nodeLift} style={timing}>
        <path
          className={styles.nodeBody}
          d={`M ${-radiusX} 0 A ${radiusX} ${radiusY} 0 0 0 ${radiusX} 0 L ${radiusX} ${depth} A ${radiusX} ${radiusY} 0 0 1 ${-radiusX} ${depth} Z`}
        />
        <ellipse className={styles.nodeTop} cx="0" cy="0" rx={radiusX} ry={radiusY} />
        <path
          className={styles.nodeRim}
          d={`M ${-radiusX + 9} 0 A ${radiusX - 9} ${Math.max(7, radiusY - 5)} 0 0 0 ${radiusX - 9} 0`}
        />
        <text className={styles.nodeMark} textAnchor="middle" y="5">{mark}</text>
      </g>
      <text className={styles.nodeLabel} textAnchor="middle" y={labelY}>{label}</text>
      {meta ? <text className={styles.nodeMeta} textAnchor="middle" y={labelY + 17}>{meta}</text> : null}
    </g>
  );
}

function ControlPlane({
  x,
  y,
  width = 190,
  depth = 24,
  delay = 1.25,
  compact = false,
}: {
  x: number;
  y: number;
  width?: number;
  depth?: number;
  delay?: number;
  compact?: boolean;
}) {
  const radiusX = width / 2;
  const radiusY = Math.round(width * 0.24);
  const timing = { '--node-delay': `${delay}s` } as CSSProperties;

  return (
    <g className={styles.controlPlane} transform={`translate(${x} ${y})`}>
      <g className={styles.coreLift} style={timing}>
        <path
          className={styles.coreBody}
          d={`M ${-radiusX} 0 A ${radiusX} ${radiusY} 0 0 0 ${radiusX} 0 L ${radiusX} ${depth} A ${radiusX} ${radiusY} 0 0 1 ${-radiusX} ${depth} Z`}
        />
        <ellipse className={styles.coreTop} cx="0" cy="0" rx={radiusX} ry={radiusY} />
        <ellipse
          className={styles.coreInset}
          cx="0"
          cy="0"
          rx={radiusX - (compact ? 18 : 27)}
          ry={radiusY - (compact ? 9 : 14)}
        />
      </g>
      <text className={styles.coreEyebrow} textAnchor="middle" y={compact ? -5 : -8}>LATTICE.HUB</text>
      <text className={styles.coreTitle} textAnchor="middle" y={compact ? 11 : 13}>Control Plane</text>
    </g>
  );
}

function ContractBand({
  x,
  y,
  width,
  label,
  meta,
  dark = false,
}: {
  x: number;
  y: number;
  width: number;
  label: string;
  meta: string;
  dark?: boolean;
}) {
  return (
    <g className={`${styles.contractBand} ${dark ? styles.contractBandDark : ''}`}>
      <rect className={styles.contractDepth} height="48" rx="14" width={width} x={x} y={y + 8} />
      <rect className={styles.contractTop} height="48" rx="14" width={width} x={x} y={y} />
      <text className={styles.contractLabel} textAnchor="middle" x={x + width / 2} y={y + 21}>{label}</text>
      <text className={styles.contractMeta} textAnchor="middle" x={x + width / 2} y={y + 36}>{meta}</text>
    </g>
  );
}

function DiagramFrame({
  kind,
  label,
  large,
  desktop,
  mobile,
}: {
  kind: DiagramKind;
  label: string;
  large: boolean;
  desktop: ReactNode;
  mobile: ReactNode;
}) {
  return (
    <div
      aria-label={label}
      className={`${styles.diagramFrame} ${large ? styles.staticDiagram : styles.animatedDiagram}`}
      data-diagram={kind}
      role="img"
    >
      {desktop}
      {mobile}
      {kind === 'governance' ? (
        <span className={styles.legend} aria-hidden="true">
          <i className={styles.legendGovernance} />
          治理视图
          <i className={styles.legendTraffic} />
          服务调用
          <i className={styles.legendMuted} />
          演进接入
        </span>
      ) : (
        <span className={styles.legend} aria-hidden="true">
          <i className={styles.legendGovernance} />
          当前协作
          <i className={styles.legendMuted} />
          契约 / 可选 / 演进接入
        </span>
      )}
    </div>
  );
}

function ComponentCollaborationDesktop() {
  const markerId = 'panorama-collaboration-desktop';

  return (
    <svg
      aria-hidden="true"
      className={`${styles.diagram} ${styles.desktopDiagram}`}
      data-diagram-viewport="desktop"
      viewBox="0 0 1200 620"
    >
      <DiagramDefs id={markerId} />
      <rect className={styles.diagramBackground} height="620" width="1200" />
      <rect fill={`url(#${markerId}-grid)`} height="620" width="1200" />

      <PanoramaPlane height={300} index="01" label="MANAGEMENT & CLUSTER" width={260} x={34} y={150} />
      <PanoramaPlane height={390} index="02" label="UNIFIED CONTROL PLANE" width={350} x={324} y={100} />
      <PanoramaPlane height={420} index="03" label="RUNTIME & INTEGRATION" width={452} x={712} y={70} />

      <FlowPath d="M 183 230 L 320 230 L 405 278" delay={0.1} markerId={markerId} />
      <FlowPath d="M 183 365 L 320 365 L 405 326" delay={0.5} markerId={markerId} />
      <FlowPath d="M 595 282 L 705 282 L 760 180" delay={1.5} markerId={markerId} />
      <FlowPath d="M 595 298 L 850 298 L 982 200" delay={1.9} markerId={markerId} />
      <FlowPath d="M 595 316 L 705 316 L 760 350" delay={0} markerId={markerId} muted />
      <FlowPath d="M 595 344 L 700 435 L 925 435 L 982 397" delay={2.3} markerId={markerId} />

      <PlatformNode delay={0.05} label="Console" mark="C" meta="MANAGE · REVIEW" width={96} x={135} y={230} />
      <PlatformNode delay={0.45} label="K8s Controller" mark="K8S" meta="RESOURCE SYNC" width={104} x={135} y={365} />
      <ControlPlane x={500} y={305} />
      <PlatformNode delay={1.45} label="Rust SDK" mark="SDK" meta="PROXYLESS" tone="blue" width={96} x={808} y={180} />
      <PlatformNode delay={1.85} label="Envoy / Gateway" mark="xDS" meta="EXTERNAL RUNTIME" tone="external" width={108} x={1038} y={200} />
      <PlatformNode delay={2.05} label="Pingora Sidecar" mark="P" meta="EXTENSION PATH" width={106} x={808} y={350} />
      <PlatformNode delay={2.25} label="Limiter Server" mark="L" meta="DISTRIBUTED LIMITING" tone="dark" width={104} x={1038} y={385} />

      <ContractBand label="SPECIFICATION" meta="SHARED CONTRACT ACROSS COMPONENTS" width={510} x={345} y={535} />

      <text className={styles.flowLabel} x="230" y="211">MANAGE</text>
      <text className={styles.flowLabel} x="620" y="264">DISTRIBUTE</text>
      <text className={styles.flowLabel} x="879" y="316">EXECUTE</text>
    </svg>
  );
}

function ComponentCollaborationMobile() {
  const markerId = 'panorama-collaboration-mobile';

  return (
    <svg
      aria-hidden="true"
      className={`${styles.diagram} ${styles.mobileDiagram}`}
      data-diagram-viewport="mobile"
      viewBox="0 0 360 780"
    >
      <DiagramDefs compact id={markerId} />
      <rect className={styles.diagramBackground} height="780" width="360" />
      <rect fill={`url(#${markerId}-grid)`} height="780" width="360" />

      <PanoramaPlane height={165} index="01" label="MANAGEMENT" width={336} x={12} y={35} />
      <PanoramaPlane height={170} index="02" label="CONTROL PLANE" width={336} x={12} y={225} />
      <PanoramaPlane height={250} index="03" label="RUNTIME" width={336} x={12} y={420} />

      <FlowPath d="M 90 105 L 180 105 L 180 270" delay={0.1} markerId={markerId} />
      <FlowPath d="M 270 145 L 220 145 L 220 275" delay={0.45} markerId={markerId} />
      <FlowPath d="M 180 352 L 180 445 L 90 470" delay={1.4} markerId={markerId} />
      <FlowPath d="M 200 352 L 200 480 L 270 505" delay={0} markerId={markerId} muted />
      <FlowPath d="M 165 352 L 165 555 L 90 590" delay={1.85} markerId={markerId} />
      <FlowPath d="M 205 352 L 205 585 L 270 625" delay={2.2} markerId={markerId} />

      <PlatformNode delay={0.05} label="Console" mark="C" meta="MANAGE" width={78} x={76} y={105} />
      <PlatformNode delay={0.4} label="Controller" mark="K8S" meta="SYNC" width={82} x={270} y={145} />
      <ControlPlane compact width={178} x={180} y={310} />
      <PlatformNode delay={1.35} label="Rust SDK" mark="SDK" meta="PROXYLESS" tone="blue" width={78} x={78} y={470} />
      <PlatformNode delay={1.7} label="Sidecar" mark="P" meta="EXTENSION" width={82} x={270} y={505} />
      <PlatformNode delay={1.9} label="Envoy / Gateway" mark="xDS" meta="EXTERNAL" tone="external" width={86} x={82} y={590} />
      <PlatformNode delay={2.15} label="Limiter" mark="L" meta="RUNTIME" tone="dark" width={78} x={270} y={625} />

      <ContractBand label="SPECIFICATION" meta="SHARED CONTRACT" width={270} x={45} y={705} />
    </svg>
  );
}

function GovernanceExecutionDesktop() {
  const markerId = 'panorama-governance-desktop';

  return (
    <svg
      aria-hidden="true"
      className={`${styles.diagram} ${styles.desktopDiagram}`}
      data-diagram-viewport="desktop"
      viewBox="0 0 1200 620"
    >
      <DiagramDefs id={markerId} />
      <rect className={styles.diagramBackground} height="620" width="1200" />
      <rect fill={`url(#${markerId}-grid)`} height="620" width="1200" />

      <PanoramaPlane height={330} index="01" label="MANAGEMENT & CONTROL" width={315} x={28} y={130} />
      <PanoramaPlane height={440} index="02" label="MULTI-LANGUAGE SERVICES · EXAMPLE" width={790} x={375} y={60} />

      <FlowPath d="M 142 225 L 208 225" delay={0.1} markerId={markerId} />
      <FlowPath d="M 260 245 L 300 245 L 300 350 L 275 350" delay={0.55} markerId={markerId} />
      <FlowPath d="M 275 350 L 350 350 L 350 118 L 1095 118" delay={1.15} markerId={markerId} />
      <FlowPath d="M 520 118 L 520 230" delay={1.55} markerId={markerId} />
      <FlowPath d="M 735 118 L 735 230" delay={1.85} markerId={markerId} />
      <FlowPath d="M 950 118 L 950 230" delay={2.15} markerId={markerId} />
      <FlowPath d="M 425 118 L 425 405 L 472 405" delay={2.45} markerId={markerId} />

      <FlowPath d="M 568 270 L 687 270" delay={2.8} markerId={markerId} tone="traffic" />
      <FlowPath d="M 783 270 L 902 270" delay={3.15} markerId={markerId} tone="traffic" />
      <FlowPath d="M 998 270 L 1085 270 L 1085 405 L 568 405" delay={3.5} markerId={markerId} tone="traffic" />

      <PlatformNode delay={0.05} label="Platform Engineer" mark="PE" meta="DEFINE · REVIEW" width={104} x={90} y={225} />
      <PlatformNode delay={0.45} label="Console / API" mark="API" meta="PUBLISH ONCE" tone="blue" width={104} x={255} y={225} />
      <ControlPlane compact width={176} x={185} y={350} />
      <PlatformNode delay={1.5} label="Order Service" mark="JAVA" meta="SDK / PROXY" tone="blue" width={96} x={520} y={270} />
      <PlatformNode delay={1.8} label="Inventory Service" mark="RUST" meta="RUST SDK" width={96} x={735} y={270} />
      <PlatformNode delay={2.1} label="Payment Service" mark="GO" meta="SIDECAR" width={96} x={950} y={270} />
      <PlatformNode delay={2.4} label="Risk Service" mark="PY" meta="ENVOY / xDS" tone="external" width={96} x={520} y={405} />

      <ContractBand
        dark
        label="PUBLISH ONCE · ENFORCE AT CONNECTED POINTS"
        meta="SUPPORTED ROUTE · PROTECT · ACCESS CAPABILITIES"
        width={590}
        x={420}
        y={530}
      />

      <text className={styles.flowLabel} x="160" y="206">DEFINE</text>
      <text className={styles.flowLabel} x="294" y="232">PUBLISH</text>
      <text className={styles.flowLabel} x="610" y="101">GOVERNANCE VIEW</text>
      <text className={`${styles.flowLabel} ${styles.flowLabelTraffic}`} x="610" y="252">SERVICE CALLS</text>
    </svg>
  );
}

function GovernanceExecutionMobile() {
  const markerId = 'panorama-governance-mobile';

  return (
    <svg
      aria-hidden="true"
      className={`${styles.diagram} ${styles.mobileDiagram}`}
      data-diagram-viewport="mobile"
      viewBox="0 0 360 960"
    >
      <DiagramDefs compact id={markerId} />
      <rect className={styles.diagramBackground} height="960" width="360" />
      <rect fill={`url(#${markerId}-grid)`} height="960" width="360" />

      <PanoramaPlane height={165} index="01" label="MANAGEMENT" width={336} x={12} y={35} />
      <PanoramaPlane height={170} index="02" label="CONTROL PLANE" width={336} x={12} y={225} />
      <PanoramaPlane height={420} index="03" label="MULTI-LANGUAGE SERVICES · EXAMPLE" width={336} x={12} y={420} />

      <FlowPath d="M 115 120 L 226 120" delay={0.1} markerId={markerId} />
      <FlowPath d="M 270 145 L 220 145 L 220 275" delay={0.5} markerId={markerId} />
      <FlowPath d="M 145 345 L 68 345 L 68 790" delay={1.1} markerId={markerId} />
      <FlowPath d="M 68 500 L 205 500" delay={1.45} markerId={markerId} />
      <FlowPath d="M 68 590 L 205 590" delay={1.75} markerId={markerId} />
      <FlowPath d="M 68 680 L 205 680" delay={2.05} markerId={markerId} />
      <FlowPath d="M 68 770 L 205 770" delay={2.35} markerId={markerId} />

      <FlowPath d="M 289 500 L 320 500 L 320 590 L 289 590" delay={2.75} markerId={markerId} tone="traffic" />
      <FlowPath d="M 289 590 L 320 590 L 320 680 L 289 680" delay={3.05} markerId={markerId} tone="traffic" />
      <FlowPath d="M 289 680 L 320 680 L 320 770 L 289 770" delay={3.35} markerId={markerId} tone="traffic" />

      <PlatformNode delay={0.05} label="Engineer" mark="PE" meta="DEFINE" width={78} x={76} y={120} />
      <PlatformNode delay={0.45} label="Console / API" mark="API" meta="PUBLISH ONCE" tone="blue" width={84} x={270} y={145} />
      <ControlPlane compact width={178} x={180} y={310} />
      <PlatformNode delay={1.4} label="Order Service" mark="JAVA" meta="SDK / PROXY" tone="blue" width={78} x={250} y={500} />
      <PlatformNode delay={1.7} label="Inventory Service" mark="RUST" meta="RUST SDK" width={78} x={250} y={590} />
      <PlatformNode delay={2} label="Payment Service" mark="GO" meta="SIDECAR" width={78} x={250} y={680} />
      <PlatformNode delay={2.3} label="Risk Service" mark="PY" meta="ENVOY / xDS" tone="external" width={78} x={250} y={770} />

      <ContractBand
        dark
        label="PUBLISH ONCE"
        meta="ENFORCE WHERE SUPPORTED"
        width={250}
        x={55}
        y={855}
      />

      <text className={styles.flowLabel} x="80" y="405">GOVERNANCE VIEW</text>
      <text className={`${styles.flowLabel} ${styles.flowLabelTraffic}`} x="321" y="636">CALL</text>
    </svg>
  );
}

export function ComponentCollaborationDiagram({ large = false }: { large?: boolean }) {
  return (
    <DiagramFrame
      desktop={<ComponentCollaborationDesktop />}
      kind="collaboration"
      label="Lattice.Hub 组织组件沉浸式全景协作图：Console 和 Kubernetes Controller 连接 Control Plane；Rust SDK、Limiter Server 与 Envoy 或 Gateway 使用当前已接入路径；Pingora Sidecar 以虚线表示演进接入；Specification 是共享契约底座。"
      large={large}
      mobile={<ComponentCollaborationMobile />}
    />
  );
}

export function GovernanceExecutionDiagram({ large = false }: { large?: boolean }) {
  return (
    <DiagramFrame
      desktop={<GovernanceExecutionDesktop />}
      kind="governance"
      label="治理能力沉浸式全景生效示意图：平台工程师通过 Console 或 API 一次发布规则，Lattice.Hub Control Plane 将治理视图分发至示例性的 Java、Rust、Go 和 Python 服务接入点；SDK、Sidecar 或 Envoy 在已接入且支持对应能力的执行点落实治理，业务调用使用独立路径表达。"
      large={large}
      mobile={<GovernanceExecutionMobile />}
    />
  );
}
