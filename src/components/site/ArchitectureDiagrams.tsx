import type { CSSProperties, ReactNode } from 'react';
import styles from './ArchitectureDiagrams.module.css';

type DiagramKind = 'collaboration' | 'governance';
type NodeTone = 'paper' | 'blue' | 'dark' | 'external';

function FlowPath({
  d,
  delay,
  markerId,
  duration = 1.05,
  muted = false,
}: {
  d: string;
  delay: number;
  markerId: string;
  duration?: number;
  muted?: boolean;
}) {
  const timing = {
    '--path-delay': `${delay}s`,
    '--path-duration': `${duration}s`,
  } as CSSProperties;

  return (
    <>
      <path
        className={`${styles.connection} ${muted ? styles.connectionMuted : ''}`}
        d={d}
        markerEnd={muted ? `url(#${markerId}-muted)` : undefined}
        pathLength="1"
      />
      {!muted ? (
        <>
          <path
            className={styles.connectionActive}
            d={d}
            markerEnd={`url(#${markerId}-active)`}
            pathLength="1"
            style={timing}
          />
          <path className={styles.dataPacket} d={d} pathLength="1" style={timing} />
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
      <span className={styles.legend} aria-hidden="true">
        <i />
        当前协作
        <i />
        契约 / 可选 / 演进接入
      </span>
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

      <PanoramaPlane height={300} index="01" label="MANAGEMENT" width={285} x={30} y={150} />
      <PanoramaPlane height={390} index="02" label="GOVERNANCE CONTROL" width={350} x={340} y={100} />
      <PanoramaPlane height={420} index="03" label="RUNTIME EXECUTION" width={440} x={720} y={70} />

      <FlowPath d="M 130 300 L 205 300" delay={0.1} markerId={markerId} />
      <FlowPath d="M 283 300 L 350 300 L 420 300" delay={0.55} markerId={markerId} />
      <FlowPath d="M 610 280 L 710 280 L 770 175" delay={1.5} markerId={markerId} />
      <FlowPath d="M 610 310 L 770 310" delay={0} markerId={markerId} muted />
      <FlowPath d="M 610 340 L 710 340 L 770 440" delay={2.15} markerId={markerId} />
      <FlowPath d="M 860 175 L 955 175 L 1015 282" delay={2.75} markerId={markerId} />
      <FlowPath d="M 860 310 L 1000 310" delay={0} markerId={markerId} muted />
      <FlowPath d="M 860 440 L 955 440 L 1015 338" delay={3.35} markerId={markerId} />

      <PlatformNode delay={0.05} label="Platform Engineer" mark="PE" meta="DEFINE · REVIEW" width={104} x={85} y={300} />
      <PlatformNode delay={0.5} label="Console / API" mark="API" meta="PUBLISH" tone="blue" width={104} x={255} y={300} />
      <ControlPlane x={515} y={305} />
      <PlatformNode delay={1.45} label="Rust SDK" mark="SDK" meta="IN-PROCESS" tone="blue" width={96} x={815} y={175} />
      <PlatformNode delay={1.8} label="Pingora Sidecar" mark="P" meta="EXTENSION PATH" width={106} x={815} y={310} />
      <PlatformNode delay={2.1} label="Envoy / Gateway" mark="xDS" meta="DATA PLANE" width={108} x={815} y={440} />
      <PlatformNode delay={2.7} label="SERVICE CALL" mark="→" meta="CALLER TO UPSTREAM" tone="dark" width={116} x={1065} y={310} />

      <ContractBand
        dark
        label="PUBLISHED HERE · ENFORCED THERE"
        meta="CONTROL PLANE DISTRIBUTES · RUNTIME EXECUTES"
        width={560}
        x={360}
        y={535}
      />

      <text className={styles.flowLabel} x="165" y="278">DEFINE</text>
      <text className={styles.flowLabel} x="325" y="278">PUBLISH</text>
      <text className={styles.flowLabel} x="640" y="262">DELIVER</text>
      <text className={styles.flowLabel} x="930" y="292">ENFORCE</text>
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
      viewBox="0 0 360 780"
    >
      <DiagramDefs compact id={markerId} />
      <rect className={styles.diagramBackground} height="780" width="360" />
      <rect fill={`url(#${markerId}-grid)`} height="780" width="360" />

      <PanoramaPlane height={165} index="01" label="MANAGEMENT" width={336} x={12} y={35} />
      <PanoramaPlane height={170} index="02" label="CONTROL PLANE" width={336} x={12} y={225} />
      <PanoramaPlane height={280} index="03" label="RUNTIME EXECUTION" width={336} x={12} y={420} />

      <FlowPath d="M 85 125 L 225 125" delay={0.1} markerId={markerId} />
      <FlowPath d="M 270 145 L 220 145 L 220 275" delay={0.5} markerId={markerId} />
      <FlowPath d="M 180 352 L 180 480 L 125 480" delay={1.4} markerId={markerId} />
      <FlowPath d="M 180 352 L 180 560 L 125 560" delay={0} markerId={markerId} muted />
      <FlowPath d="M 180 352 L 180 640 L 125 640" delay={1.95} markerId={markerId} />
      <FlowPath d="M 125 480 L 220 480 L 220 540 L 234 540" delay={2.55} markerId={markerId} />
      <FlowPath d="M 125 560 L 234 560" delay={0} markerId={markerId} muted />
      <FlowPath d="M 125 640 L 220 640 L 220 580 L 234 580" delay={3.1} markerId={markerId} />

      <PlatformNode delay={0.05} label="Engineer" mark="PE" meta="DEFINE" width={78} x={76} y={125} />
      <PlatformNode delay={0.45} label="Console / API" mark="API" meta="PUBLISH" tone="blue" width={84} x={270} y={145} />
      <ControlPlane compact width={178} x={180} y={310} />
      <PlatformNode delay={1.35} label="Rust SDK" mark="SDK" meta="IN-PROCESS" tone="blue" width={78} x={78} y={470} />
      <PlatformNode delay={1.7} label="Sidecar" mark="P" meta="EXTENSION" width={82} x={78} y={560} />
      <PlatformNode delay={1.9} label="Envoy / Gateway" mark="xDS" meta="DATA PLANE" width={86} x={82} y={640} />
      <PlatformNode delay={2.5} label="SERVICE CALL" mark="→" meta="REAL TRAFFIC" tone="dark" width={92} x={280} y={560} />

      <ContractBand
        dark
        label="PUBLISHED HERE"
        meta="ENFORCED THERE"
        width={270}
        x={45}
        y={710}
      />
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
      label="治理能力沉浸式全景生效图：平台工程师通过 Console 或 API 发布治理规则，Lattice.Hub Control Plane 向 Rust SDK、Pingora Sidecar 或 Envoy 与 Gateway 交付治理视图，由已接入执行组件在真实服务调用路径中按支持范围执行。"
      large={large}
      mobile={<GovernanceExecutionMobile />}
    />
  );
}
