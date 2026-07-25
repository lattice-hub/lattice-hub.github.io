import type { CSSProperties, ReactNode } from 'react';
import {
  DEFAULT_ARCHITECTURE_LOCALE,
  getArchitectureCopy,
  type ArchitectureLocale,
} from './architectureLocale';
import styles from './ArchitectureDiagrams.module.css';

type DiagramKind = 'collaboration' | 'governance';
type NodeTone = 'paper' | 'blue' | 'green' | 'dark' | 'external';
type NodeShape = 'disc' | 'slab';
type FlowTone = 'governance' | 'traffic' | 'shadow';
type ArchitectureCopy = ReturnType<typeof getArchitectureCopy>;

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
    '--flow-cycle': `${Math.max(6.4, duration * 5.8)}s`,
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
  shape = 'slab',
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
  shape?: NodeShape;
}) {
  const radiusX = width / 2;
  const radiusY = Math.max(13, Math.round(width * 0.15));
  const timing = {
    '--node-delay': `${delay}s`,
    '--node-cycle': '6.4s',
  } as CSSProperties;
  const labelY = (shape === 'disc' ? radiusY : 14) + depth + 25;
  const toneClass = tone === 'paper' ? '' : styles[`tone${tone}`];
  const shapeClass = shape === 'slab' ? styles.shapeslab : '';

  return (
    <g
      className={[toneClass, shapeClass].filter(Boolean).join(' ')}
      transform={`translate(${x} ${y})`}
    >
      <g className={styles.nodeLift} style={timing}>
        {shape === 'disc' ? (
          <>
            <path
              className={styles.nodeBody}
              d={`M ${-radiusX} 0 A ${radiusX} ${radiusY} 0 0 0 ${radiusX} 0 L ${radiusX} ${depth} A ${radiusX} ${radiusY} 0 0 1 ${-radiusX} ${depth} Z`}
            />
            <ellipse className={styles.nodeTop} cx="0" cy="0" rx={radiusX} ry={radiusY} />
            <path
              className={styles.nodeRim}
              d={`M ${-radiusX + 9} 0 A ${radiusX - 9} ${Math.max(7, radiusY - 5)} 0 0 0 ${radiusX - 9} 0`}
            />
          </>
        ) : (
          <>
            <rect
              className={styles.nodeBody}
              height={28}
              rx="8"
              width={width}
              x={-radiusX}
              y={-14 + depth}
            />
            <rect
              className={styles.nodeTop}
              height={28}
              rx="8"
              width={width}
              x={-radiusX}
              y="-14"
            />
            <path className={styles.nodeRim} d={`M ${-radiusX + 12} 5 H ${radiusX - 12}`} />
          </>
        )}
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
  const timing = {
    '--node-delay': `${delay}s`,
    '--node-cycle': '6.4s',
  } as CSSProperties;

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
  locale,
  copy,
  desktop,
  mobile,
}: {
  kind: DiagramKind;
  label: string;
  large: boolean;
  locale: ArchitectureLocale;
  copy: ArchitectureCopy;
  desktop: ReactNode;
  mobile: ReactNode;
}) {
  return (
    <div
      aria-label={label}
      className={`${styles.diagramFrame} ${large ? styles.diagramLarge : ''}`}
      data-diagram={kind}
      lang={locale}
      role="img"
    >
      {desktop}
      {mobile}
      {kind === 'governance' ? (
        <span className={styles.legend} aria-hidden="true">
          <i className={styles.legendGovernance} />
          {copy.governance.legend.governance}
          <i className={styles.legendTraffic} />
          {copy.governance.legend.traffic}
          <i className={styles.legendShadow} />
          {copy.governance.legend.shadow}
        </span>
      ) : (
        <span className={styles.legend} aria-hidden="true">
          <i className={styles.legendGovernance} />
          {copy.collaboration.legend.current}
          <i className={styles.legendMuted} />
          {copy.collaboration.legend.evolving}
        </span>
      )}
    </div>
  );
}

