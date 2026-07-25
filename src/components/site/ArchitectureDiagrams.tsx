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
  cycle = 6.4,
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
  cycle?: number;
}) {
  const radiusX = width / 2;
  const radiusY = Math.max(13, Math.round(width * 0.15));
  const timing = {
    '--node-delay': `${delay}s`,
    '--node-cycle': `${cycle}s`,
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

function BenefitOutcome({
  x,
  y,
  title,
  detail,
  delay,
  align = 'start',
}: {
  x: number;
  y: number;
  title: string;
  detail?: string;
  delay: number;
  align?: 'start' | 'middle' | 'end';
}) {
  const timing = {
    '--scene-delay': `${delay}s`,
  } as CSSProperties;
  const direction = align === 'end' ? -1 : 1;
  const lineStart = align === 'middle' ? -28 : 0;
  const lineEnd = align === 'middle' ? 28 : 34 * direction;

  return (
    <g
      className={styles.benefitOutcome}
      style={timing}
      transform={`translate(${x} ${y})`}
    >
      <path className={styles.benefitRule} d={`M ${lineStart} 0 H ${lineEnd}`} />
      <circle className={styles.benefitDot} cx={align === 'middle' ? 0 : lineEnd} cy="0" r="3" />
      <text className={styles.benefitTitle} textAnchor={align} x="0" y="17">{title}</text>
      {detail ? <text className={styles.benefitDetail} textAnchor={align} x="0" y="31">{detail}</text> : null}
    </g>
  );
}

function LimitDecision({ x, y, delay }: { x: number; y: number; delay: number }) {
  const timing = { '--scene-delay': `${delay}s` } as CSSProperties;

  return (
    <g className={styles.limitDecision} style={timing} transform={`translate(${x} ${y})`}>
      <path className={styles.limitArc} d="M -52 -23 A 58 42 0 0 1 52 -23" />
      <circle className={styles.profilePacket} cx="-42" cy="-29" r="4" />
      <circle className={styles.profilePacket} cx="-16" cy="-38" r="4" />
      <circle className={styles.profilePacketMuted} cx="15" cy="-38" r="4" />
      <path className={styles.limitReject} d="M 15 -34 V -18" />
      <path className={styles.limitCross} d="M 10 -13 L 20 -3 M 20 -13 L 10 -3" />
    </g>
  );
}

function TrafficSplitMeter({ x, y, delay }: { x: number; y: number; delay: number }) {
  const timing = { '--scene-delay': `${delay}s` } as CSSProperties;

  return (
    <g className={styles.splitMeter} style={timing} transform={`translate(${x} ${y})`}>
      {Array.from({ length: 10 }, (_, index) => (
        <circle
          className={index < 8 ? styles.splitBlue : styles.splitGreen}
          cx={index * 9}
          cy="0"
          key={index}
          r="3"
          style={{ '--dot-index': index } as CSSProperties}
        />
      ))}
    </g>
  );
}

function AuthCheckpoint({ x, y, delay }: { x: number; y: number; delay: number }) {
  const timing = { '--scene-delay': `${delay}s` } as CSSProperties;

  return (
    <g className={styles.authCheckpoint} style={timing} transform={`translate(${x} ${y})`}>
      <path className={styles.authShield} d="M 0 -12 L 11 -8 V 1 C 11 9 5 14 0 17 C -5 14 -11 9 -11 1 V -8 Z" />
      <path className={styles.authCheck} d="M -5 1 L -1 5 L 6 -3" />
    </g>
  );
}

function FailoverState({ x, y, delay }: { x: number; y: number; delay: number }) {
  const timing = { '--scene-delay': `${delay}s` } as CSSProperties;

  return (
    <g className={styles.failoverState} style={timing} transform={`translate(${x} ${y})`}>
      <circle className={styles.healthFail} cx="0" cy="0" r="9" />
      <path className={styles.healthFailMark} d="M -4 -4 L 4 4 M 4 -4 L -4 4" />
      <path className={styles.failoverArc} d="M -6 14 C -32 34 -30 67 -4 82" />
      <circle className={styles.healthOk} cx="0" cy="92" r="9" />
      <path className={styles.healthOkMark} d="M -4 92 L -1 95 L 5 89" />
    </g>
  );
}

function PromptVersionRail({
  x,
  y,
  width,
  title,
  detail,
  delay,
  compact = false,
}: {
  x: number;
  y: number;
  width: number;
  title: string;
  detail: string;
  delay: number;
  compact?: boolean;
}) {
  const timing = { '--scene-delay': `${delay}s` } as CSSProperties;

  return (
    <g className={styles.versionRail} style={timing}>
      <path className={styles.railLine} d={`M ${x} ${y} H ${x + width}`} />
      <g transform={`translate(${x + 18} ${y - 14})`}>
        <rect className={styles.versionOld} height="26" rx="8" width="48" />
        <text className={styles.versionText} textAnchor="middle" x="24" y="17">v12</text>
      </g>
      <path className={styles.versionArrow} d={`M ${x + 78} ${y - 1} H ${x + 114}`} />
      <g transform={`translate(${x + 124} ${y - 14})`}>
        <rect className={styles.versionNew} height="26" rx="8" width="48" />
        <text className={styles.versionTextActive} textAnchor="middle" x="24" y="17">v13</text>
      </g>
      <text className={styles.benefitTitle} x={x + (compact ? 175 : 190)} y={y - 5}>{title}</text>
      <text className={styles.benefitDetail} x={x + (compact ? 175 : 190)} y={y + 11}>{detail}</text>
    </g>
  );
}

function SecretBoundary({
  x,
  y,
  width,
  title,
  detail,
  delay,
}: {
  x: number;
  y: number;
  width: number;
  title: string;
  detail: string;
  delay: number;
}) {
  const timing = { '--scene-delay': `${delay}s` } as CSSProperties;

  return (
    <g className={styles.secretBoundary} style={timing}>
      <path className={styles.secretRail} d={`M ${x} ${y} H ${x + width}`} />
      <rect className={styles.secretRef} height="24" rx="7" width="62" x={x + 10} y={y - 12} />
      <text className={styles.secretRefText} textAnchor="middle" x={x + 41} y={y + 4}>REF</text>
      <path className={styles.secretStop} d={`M ${x + 86} ${y - 13} V ${y + 13}`} />
      <path className={styles.secretLock} d={`M ${x + 98} ${y - 2} h 20 v 15 h -20 Z M ${x + 103} ${y - 2} v -5 a 5 5 0 0 1 10 0 v 5`} />
      <text className={styles.benefitTitle} x={x + 132} y={y - 5}>{title}</text>
      <text className={styles.benefitDetail} x={x + 132} y={y + 11}>{detail}</text>
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
      viewBox="0 0 1200 650"
    >
      <DiagramDefs id={markerId} />
      <rect className={styles.diagramBackground} height="650" width="1200" />
      <rect fill={`url(#${markerId}-grid)`} height="650" width="1200" />

      <PanoramaPlane height={330} index="01" label={content.planes.managementControl} width={300} x={28} y={145} />
      <PanoramaPlane height={500} index="02" label={content.planes.aiTrafficExample} width={810} x={355} y={50} />

      <text className={styles.journeyTitle} x="610" y="84">{content.governanceBand.label}</text>
      <text className={styles.journeyMeta} x="610" y="103">{content.governanceBand.meta}</text>

      <FlowPath d="M 138 230 L 205 230" delay={0.1} duration={2.2} markerId={markerId} />
      <FlowPath d="M 258 250 L 295 250 L 295 365 L 272 365" delay={0.5} duration={2.2} markerId={markerId} />
      <FlowPath d="M 272 365 L 340 365 L 340 125 L 560 125 L 560 215" delay={0.9} duration={2.2} markerId={markerId} />

      <FlowPath d="M 458 265 L 508 265" delay={1.5} duration={2.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 612 250 L 655 250 L 655 210 L 688 210" delay={2.4} duration={2.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 612 280 L 655 280 L 655 320 L 688 320" delay={2.85} duration={2.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 792 210 L 850 210 L 850 250 L 858 250" delay={3.55} duration={2.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 792 320 L 850 320 L 850 280 L 858 280" delay={3.85} duration={2.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 962 250 L 1012 250" delay={4.65} duration={2.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 962 280 L 994 280 L 994 335 L 1012 335" delay={7.35} duration={2.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 612 280 L 635 280 L 635 405 L 570 420" delay={5.2} duration={2.2} markerId={markerId} tone="shadow" />
      <FlowPath d="M 612 292 L 675 292 L 675 430 L 720 430" delay={9.4} duration={2.2} markerId={markerId} tone="shadow" />
      <FlowPath d="M 720 450 L 670 450 L 670 300 L 612 300" delay={10.1} duration={2.2} markerId={markerId} tone="shadow" />

      <PlatformNode cycle={12.8} delay={0.05} label={content.nodes.engineer.label} mark="PE" meta={content.nodes.engineer.meta} shape="disc" width={100} x={88} y={230} />
      <PlatformNode cycle={12.8} delay={0.45} label={content.nodes.consoleApi.label} mark="API" meta={content.nodes.consoleApi.meta} tone="blue" width={100} x={250} y={230} />
      <ControlPlane compact width={172} x={180} y={365} />

      <PlatformNode cycle={12.8} delay={1.45} label={content.nodes.userRequest.label} mark="REQ" meta={content.nodes.userRequest.meta} shape="disc" width={84} x={415} y={265} />
      <PlatformNode cycle={12.8} delay={1.9} label={content.nodes.agentGateway.label} mark="GW" meta={content.nodes.agentGateway.meta} tone="blue" width={104} x={560} y={265} />
      <PlatformNode cycle={12.8} delay={2.4} label={content.nodes.agentServiceA.label} mark="BLUE" meta={content.nodes.agentServiceA.meta} tone="blue" width={104} x={740} y={210} />
      <PlatformNode cycle={12.8} delay={2.85} label={content.nodes.agentServiceB.label} mark="GREEN" meta={content.nodes.agentServiceB.meta} tone="green" width={104} x={740} y={320} />
      <PlatformNode cycle={12.8} delay={3.65} label={content.nodes.providerAdapter.label} mark="ADP" meta={content.nodes.providerAdapter.meta} width={104} x={910} y={265} />
      <PlatformNode cycle={12.8} delay={4.55} label={content.nodes.primaryModel.label} mark="LLM" meta={content.nodes.primaryModel.meta} tone="external" width={96} x={1060} y={210} />
      <PlatformNode cycle={12.8} delay={7.35} label={content.nodes.fallbackModel.label} mark="FB" meta={content.nodes.fallbackModel.meta} tone="external" width={96} x={1060} y={335} />
      <PlatformNode cycle={12.8} delay={5.15} label={content.nodes.shadowEval.label} mark="MIR" meta={content.nodes.shadowEval.meta} tone="dark" width={96} x={570} y={430} />
      <PlatformNode cycle={12.8} delay={9.35} label={content.nodes.mockResponse.label} mark="MOCK" meta={content.nodes.mockResponse.meta} tone="external" width={96} x={770} y={430} />

      <LimitDecision delay={1.4} x={560} y={265} />
      <TrafficSplitMeter delay={2.25} x={661} y={171} />
      <AuthCheckpoint delay={3.45} x={850} y={210} />
      <FailoverState delay={6.55} x={995} y={210} />

      <BenefitOutcome delay={1.35} detail={content.benefits.limit.detail} title={content.benefits.limit.title} x={500} y={350} />
      <BenefitOutcome align="middle" delay={2.25} detail={content.benefits.rollout.detail} title={content.benefits.rollout.title} x={740} y={140} />
      <BenefitOutcome align="middle" delay={3.45} detail={content.benefits.auth.detail} title={content.benefits.auth.title} x={970} y={155} />
      <BenefitOutcome align="end" delay={6.55} detail={content.benefits.resilience.detail} title={content.benefits.resilience.title} x={1115} y={430} />
      <BenefitOutcome delay={5.1} detail={content.benefits.mirror.detail} title={content.benefits.mirror.title} x={450} y={505} />
      <BenefitOutcome delay={9.3} detail={content.benefits.mock.detail} title={content.benefits.mock.title} x={720} y={505} />

      <PromptVersionRail
        delay={0.2}
        detail={content.benefits.prompt.detail}
        title={content.benefits.prompt.title}
        width={350}
        x={375}
        y={600}
      />
      <SecretBoundary
        delay={4.1}
        detail={content.benefits.secret.detail}
        title={content.benefits.secret.title}
        width={380}
        x={775}
        y={600}
      />

      <text className={`${styles.flowLabel} ${styles.flowLabelTraffic}`} x="465" y="246">{content.flow.request}</text>
      <text className={styles.ratioLabel} textAnchor="end" x="682" y="198">{content.flow.blueTraffic}</text>
      <text className={styles.ratioLabel} textAnchor="end" x="682" y="342">{content.flow.greenTraffic}</text>
      <text className={`${styles.flowLabel} ${styles.flowLabelShadow}`} x="580" y="390">{content.flow.mirrorMock}</text>
      <text className={styles.boundaryLabel} textAnchor="end" x="1135" y="540">{content.boundary.desktop}</text>
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
      viewBox="0 0 360 1245"
    >
      <DiagramDefs compact id={markerId} />
      <rect className={styles.diagramBackground} height="1245" width="360" />
      <rect fill={`url(#${markerId}-grid)`} height="1245" width="360" />

      <PanoramaPlane height={245} index="01" label={content.planes.managementControl} width={336} x={12} y={25} />
      <PanoramaPlane height={915} index="02" label={content.planes.aiTrafficExample} width={336} x={12} y={290} />

      <text className={styles.journeyTitle} textAnchor="middle" x="180" y="335">{content.governanceBand.shortLabel}</text>
      <text className={styles.journeyMeta} textAnchor="middle" x="180" y="354">{content.governanceBand.shortMeta}</text>

      <FlowPath d="M 115 90 L 226 90" delay={0.1} duration={2.2} markerId={markerId} />
      <FlowPath d="M 270 115 L 220 115 L 220 175" delay={0.5} duration={2.2} markerId={markerId} />
      <FlowPath d="M 145 235 L 45 235 L 45 390 L 265 390 L 265 400" delay={0.9} duration={2.2} markerId={markerId} />
      <FlowPath d="M 114 430 L 223 430" delay={1.5} duration={2.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 307 430 L 325 430 L 325 540 L 180 540 L 180 562" delay={2.35} duration={2.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 180 620 L 180 722" delay={3.5} duration={2.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 137 750 L 85 750 L 85 870 L 119 870" delay={4.6} duration={2.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 223 750 L 275 750 L 275 870 L 239 870" delay={7.3} duration={2.2} markerId={markerId} tone="traffic" />
      <FlowPath d="M 223 590 L 300 590 L 300 1040 L 268 1040" delay={9.3} duration={2.2} markerId={markerId} tone="shadow" />
      <FlowPath d="M 137 590 L 60 590 L 60 1040 L 92 1040" delay={5.1} duration={2.2} markerId={markerId} tone="shadow" />

      <PlatformNode cycle={12.8} delay={0.05} label={content.nodes.engineer.shortLabel} mark="PE" meta={content.nodes.engineer.shortMeta} shape="disc" width={78} x={76} y={90} />
      <PlatformNode cycle={12.8} delay={0.45} label={content.nodes.consoleApi.label} mark="API" meta={content.nodes.consoleApi.shortMeta} tone="blue" width={84} x={270} y={115} />
      <ControlPlane compact width={178} x={180} y={215} />
      <PlatformNode cycle={12.8} delay={1.45} label={content.nodes.userRequest.label} mark="REQ" meta={content.nodes.userRequest.shortMeta} shape="disc" width={78} x={75} y={430} />
      <PlatformNode cycle={12.8} delay={1.9} label={content.nodes.agentGateway.label} mark="GW" meta={content.nodes.agentGateway.shortMeta} tone="blue" width={84} x={265} y={430} />
      <PlatformNode cycle={12.8} delay={2.3} label={content.nodes.agentService.label} mark="B/G" meta={content.nodes.agentService.shortMeta} width={94} x={180} y={590} />
      <PlatformNode cycle={12.8} delay={3.45} label={content.nodes.providerAdapter.label} mark="ADP" meta={content.nodes.providerAdapter.shortMeta} width={86} x={180} y={750} />
      <PlatformNode cycle={12.8} delay={4.55} label={content.nodes.primaryModel.label} mark="LLM" meta={content.nodes.primaryModel.shortMeta} tone="external" width={78} x={80} y={870} />
      <PlatformNode cycle={12.8} delay={7.25} label={content.nodes.fallbackModel.label} mark="FB" meta={content.nodes.fallbackModel.shortMeta} tone="external" width={82} x={280} y={870} />
      <PlatformNode cycle={12.8} delay={5.05} label={content.nodes.shadowEval.label} mark="MIR" meta={content.nodes.shadowEval.shortMeta} tone="dark" width={82} x={72} y={1040} />
      <PlatformNode cycle={12.8} delay={9.25} label={content.nodes.mockResponse.label} mark="MOCK" meta={content.nodes.mockResponse.shortMeta} tone="external" width={86} x={280} y={1040} />

      <LimitDecision delay={1.4} x={265} y={430} />
      <TrafficSplitMeter delay={2.2} x={135} y={540} />
      <AuthCheckpoint delay={3.4} x={180} y={685} />
      <FailoverState delay={6.5} x={180} y={870} />

      <BenefitOutcome align="end" delay={1.35} title={content.benefits.limit.title} x={330} y={500} />
      <BenefitOutcome align="middle" delay={2.2} title={content.benefits.rollout.title} x={180} y={665} />
      <BenefitOutcome align="end" delay={3.4} title={content.benefits.auth.title} x={330} y={690} />
      <BenefitOutcome align="middle" delay={6.5} title={content.benefits.resilience.title} x={180} y={1000} />

      <PromptVersionRail
        compact
        delay={0.2}
        detail={content.benefits.prompt.detail}
        title={content.benefits.prompt.title}
        width={320}
        x={15}
        y={1135}
      />
      <SecretBoundary
        delay={4.1}
        detail={content.benefits.secret.detail}
        title={content.benefits.secret.title}
        width={320}
        x={15}
        y={1190}
      />

      <text className={styles.boundaryLabel} textAnchor="middle" x="180" y="1220">
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
