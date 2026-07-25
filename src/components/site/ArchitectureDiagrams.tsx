import type { CSSProperties, ReactNode } from 'react';
import styles from './ArchitectureDiagrams.module.css';

type DiagramKind = 'collaboration' | 'governance';
type NodeTone = 'paper' | 'blue' | 'dark' | 'external';

function FlowPath({
  d,
  delay,
  duration = 1.1,
  muted = false,
}: {
  d: string;
  delay: number;
  duration?: number;
  muted?: boolean;
}) {
  const timing = {
    '--path-delay': `${delay}s`,
    '--path-duration': `${duration}s`,
  } as CSSProperties;

  return (
    <>
      <path className={`${styles.connection} ${muted ? styles.connectionMuted : ''}`} d={d} pathLength="1" />
      {!muted ? (
        <>
          <path className={styles.connectionActive} d={d} pathLength="1" style={timing} />
          <path className={styles.dataPacket} d={d} pathLength="1" style={timing} />
        </>
      ) : null}
    </>
  );
}

function IsoNode({
  x,
  y,
  label,
  meta,
  width = 76,
  height = 34,
  depth = 10,
  delay = 0,
  tone = 'paper',
  labelPlacement = 'below',
}: {
  x: number;
  y: number;
  label: string;
  meta?: string;
  width?: number;
  height?: number;
  depth?: number;
  delay?: number;
  tone?: NodeTone;
  labelPlacement?: 'above' | 'below';
}) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const labelY = labelPlacement === 'above' ? -halfHeight - 14 : halfHeight + depth + 18;
  const metaY = labelPlacement === 'above' ? labelY - 13 : labelY + 13;
  const timing = { '--node-delay': `${delay}s` } as CSSProperties;

  return (
    <g className={`${styles.isoNode} ${styles[`tone${tone}`]}`} transform={`translate(${x} ${y})`}>
      <g className={styles.nodeLift} style={timing}>
        <polygon
          className={styles.nodeLeft}
          points={`${-halfWidth},0 0,${halfHeight} 0,${halfHeight + depth} ${-halfWidth},${depth}`}
        />
        <polygon
          className={styles.nodeRight}
          points={`0,${halfHeight} ${halfWidth},0 ${halfWidth},${depth} 0,${halfHeight + depth}`}
        />
        <polygon
          className={styles.nodeTop}
          points={`0,${-halfHeight} ${halfWidth},0 0,${halfHeight} ${-halfWidth},0`}
        />
        <line className={styles.nodeSignature} x1={-halfWidth + 14} x2={-8} y1="-2" y2={-halfHeight + 7} />
      </g>
      <text className={styles.nodeLabel} textAnchor="middle" y={labelY}>{label}</text>
      {meta ? <text className={styles.nodeMeta} textAnchor="middle" y={metaY}>{meta}</text> : null}
    </g>
  );
}

function ControlPlane({
  x,
  y,
  width = 190,
  height = 92,
  depth = 22,
  compact = false,
  delay = 1.35,
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  depth?: number;
  compact?: boolean;
  delay?: number;
}) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const timing = { '--node-delay': `${delay}s` } as CSSProperties;

  return (
    <g className={styles.controlPlane} transform={`translate(${x} ${y})`}>
      <g className={styles.coreLift} style={timing}>
        <polygon
          className={styles.coreLeft}
          points={`${-halfWidth},0 0,${halfHeight} 0,${halfHeight + depth} ${-halfWidth},${depth}`}
        />
        <polygon
          className={styles.coreRight}
          points={`0,${halfHeight} ${halfWidth},0 ${halfWidth},${depth} 0,${halfHeight + depth}`}
        />
        <polygon
          className={styles.coreTop}
          points={`0,${-halfHeight} ${halfWidth},0 0,${halfHeight} ${-halfWidth},0`}
        />
        <polygon
          className={styles.coreInset}
          points={`0,${-halfHeight + 15} ${halfWidth - 30},0 0,${halfHeight - 15} ${-halfWidth + 30},0`}
        />
      </g>
      <text className={styles.coreEyebrow} textAnchor="middle" y={compact ? -8 : -11}>LATTICE.HUB</text>
      <text className={styles.coreTitle} textAnchor="middle" y={compact ? 8 : 9}>Control Plane</text>
      {!compact ? <text className={styles.coreMeta} textAnchor="middle" y="26">UNIFIED GOVERNANCE VIEW</text> : null}
    </g>
  );
}