function ComponentCollaborationDesktop({ copy }: { copy: ArchitectureCopy }) {
  const markerId = 'panorama-collaboration-desktop';
  const content = copy.collaboration;

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

      <PanoramaPlane height={300} index="01" label={content.planes.managementCluster} width={260} x={34} y={150} />
      <PanoramaPlane height={390} index="02" label={content.planes.controlPlane} width={350} x={324} y={100} />
      <PanoramaPlane height={420} index="03" label={content.planes.runtimeIntegration} width={452} x={712} y={70} />

      <FlowPath d="M 183 230 L 320 230 L 405 278" delay={0.1} markerId={markerId} />
      <FlowPath d="M 183 365 L 320 365 L 405 326" delay={0.5} markerId={markerId} />
      <FlowPath d="M 595 282 L 705 282 L 760 180" delay={1.5} markerId={markerId} />
      <FlowPath d="M 595 298 L 850 298 L 982 200" delay={1.9} markerId={markerId} />
      <FlowPath d="M 595 316 L 705 316 L 760 350" delay={0} markerId={markerId} muted />
      <FlowPath d="M 595 344 L 700 435 L 925 435 L 982 397" delay={2.3} markerId={markerId} />

      <PlatformNode delay={0.05} label={content.nodes.console.label} mark="C" meta={content.nodes.console.meta} width={96} x={135} y={230} />
      <PlatformNode delay={0.45} label={content.nodes.controller.label} mark="K8S" meta={content.nodes.controller.meta} width={104} x={135} y={365} />
      <ControlPlane x={500} y={305} />
      <PlatformNode delay={1.45} label={content.nodes.rustSdk.label} mark="SDK" meta={content.nodes.rustSdk.meta} tone="blue" width={96} x={808} y={180} />
      <PlatformNode delay={1.85} label={content.nodes.envoy.label} mark="xDS" meta={content.nodes.envoy.meta} tone="external" width={108} x={1038} y={200} />
      <PlatformNode delay={2.05} label={content.nodes.sidecar.label} mark="P" meta={content.nodes.sidecar.meta} width={106} x={808} y={350} />
      <PlatformNode delay={2.25} label={content.nodes.limiter.label} mark="L" meta={content.nodes.limiter.meta} tone="dark" width={104} x={1038} y={385} />

      <ContractBand label={content.contract.label} meta={content.contract.meta} width={510} x={345} y={535} />

      <text className={styles.flowLabel} x="230" y="211">{content.flow.manage}</text>
      <text className={styles.flowLabel} x="620" y="264">{content.flow.distribute}</text>
      <text className={styles.flowLabel} x="879" y="316">{content.flow.execute}</text>
    </svg>
  );
}

