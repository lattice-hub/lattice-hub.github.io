import type { CSSProperties, ReactNode } from 'react';
import styles from './ArchitectureDiagrams.module.css';

type DiagramKind = 'collaboration' | 'governance';
type NodeTone = 'paper' | 'blue' | 'dark' | 'external';
type FlowTone = 'governance' | 'traffic' | 'shadow';

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
        className={`${styles.connection} ${tone === 'traffic' ? styles.connectionTraffic : ''} ${tone === 'shadow' ? styles.connectionShadow : ''} ${muted ? styles.connectionMuted : ''}`}
        d={d}
        markerEnd={
          muted
            ? `url(#${markerId}-muted)`
            : tone === 'traffic'
              ? `url(#${markerId}-traffic)`
              : tone === 'shadow'
                ? `url(#${markerId}-shadow)`
                : undefined
        }
        pathLength="1"
      />
      {!muted ? (
        <>
          <path
            className={`${styles.connectionActive} ${tone === 'traffic' ? styles.connectionActiveTraffic : ''} ${tone === 'shadow' ? styles.connectionActiveShadow : ''}`}
            d={d}
            markerEnd={`url(#${markerId}-${tone === 'traffic' ? 'traffic-active' : tone === 'shadow' ? 'shadow-active' : 'active'})`}
            pathLength="1"
            style={timing}
          />
          <path
            className={`${styles.dataPacket} ${tone === 'traffic' ? styles.dataPacketTraffic : ''} ${tone === 'shadow' ? styles.dataPacketShadow : ''}`}
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
      <marker
        id={`${id}-shadow`}
        markerHeight="7"
        markerWidth="9"
        orient="auto"
        refX="8"
        refY="3.5"
        viewBox="0 0 9 7"
      >
        <path className={styles.shadowArrow} d="M0 0 L9 3.5 L0 7 Z" />
      </marker>
      <marker
        id={`${id}-shadow-active`}
        markerHeight="7"
        markerWidth="9"
        orient="auto"
        refX="8"
        refY="3.5"
        viewBox="0 0 9 7"
      >
        <path className={styles.shadowActiveArrow} d="M0 0 L9 3.5 L0 7 Z" />
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
          请求流量
          <i className={styles.legendShadow} />
          镜像 / 旁路
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
      <PanoramaPlane height={450} index="02" label="AI SERVICE TRAFFIC · EXAMPLE" width={790} x={375} y={55} />

      <FlowPath d="M 142 225 L 208 225" delay={0.1} markerId={markerId} />
      <FlowPath d="M 260 245 L 300 245 L 300 350 L 275 350" delay={0.55} markerId={markerId} />
      <FlowPath d="M 275 350 L 350 350 L 350 116 L 440 116" delay={1.15} markerId={markerId} />
      <FlowPath d="M 590 140 L 590 225" delay={1.55} markerId={markerId} />

      <FlowPath d="M 474 265 L 538 265" delay={1.9} markerId={markerId} tone="traffic" />
      <FlowPath d="M 642 250 L 690 250 L 690 215 L 733 215" delay={2.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 642 280 L 690 280 L 690 325 L 733 325" delay={2.45} markerId={markerId} tone="traffic" />
      <FlowPath d="M 827 215 L 900 215 L 900 250 L 908 250" delay={2.7} markerId={markerId} tone="traffic" />
      <FlowPath d="M 827 325 L 900 325 L 900 280 L 908 280" delay={2.95} markerId={markerId} tone="traffic" />
      <FlowPath d="M 1012 250 L 1042 250" delay={3.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 1012 280 L 1030 280 L 1030 340 L 1042 340" delay={3.45} markerId={markerId} tone="traffic" />
      <FlowPath d="M 590 305 L 590 395" delay={3.7} markerId={markerId} tone="shadow" />
      <FlowPath d="M 642 290 L 700 290 L 700 420 L 742 420" delay={3.95} markerId={markerId} tone="shadow" />

      <PlatformNode delay={0.05} label="Platform Engineer" mark="PE" meta="DEFINE · REVIEW" width={104} x={90} y={225} />
      <PlatformNode delay={0.45} label="Console / API" mark="API" meta="PUBLISH ONCE" tone="blue" width={104} x={255} y={225} />
      <ControlPlane compact width={176} x={185} y={350} />
      <ContractBand
        dark
        label="A/B ROUTE · RATE LIMIT · CIRCUIT BREAK · MIRROR · MOCK"
        meta="SERVICE GOVERNANCE · EXECUTION DEPENDS ON CONNECTED DATA PLANE"
        width={650}
        x={440}
        y={92}
      />
      <PlatformNode delay={1.85} label="User Request" mark="REQ" meta="AGENT CALL" width={88} x={430} y={265} />
      <PlatformNode delay={2.05} label="Agent Gateway" mark="GW" meta="POLE SERVICE · SDK / PROXY" tone="blue" width={104} x={590} y={265} />
      <PlatformNode delay={2.25} label="Agent Service A" mark="A" meta="POLE SERVICE · STABLE" width={94} x={780} y={215} />
      <PlatformNode delay={2.5} label="Agent Service B" mark="B" meta="POLE SERVICE · CANDIDATE" width={94} x={780} y={325} />
      <PlatformNode delay={2.75} label="Provider Adapter" mark="ADP" meta="RUNTIME BOUNDARY" width={104} x={960} y={265} />
      <PlatformNode delay={3.15} label="Primary Model" mark="LLM" meta="PRIMARY" tone="external" width={96} x={1090} y={215} />
      <PlatformNode delay={3.4} label="Fallback Model" mark="FB" meta="WHEN SUPPORTED" tone="external" width={96} x={1090} y={340} />
      <PlatformNode delay={3.65} label="Shadow Eval" mark="MIR" meta="NO RESPONSE PATH" tone="dark" width={96} x={590} y={420} />
      <PlatformNode delay={3.9} label="Mock Response" mark="MOCK" meta="WHEN SUPPORTED" tone="external" width={96} x={790} y={420} />

      <ContractBand
        label="POLE AGENT PROMPT → VERSIONED RELEASE"
        meta="BUILT-IN PROMPT + OPERATOR INSTRUCTIONS · GUARDED HOT RELOAD"
        width={390}
        x={420}
        y={530}
      />
      <ContractBand
        dark
        label="POLE SECRET → PROVIDER ADAPTER ONLY"
        meta="RUNTIME RESOLVE · NEVER MODEL CONTEXT"
        width={340}
        x={825}
        y={530}
      />

      <text className={styles.flowLabel} x="160" y="206">DEFINE</text>
      <text className={styles.flowLabel} x="294" y="232">PUBLISH</text>
      <text className={styles.flowLabel} x="360" y="178">GOVERNANCE VIEW</text>
      <text className={`${styles.flowLabel} ${styles.flowLabelTraffic}`} x="485" y="247">REQUEST</text>
      <text className={`${styles.flowLabel} ${styles.flowLabelShadow}`} x="603" y="366">MIRROR / MOCK</text>
      <text className={styles.boundaryLabel} textAnchor="end" x="1135" y="482">A2A REGISTRY · DISCOVERY ONLY · NOT REQUEST PATH</text>
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
      viewBox="0 0 360 1060"
    >
      <DiagramDefs compact id={markerId} />
      <rect className={styles.diagramBackground} height="1060" width="360" />
      <rect fill={`url(#${markerId}-grid)`} height="1060" width="360" />

      <PanoramaPlane height={150} index="01" label="MANAGEMENT" width={336} x={12} y={35} />
      <PanoramaPlane height={155} index="02" label="CONTROL PLANE" width={336} x={12} y={210} />
      <PanoramaPlane height={500} index="03" label="AI SERVICE TRAFFIC · EXAMPLE" width={336} x={12} y={390} />

      <FlowPath d="M 115 120 L 226 120" delay={0.1} markerId={markerId} />
      <FlowPath d="M 270 145 L 220 145 L 220 260" delay={0.5} markerId={markerId} />
      <FlowPath d="M 145 330 L 70 330 L 70 455 L 45 455" delay={1.1} markerId={markerId} />
      <FlowPath d="M 114 535 L 223 535" delay={1.75} markerId={markerId} tone="traffic" />
      <FlowPath d="M 265 563 L 265 610 L 180 610 L 180 622" delay={2.05} markerId={markerId} tone="traffic" />
      <FlowPath d="M 220 650 L 300 650 L 300 750 L 223 750" delay={2.4} markerId={markerId} tone="traffic" />
      <FlowPath d="M 137 750 L 110 750 L 110 850 L 119 850" delay={2.75} markerId={markerId} tone="traffic" />
      <FlowPath d="M 223 750 L 250 750 L 250 850 L 239 850" delay={3.05} markerId={markerId} tone="traffic" />

      <PlatformNode delay={0.05} label="Engineer" mark="PE" meta="DEFINE" width={78} x={76} y={120} />
      <PlatformNode delay={0.45} label="Console / API" mark="API" meta="PUBLISH ONCE" tone="blue" width={84} x={270} y={145} />
      <ControlPlane compact width={178} x={180} y={300} />
      <ContractBand
        dark
        label="A/B · LIMIT · BREAK"
        meta="MIRROR · MOCK · DATA PLANE SUPPORT"
        width={270}
        x={45}
        y={430}
      />
      <PlatformNode delay={1.7} label="User Request" mark="REQ" meta="AGENT CALL" width={78} x={75} y={535} />
      <PlatformNode delay={1.95} label="Agent Gateway" mark="GW" meta="POLE SERVICE" tone="blue" width={84} x={265} y={535} />
      <PlatformNode delay={2.3} label="Agent Service" mark="A/B" meta="POLE SERVICE · VERSIONS" width={80} x={180} y={650} />
      <PlatformNode delay={2.65} label="Provider Adapter" mark="ADP" meta="RUNTIME ONLY" width={86} x={180} y={750} />
      <PlatformNode delay={2.95} label="Primary Model" mark="LLM" meta="PRIMARY" tone="external" width={78} x={80} y={850} />
      <PlatformNode delay={3.25} label="Fallback Model" mark="FB" meta="WHERE SUPPORTED" tone="external" width={82} x={280} y={850} />

      <ContractBand
        label="POLE AGENT PROMPT"
        meta="VERSIONED RELEASE"
        width={145}
        x={25}
        y={940}
      />
      <ContractBand
        dark
        label="POLE SECRET"
        meta="NOT MODEL CONTEXT"
        width={155}
        x={180}
        y={940}
      />

      <text className={styles.flowLabel} x="84" y="382">GOVERNANCE VIEW</text>
      <text className={styles.boundaryLabel} textAnchor="middle" x="180" y="505">A2A REGISTRY · DISCOVERY ONLY · NOT REQUEST PATH</text>
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
      label="AI 服务治理沉浸式全景生效示意图：平台工程师通过 Console 或 API 发布治理视图；示例性的 Agent Gateway 经已接入 SDK 或代理执行条件与权重路由、限流和熔断，并按执行组件支持范围旁路镜像流量、返回 Mock 或切换降级路径。Pole Agent 的 Prompt 使用版本化发布；模型凭据由 Pole Secret 托管，只在 Provider Adapter 运行时解析，不进入浏览器、日志或模型上下文。A2A Registry 不承载 Agent 任务流量。"
      large={large}
      mobile={<GovernanceExecutionMobile />}
    />
  );
}