function IsoRail({
  x,
  y,
  width,
  height = 38,
  depth = 10,
  label,
  meta,
  tone = 'paper',
}: {
  x: number;
  y: number;
  width: number;
  height?: number;
  depth?: number;
  label: string;
  meta?: string;
  tone?: 'paper' | 'dark';
}) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
    <g className={`${styles.isoRail} ${styles[`rail${tone}`]}`} transform={`translate(${x} ${y})`}>
      <polygon
        className={styles.railLeft}
        points={`${-halfWidth},0 0,${halfHeight} 0,${halfHeight + depth} ${-halfWidth},${depth}`}
      />
      <polygon
        className={styles.railRight}
        points={`0,${halfHeight} ${halfWidth},0 ${halfWidth},${depth} 0,${halfHeight + depth}`}
      />
      <polygon
        className={styles.railTop}
        points={`0,${-halfHeight} ${halfWidth},0 0,${halfHeight} ${-halfWidth},0`}
      />
      <text className={styles.railLabel} textAnchor="middle" y="-1">{label}</text>
      {meta ? <text className={styles.railMeta} textAnchor="middle" y="13">{meta}</text> : null}
    </g>
  );
}

function IsoZone({
  points,
  label,
  x,
  y,
}: {
  points: string;
  label: string;
  x: number;
  y: number;
}) {
  return (
    <>
      <polygon className={styles.zone} points={points} />
      <text className={styles.zoneLabel} transform={`rotate(-28 ${x} ${y})`} x={x} y={y}>{label}</text>
    </>
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
  return (
    <svg aria-hidden="true" className={`${styles.diagram} ${styles.desktopDiagram}`} viewBox="0 0 960 520">
      <defs>
        <pattern height="28" id="iso-grid-collaboration-desktop" patternUnits="userSpaceOnUse" width="28">
          <circle className={styles.gridDot} cx="1" cy="1" r="1" />
        </pattern>
      </defs>
      <rect className={styles.diagramBackground} height="520" width="960" />
      <rect fill="url(#iso-grid-collaboration-desktop)" height="520" width="960" />

      <IsoZone label="MANAGEMENT & CLUSTER" points="35,250 160,180 300,250 300,385 185,448 45,375" x={64} y={247} />
      <IsoZone label="UNIFIED CONTROL PLANE" points="275,285 430,195 575,270 575,350 430,435 275,355" x={300} y={282} />
      <IsoZone label="RUNTIME & INTEGRATION" points="555,220 700,105 915,215 915,355 750,455 555,350" x={585} y={218} />

      <IsoRail
        height={44}
        label="SPECIFICATION"
        meta="SHARED CONTRACT"
        width={470}
        x={575}
        y={485}
      />

      <g>
        <FlowPath d="M156 242 L250 294 L335 250" delay={0.15} />
        <FlowPath d="M226 402 L315 449 L388 410 L410 335" delay={0.55} />
        <FlowPath d="M516 238 L575 205 L630 234 L652 202" delay={1.65} />
        <FlowPath d="M526 258 L665 184 L798 245" delay={2.05} />
        <FlowPath d="M526 282 L640 343 L720 300" delay={0} muted />
        <FlowPath d="M492 322 L548 352 L620 384" delay={2.45} />
      </g>

      <IsoNode delay={0.1} label="Console" meta="MANAGE · REVIEW" width={82} x={120} y={225} />
      <IsoNode delay={0.5} label="K8s Controller" meta="SYNC · INJECT" width={92} x={190} y={390} />
      <ControlPlane x={430} y={270} />
      <IsoNode delay={1.6} label="Rust SDK" meta="PROXYLESS" tone="blue" width={78} x={690} y={150} />
      <IsoNode labelPlacement="above" delay={2} label="Envoy / Gateway" meta="EXTERNAL · xDS v3" tone="external" width={94} x={840} y={245} />
      <IsoNode delay={2.4} label="Limiter Server" meta="DISTRIBUTED LIMITING" tone="dark" width={92} x={650} y={390} />
      <IsoNode delay={2.2} label="Pingora Sidecar" meta="DATA-PLANE SKELETON" width={92} x={760} y={305} />

      <text className={styles.pathLabel} x="205" y="263">MANAGEMENT API</text>
      <text className={styles.pathLabel} x="286" y="432">RESOURCE SYNC</text>
      <text className={styles.pathLabel} x="586" y="196">PROTOCOL VIEW</text>
    </svg>
  );
}

function ComponentCollaborationMobile() {
  return (
    <svg aria-hidden="true" className={`${styles.diagram} ${styles.mobileDiagram}`} viewBox="0 0 390 410">
      <defs>
        <pattern height="22" id="iso-grid-collaboration-mobile" patternUnits="userSpaceOnUse" width="22">
          <circle className={styles.gridDot} cx="1" cy="1" r="1" />
        </pattern>
      </defs>
      <rect className={styles.diagramBackground} height="410" width="390" />
      <rect fill="url(#iso-grid-collaboration-mobile)" height="410" width="390" />

      <polygon className={styles.zone} points="14,100 72,66 130,98 130,205 70,238 14,205" />
      <polygon className={styles.zone} points="118,212 196,166 271,207 271,285 195,329 118,285" />
      <polygon className={styles.zone} points="255,90 322,52 380,84 380,300 322,334 255,302" />

      <IsoRail height={30} label="SPECIFICATION · SHARED CONTRACT" width={230} x={210} y={374} />

      <FlowPath d="M82 102 L135 131 L151 195" delay={0.15} />
      <FlowPath d="M93 196 L132 217 L151 239" delay={0.5} />
      <FlowPath d="M239 207 L278 186 L297 111" delay={1.55} />
      <FlowPath d="M241 225 L284 248 L310 229" delay={0} muted />
      <FlowPath d="M220 277 L244 290 L281 323" delay={2.15} />
      <FlowPath d="M239 215 L296 184 L334 142" delay={1.9} />

      <IsoNode delay={0.1} label="Console" meta="MANAGE" width={60} x={58} y={88} />
      <IsoNode delay={0.45} label="Controller" meta="SYNC" width={64} x={70} y={182} />
      <ControlPlane compact height={66} width={138} x={195} y={225} />
      <IsoNode delay={1.5} label="Rust SDK" labelPlacement="above" tone="blue" width={56} x={315} y={92} />
      <IsoNode delay={1.85} label="Envoy" meta="xDS" tone="external" width={56} x={346} y={137} />
      <IsoNode delay={2.1} label="Sidecar" meta="EXTENSION" width={58} x={330} y={220} />
      <IsoNode delay={2.25} label="Limiter" meta="RUNTIME" tone="dark" width={60} x={300} y={315} />
    </svg>
  );
}

function GovernanceExecutionDesktop() {
  return (
    <svg aria-hidden="true" className={`${styles.diagram} ${styles.desktopDiagram}`} viewBox="0 0 960 520">
      <defs>
        <pattern height="28" id="iso-grid-governance-desktop" patternUnits="userSpaceOnUse" width="28">
          <circle className={styles.gridDot} cx="1" cy="1" r="1" />
        </pattern>
      </defs>
      <rect className={styles.diagramBackground} height="520" width="960" />
      <rect fill="url(#iso-grid-governance-desktop)" height="520" width="960" />

      <IsoZone label="MANAGEMENT PLANE" points="25,350 205,255 305,310 125,410" x={52} y={346} />
      <IsoZone label="GOVERNANCE CONTROL" points="285,280 455,185 625,275 455,372" x={312} y={278} />
      <IsoZone label="EXECUTION OPTIONS" points="590,220 705,120 830,175 855,300 715,410 600,350" x={615} y={216} />

      <FlowPath d="M109 350 L158 324 L164 324" delay={0.1} />
      <FlowPath d="M248 308 L328 350 L379 322" delay={0.65} />
      <FlowPath d="M538 232 L606 196 L654 170" delay={1.75} />
      <FlowPath d="M543 260 L665 260 L714 260" delay={0} muted />
      <FlowPath d="M538 288 L606 324 L648 348" delay={2.25} />
      <FlowPath d="M726 155 L785 187 L842 238" delay={3.2} />
      <FlowPath d="M786 260 L842 260" delay={0} muted />
      <FlowPath d="M732 365 L790 333 L842 282" delay={3.7} />

      <IsoNode delay={0.1} label="Platform Engineer" meta="DEFINE · REVIEW" width={92} x={82} y={360} />
      <IsoNode delay={0.6} label="Console / API" meta="PUBLISH" tone="blue" width={90} x={205} y={308} />
      <ControlPlane delay={1.3} x={455} y={260} />
      <IsoNode delay={1.7} label="Rust SDK" meta="IN-PROCESS" width={78} x={690} y={155} />
      <IsoNode delay={2} label="Pingora Sidecar" meta="EXTENSION PATH" width={92} x={750} y={260} />
      <IsoNode delay={2.2} label="Envoy / Gateway" meta="xDS DATA PLANE" width={94} x={690} y={365} />
      <IsoRail height={52} label="SERVICE CALL" meta="CALLER → UPSTREAM" tone="dark" width={120} x={885} y={260} />

      <text className={styles.pathLabel} x="272" y="326">PUBLISH GOVERNANCE</text>
      <text className={styles.pathLabel} x="562" y="223">DELIVER VIEW</text>
      <text className={styles.pathLabel} x="786" y="179">ENFORCE</text>
      <text className={styles.resultLabel} textAnchor="middle" x="480" y="474">PUBLISHED HERE · ENFORCED THERE</text>
    </svg>
  );
}

function GovernanceExecutionMobile() {
  return (
    <svg aria-hidden="true" className={`${styles.diagram} ${styles.mobileDiagram}`} viewBox="0 0 390 410">
      <defs>
        <pattern height="22" id="iso-grid-governance-mobile" patternUnits="userSpaceOnUse" width="22">
          <circle className={styles.gridDot} cx="1" cy="1" r="1" />
        </pattern>
      </defs>
      <rect className={styles.diagramBackground} height="410" width="390" />
      <rect fill="url(#iso-grid-governance-mobile)" height="410" width="390" />

      <polygon className={styles.zone} points="14,272 76,237 137,271 137,340 76,374 14,340" />
      <polygon className={styles.zone} points="112,225 195,177 277,222 277,301 195,349 112,303" />
      <polygon className={styles.zone} points="260,86 323,50 382,83 382,314 323,347 260,315" />

      <FlowPath d="M86 309 L130 333 L154 292" delay={0.2} />
      <FlowPath d="M238 210 L281 186 L301 105" delay={1.6} />
      <FlowPath d="M241 228 L291 255 L310 229" delay={0} muted />
      <FlowPath d="M220 278 L253 296 L284 324" delay={2.1} />
      <FlowPath d="M330 119 L352 131 L352 333" delay={2.9} />
      <FlowPath d="M340 229 L352 236" delay={0} muted />
      <FlowPath d="M319 324 L352 342" delay={3.4} />

      <IsoNode delay={0.15} label="Engineer / Console" meta="DEFINE · PUBLISH" tone="blue" width={92} x={65} y={300} />
      <ControlPlane compact height={68} width={142} x={195} y={235} />
      <IsoNode delay={1.55} label="Rust SDK" labelPlacement="above" width={58} x={315} y={95} />
      <IsoNode delay={1.9} label="Sidecar" meta="EXTENSION" width={60} x={330} y={220} />
      <IsoNode delay={2.1} label="Envoy" meta="xDS" width={58} x={305} y={315} />
      <IsoRail height={132} label="SERVICE" meta="CALL" tone="dark" width={42} x={360} y={230} />
    </svg>
  );
}

export function ComponentCollaborationDiagram({ large = false }: { large?: boolean }) {
  return (
    <DiagramFrame
      desktop={<ComponentCollaborationDesktop />}
      kind="collaboration"
      label="Lattice.Hub 组织组件 3D 等距协作图：Console 和 Kubernetes Controller 连接 Control Plane；Rust SDK、Limiter Server 与 Envoy 或 Gateway 使用当前已接入路径；Pingora Sidecar 以虚线表示演进接入；Specification 是共享契约底座。"
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
      label="治理能力 3D 等距生效图：平台工程师通过 Console 或 API 发布治理规则，Lattice.Hub Control Plane 向 Rust SDK、Pingora Sidecar 或 Envoy 与 Gateway 交付治理视图，由已接入执行组件在真实服务调用路径中按支持范围执行。"
      large={large}
      mobile={<GovernanceExecutionMobile />}
    />
  );
}