function ComponentCollaborationMobile({ copy }: { copy: ArchitectureCopy }) {
  const markerId = 'panorama-collaboration-mobile';
  const content = copy.collaboration;

  return (
    <svg
      aria-hidden="true"
      className={`${styles.diagram} ${styles.mobileDiagram}`}
      data-diagram-viewport="mobile"
      viewBox="0 0 360 820"
    >
      <DiagramDefs compact id={markerId} />
      <rect className={styles.diagramBackground} height="820" width="360" />
      <rect fill={`url(#${markerId}-grid)`} height="820" width="360" />

      <PanoramaPlane height={165} index="01" label={content.planes.management} width={336} x={12} y={35} />
      <PanoramaPlane height={170} index="02" label={content.planes.controlPlane} width={336} x={12} y={225} />
      <PanoramaPlane height={300} index="03" label={content.planes.runtime} width={336} x={12} y={420} />

      <FlowPath d="M 90 105 L 180 105 L 180 270" delay={0.1} markerId={markerId} />
      <FlowPath d="M 270 145 L 220 145 L 220 275" delay={0.45} markerId={markerId} />
      <FlowPath d="M 180 352 L 180 445 L 90 470" delay={1.4} markerId={markerId} />
      <FlowPath d="M 200 352 L 200 480 L 270 505" delay={0} markerId={markerId} muted />
      <FlowPath d="M 165 352 L 165 555 L 90 590" delay={1.85} markerId={markerId} />
      <FlowPath d="M 205 352 L 205 585 L 270 625" delay={2.2} markerId={markerId} />

      <PlatformNode delay={0.05} label={content.nodes.console.label} mark="C" meta={content.nodes.console.shortMeta} width={78} x={76} y={105} />
      <PlatformNode delay={0.4} label={content.nodes.controller.shortLabel} mark="K8S" meta={content.nodes.controller.shortMeta} width={82} x={270} y={145} />
      <ControlPlane compact width={178} x={180} y={310} />
      <PlatformNode delay={1.35} label={content.nodes.rustSdk.label} mark="SDK" meta={content.nodes.rustSdk.shortMeta} tone="blue" width={78} x={78} y={470} />
      <PlatformNode delay={1.7} label={content.nodes.sidecar.label} mark="P" meta={content.nodes.sidecar.shortMeta} width={82} x={270} y={505} />
      <PlatformNode delay={1.9} label={content.nodes.envoy.label} mark="xDS" meta={content.nodes.envoy.shortMeta} tone="external" width={86} x={82} y={590} />
      <PlatformNode delay={2.15} label={content.nodes.limiter.shortLabel} mark="L" meta={content.nodes.limiter.shortMeta} tone="dark" width={78} x={270} y={625} />

      <ContractBand label={content.contract.label} meta={content.contract.shortMeta} width={270} x={45} y={745} />
    </svg>
  );
}

function GovernanceExecutionDesktop({ copy }: { copy: ArchitectureCopy }) {
  const markerId = 'panorama-governance-desktop';
  const content = copy.governance;

  return (
    <svg
      aria-hidden="true"
      className={`${styles.diagram} ${styles.desktopDiagram}`}
      data-diagram-viewport="desktop"
      viewBox="0 0 1200 570"
    >
      <DiagramDefs id={markerId} />
      <rect className={styles.diagramBackground} height="570" width="1200" />
      <rect fill={`url(#${markerId}-grid)`} height="570" width="1200" />

      <PanoramaPlane height={300} index="01" label={content.planes.managementControl} width={315} x={28} y={130} />
      <PanoramaPlane height={440} index="02" label={content.planes.aiTrafficExample} width={790} x={375} y={55} />

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
      <FlowPath d="M 642 280 L 665 280 L 665 385 L 590 395" delay={3.7} markerId={markerId} tone="shadow" />
      <FlowPath d="M 642 290 L 700 290 L 700 420 L 742 420" delay={3.95} markerId={markerId} tone="shadow" />

      <PlatformNode delay={0.05} label={content.nodes.engineer.label} mark="PE" meta={content.nodes.engineer.meta} shape="disc" width={104} x={90} y={225} />
      <PlatformNode delay={0.45} label={content.nodes.consoleApi.label} mark="API" meta={content.nodes.consoleApi.meta} tone="blue" width={104} x={255} y={225} />
      <ControlPlane compact width={176} x={185} y={350} />
      <ContractBand
        dark
        label={content.governanceBand.label}
        meta={content.governanceBand.meta}
        width={650}
        x={440}
        y={92}
      />
      <PlatformNode delay={1.85} label={content.nodes.userRequest.label} mark="REQ" meta={content.nodes.userRequest.meta} shape="disc" width={88} x={430} y={265} />
      <PlatformNode delay={2.05} label={content.nodes.agentGateway.label} mark="GW" meta={content.nodes.agentGateway.meta} tone="blue" width={104} x={590} y={265} />
      <PlatformNode delay={2.25} label={content.nodes.agentServiceA.label} mark="BLUE" meta={content.nodes.agentServiceA.meta} tone="blue" width={104} x={780} y={215} />
      <PlatformNode delay={2.5} label={content.nodes.agentServiceB.label} mark="GREEN" meta={content.nodes.agentServiceB.meta} tone="green" width={104} x={780} y={325} />
      <PlatformNode delay={2.75} label={content.nodes.providerAdapter.label} mark="ADP" meta={content.nodes.providerAdapter.meta} width={104} x={960} y={265} />
      <PlatformNode delay={3.15} label={content.nodes.primaryModel.label} mark="LLM" meta={content.nodes.primaryModel.meta} tone="external" width={96} x={1090} y={215} />
      <PlatformNode delay={3.4} label={content.nodes.fallbackModel.label} mark="FB" meta={content.nodes.fallbackModel.meta} tone="external" width={96} x={1090} y={340} />
      <PlatformNode delay={3.65} label={content.nodes.shadowEval.label} mark="MIR" meta={content.nodes.shadowEval.meta} tone="dark" width={96} x={590} y={420} />
      <PlatformNode delay={3.9} label={content.nodes.mockResponse.label} mark="MOCK" meta={content.nodes.mockResponse.meta} tone="external" width={96} x={790} y={420} />

      <ContractBand
        label={content.promptBand.label}
        meta={content.promptBand.meta}
        width={390}
        x={420}
        y={510}
      />
      <ContractBand
        dark
        label={content.secretBand.label}
        meta={content.secretBand.meta}
        width={340}
        x={825}
        y={510}
      />

      <text className={styles.flowLabel} x="360" y="178">{content.flow.governanceView}</text>
      <text className={`${styles.flowLabel} ${styles.flowLabelTraffic}`} x="485" y="247">{content.flow.request}</text>
      <text className={styles.ratioLabel} textAnchor="end" x="724" y="199">{content.flow.blueTraffic}</text>
      <text className={styles.ratioLabel} textAnchor="end" x="724" y="345">{content.flow.greenTraffic}</text>
      <text className={styles.authLabel} textAnchor="middle" x="870" y="184">{content.flow.serviceAuth}</text>
      <text className={`${styles.flowLabel} ${styles.flowLabelShadow}`} x="603" y="366">{content.flow.mirrorMock}</text>
      <text className={styles.boundaryLabel} textAnchor="end" x="1135" y="490">{content.boundary.desktop}</text>
    </svg>
  );
}

function GovernanceExecutionMobile({ copy }: { copy: ArchitectureCopy }) {
  const markerId = 'panorama-governance-mobile';
  const content = copy.governance;

  return (
    <svg
      aria-hidden="true"
      className={`${styles.diagram} ${styles.mobileDiagram}`}
      data-diagram-viewport="mobile"
      viewBox="0 0 360 930"
    >
      <DiagramDefs compact id={markerId} />
      <rect className={styles.diagramBackground} height="930" width="360" />
      <rect fill={`url(#${markerId}-grid)`} height="930" width="360" />

      <PanoramaPlane height={245} index="01" label={content.planes.managementControl} width={336} x={12} y={25} />
      <PanoramaPlane height={530} index="02" label={content.planes.aiTrafficExample} width={336} x={12} y={290} />

      <FlowPath d="M 115 90 L 226 90" delay={0.1} markerId={markerId} />
      <FlowPath d="M 270 115 L 220 115 L 220 175" delay={0.5} markerId={markerId} />
      <FlowPath d="M 145 235 L 70 235 L 70 355 L 45 355" delay={1.1} markerId={markerId} />
      <FlowPath d="M 114 445 L 223 445" delay={1.75} markerId={markerId} tone="traffic" />
      <FlowPath d="M 307 445 L 325 445 L 325 505 L 180 505 L 180 517" delay={2.05} markerId={markerId} tone="traffic" />
      <FlowPath d="M 220 545 L 300 545 L 300 655 L 223 655" delay={2.4} markerId={markerId} tone="traffic" />
      <FlowPath d="M 137 655 L 110 655 L 110 765 L 119 765" delay={2.75} markerId={markerId} tone="traffic" />
      <FlowPath d="M 223 655 L 250 655 L 250 765 L 239 765" delay={3.05} markerId={markerId} tone="traffic" />

      <PlatformNode delay={0.05} label={content.nodes.engineer.shortLabel} mark="PE" meta={content.nodes.engineer.shortMeta} shape="disc" width={78} x={76} y={90} />
      <PlatformNode delay={0.45} label={content.nodes.consoleApi.label} mark="API" meta={content.nodes.consoleApi.shortMeta} tone="blue" width={84} x={270} y={115} />
      <ControlPlane compact width={178} x={180} y={215} />
      <ContractBand
        dark
        label={content.governanceBand.shortLabel}
        meta={content.governanceBand.shortMeta}
        width={270}
        x={45}
        y={330}
      />
      <PlatformNode delay={1.7} label={content.nodes.userRequest.label} mark="REQ" meta={content.nodes.userRequest.shortMeta} shape="disc" width={78} x={75} y={445} />
      <PlatformNode delay={1.95} label={content.nodes.agentGateway.label} mark="GW" meta={content.nodes.agentGateway.shortMeta} tone="blue" width={84} x={265} y={445} />
      <PlatformNode delay={2.3} label={content.nodes.agentService.label} mark="B/G" meta={content.nodes.agentService.shortMeta} width={94} x={180} y={545} />
      <PlatformNode delay={2.65} label={content.nodes.providerAdapter.label} mark="ADP" meta={content.nodes.providerAdapter.shortMeta} width={86} x={180} y={655} />
      <PlatformNode delay={2.95} label={content.nodes.primaryModel.label} mark="LLM" meta={content.nodes.primaryModel.shortMeta} tone="external" width={78} x={80} y={765} />
      <PlatformNode delay={3.25} label={content.nodes.fallbackModel.label} mark="FB" meta={content.nodes.fallbackModel.shortMeta} tone="external" width={82} x={280} y={765} />

      <ContractBand
        label={content.promptBand.shortLabel}
        meta={content.promptBand.shortMeta}
        width={145}
        x={25}
        y={855}
      />
      <ContractBand
        dark
        label={content.secretBand.shortLabel}
        meta={content.secretBand.shortMeta}
        width={155}
        x={180}
        y={855}
      />

      <text className={styles.flowLabel} x="84" y="282">{content.flow.governanceView}</text>
      <text className={styles.authLabel} textAnchor="end" x="292" y="610">{content.flow.serviceAuthShort}</text>
      <text className={styles.boundaryLabel} textAnchor="middle" x="180" y="405">
        <tspan x="180">{content.boundary.mobileLine1}</tspan>
        <tspan x="180" dy="12">{content.boundary.mobileLine2}</tspan>
      </text>
    </svg>
  );
}

type ArchitectureDiagramProps = {
  large?: boolean;
  locale?: ArchitectureLocale;
};

export function ComponentCollaborationDiagram({
  large = false,
  locale = DEFAULT_ARCHITECTURE_LOCALE,
}: ArchitectureDiagramProps) {
  const copy = getArchitectureCopy(locale);

  return (
    <DiagramFrame
      copy={copy}
      desktop={<ComponentCollaborationDesktop copy={copy} />}
      kind="collaboration"
      label={copy.collaboration.aria}
      large={large}
      locale={locale}
      mobile={<ComponentCollaborationMobile copy={copy} />}
    />
  );
}

export function GovernanceExecutionDiagram({
  large = false,
  locale = DEFAULT_ARCHITECTURE_LOCALE,
}: ArchitectureDiagramProps) {
  const copy = getArchitectureCopy(locale);

  return (
    <DiagramFrame
      copy={copy}
      desktop={<GovernanceExecutionDesktop copy={copy} />}
      kind="governance"
      label={copy.governance.aria}
      large={large}
      locale={locale}
      mobile={<GovernanceExecutionMobile copy={copy} />}
    />
  );
}
