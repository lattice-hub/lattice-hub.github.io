'use client';

import { Pause, Play, RotateCcw } from 'lucide-react';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './ArchitectureFlow.module.css';

const topologySteps = [
  {
    index: '01',
    label: '入口',
    detail: '协议客户端、Console / API 与 Kubernetes Controller 汇入协议接入层。',
  },
  {
    index: '02',
    label: '模型',
    detail: 'Environment / Namespace 统一承载 Service、Config、Governance 与 MCP / A2A Registry。',
  },
  {
    index: '03',
    label: '确认',
    detail: 'Pole Agent 的已有配置更新提案经人工确认后只保存为 Config Draft。',
  },
  {
    index: '04',
    label: '生效',
    detail: '只有配置与治理通过发布门禁形成 Version，再切换为 Active View。',
  },
  {
    index: '05',
    label: '消费',
    detail: 'SDK、协议客户端、Sidecar 与 Envoy / Gateway / Mesh 按实现范围消费运行时视图。',
  },
] as const;

type IsoNodeProps = {
  x: number;
  y: number;
  label: string;
  meta?: string;
  width?: number;
  height?: number;
  depth?: number;
  delay?: number;
  tone?: 'paper' | 'blue' | 'dark';
  className?: string;
  labelPlacement?: 'above' | 'below';
};

function IsoNode({
  x,
  y,
  label,
  meta,
  width = 62,
  height = 30,
  depth = 10,
  delay = 0,
  tone = 'paper',
  className = '',
  labelPlacement = 'below',
}: IsoNodeProps) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const labelY = labelPlacement === 'above'
    ? -halfHeight - 9
    : halfHeight + depth + 18;
  const metaY = labelPlacement === 'above'
    ? labelY - 14
    : labelY + 14;
  const animationStyle = { '--node-delay': `${delay}s` } as CSSProperties;

  return (
    <g className={`${styles.isoNode} ${className}`} transform={`translate(${x} ${y})`}>
      <g className={styles.nodeLift} data-node={label} style={animationStyle}>
        <polygon
          className={styles.nodeLeft}
          points={`${-halfWidth},0 0,${halfHeight} 0,${halfHeight + depth} ${-halfWidth},${depth}`}
        />
        <polygon
          className={styles.nodeRight}
          points={`0,${halfHeight} ${halfWidth},0 ${halfWidth},${depth} 0,${halfHeight + depth}`}
        />
        <polygon
          className={`${styles.nodeTop} ${styles[`nodeTop${tone}`]}`}
          points={`0,${-halfHeight} ${halfWidth},0 0,${halfHeight} ${-halfWidth},0`}
        />
      </g>
      <text className={styles.nodeLabel} textAnchor="middle" y={labelY}>
        {label}
      </text>
      {meta ? (
        <text className={styles.nodeMeta} textAnchor="middle" y={metaY}>
          {meta}
        </text>
      ) : null}
    </g>
  );
}

type FlowPathProps = {
  d: string;
  delay: number;
  duration?: number;
  dashed?: boolean;
  quiet?: boolean;
};

function FlowPath({ d, delay, duration = 1.1, dashed = false, quiet = false }: FlowPathProps) {
  const animationStyle = {
    '--path-delay': `${delay}s`,
    '--path-duration': `${duration}s`,
  } as CSSProperties;

  return (
    <>
      <path
        className={`${styles.connection} ${dashed ? styles.connectionDashed : ''}`}
        d={d}
        pathLength="1"
      />
      {!quiet ? (
        <>
          <path
            className={styles.connectionActive}
            d={d}
            pathLength="1"
            style={animationStyle}
          />
          <path
            className={styles.dataPacket}
            d={d}
            pathLength="1"
            style={animationStyle}
          />
        </>
      ) : null}
    </>
  );
}

function DesktopTopology() {
  return (
    <svg
      aria-hidden="true"
      className={styles.desktopTopology}
      preserveAspectRatio="xMidYMid meet"
      viewBox="40 80 820 450"
    >
      <defs>
        <pattern height="28" id="topology-dot-grid" patternUnits="userSpaceOnUse" width="28">
          <circle className={styles.gridDot} cx="1" cy="1" r="1" />
        </pattern>
      </defs>

      <rect fill="url(#topology-dot-grid)" height="530" width="920" />

      <polygon
        className={styles.zone}
        points="34,351 226,249 372,326 177,435"
      />
      <polygon
        className={`${styles.zone} ${styles.zoneControl}`}
        points="250,252 506,116 734,236 477,378"
      />
      <polygon
        className={styles.zone}
        points="610,275 790,180 902,240 902,330 718,423 575,347"
      />

      <text className={styles.zoneLabel} transform="rotate(-28 58 345)" x="58" y="345">
        CHANGE SOURCES
      </text>
      <text className={styles.zoneLabel} transform="rotate(-28 284 249)" x="284" y="249">
        UNIFIED CONTROL PLANE
      </text>
      <text className={styles.zoneLabel} transform="rotate(-28 608 334)" x="608" y="334">
        RUNTIME CONSUMERS
      </text>

      <g className={styles.connections}>
        <FlowPath d="M85 350 L236 375 L360 335" delay={0.2} />
        <FlowPath d="M120 245 L274 326 L360 335" delay={0.55} />
        <FlowPath d="M230 475 L310 418 L360 335" delay={0.9} />
        <FlowPath d="M360 335 L482 293" delay={1.45} />
        <FlowPath d="M482 293 L625 155 L690 212" delay={3.05} duration={1.2} />
        <FlowPath d="M690 212 L730 248" delay={4.75} />
        <FlowPath d="M730 248 L800 175" delay={6.25} />
        <FlowPath d="M730 248 L815 300" delay={6.55} />
        <FlowPath d="M730 248 L760 400" delay={6.85} />

        <FlowPath d="M150 450 L294 500 L495 395 L548 330 L625 155" delay={1.8} dashed quiet />
        <FlowPath d="M482 293 L385 180" delay={2.2} quiet />
        <FlowPath d="M482 293 L480 145" delay={2.3} quiet />
        <FlowPath d="M482 293 L575 180" delay={2.4} quiet />
        <FlowPath d="M482 293 L480 405" delay={2.5} quiet />
        <FlowPath d="M480 405 L575 425 L680 300" delay={3.4} quiet />
      </g>

      <g className={styles.sourceNodes}>
        <IsoNode delay={0.15} label="Console / API" meta="MANAGE" width={72} x={120} y={245} />
        <IsoNode delay={0.45} label="Protocols" meta="POLARIS · NACOS · xDS" width={76} x={85} y={350} />
        <IsoNode delay={0.75} label="K8s Controller" width={76} x={230} y={475} />
        <IsoNode
          className={styles.agentNode}
          delay={2.7}
          label="Pole Agent → Draft"
          width={80}
          x={150}
          y={450}
        />
      </g>

      <g className={styles.controlPlane}>
        <g className={styles.corePlatform} transform="translate(482 293)">
          <g className={styles.coreLift} data-node="Lattice.Hub control plane">
            <polygon className={styles.coreLeft} points="-104,0 0,54 0,72 -104,18" />
            <polygon className={styles.coreRight} points="0,54 104,0 104,18 0,72" />
            <polygon className={styles.coreTop} points="0,-54 104,0 0,54 -104,0" />
            <polygon className={styles.coreInset} points="0,-39 75,0 0,39 -75,0" />
            <text className={styles.coreTitle} textAnchor="middle" y="-4">
              LATTICE.HUB
            </text>
            <text className={styles.coreMeta} textAnchor="middle" y="13">
              ENVIRONMENT / NAMESPACE
            </text>
          </g>
        </g>

        <IsoNode delay={1.35} label="Ingress" meta="PROTOCOL ADAPTERS" width={68} x={360} y={335} />
        <IsoNode delay={1.75} label="Service" width={55} x={385} y={180} />
        <IsoNode delay={1.85} label="Config" width={55} x={480} y={145} />
        <IsoNode delay={1.95} label="Governance" width={62} x={575} y={180} />
        <IsoNode
          delay={2.05}
          label="MCP / A2A"
          meta="REGISTER · DISCOVER"
          width={68}
          x={480}
          y={405}
        />
      </g>

      <g className={styles.releaseBridge}>
        <text className={styles.bridgeLabel} textAnchor="middle" x="650" y="105">
          CONFIG + GOVERNANCE ONLY
        </text>
        <IsoNode delay={3.0} label="Draft" labelPlacement="above" width={50} x={625} y={155} />
        <g className={styles.gate} transform="translate(660 177)">
          <g className={styles.gateStamp} data-node="Human Gate">
            <polygon points="0,-13 22,0 0,13 -22,0" />
            <text textAnchor="middle" y="4">H</text>
          </g>
          <text className={styles.gateLabel} textAnchor="middle" y="31">
            HUMAN GATE
          </text>
        </g>
        <IsoNode delay={4.0} label="Version" labelPlacement="above" width={54} x={690} y={212} />
        <g transform="translate(680 300)">
          <g className={styles.historyStack}>
            <polygon points="0,-12 24,0 0,12 -24,0" />
            <polygon points="0,-18 24,-6 0,6 -24,-6" />
            <text className={styles.historyLabel} textAnchor="middle" y="31">
              HISTORY
            </text>
          </g>
        </g>
        <IsoNode
          className={styles.activeNode}
          delay={4.75}
          label="Active View"
          tone="blue"
          width={66}
          x={730}
          y={248}
        />
      </g>

      <g className={styles.runtimeNodes}>
        <IsoNode delay={6.3} label="Thin SDK" meta="PROTOCOL CLIENTS" width={66} x={800} y={175} />
        <IsoNode delay={6.6} label="Sidecar" meta="LOCAL PROXY" width={64} x={815} y={300} />
        <IsoNode delay={6.9} label="Proxy Mesh" meta="ENVOY · GATEWAY" width={70} x={760} y={400} />
      </g>
    </svg>
  );
}

function MobileTopology() {
  return (
    <svg
      aria-hidden="true"
      className={styles.mobileTopology}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 105 390 390"
    >
      <polygon className={styles.zone} points="22,333 105,286 167,319 82,369" />
      <polygon className={`${styles.zone} ${styles.zoneControl}`} points="96,257 207,195 300,244 188,308" />
      <polygon className={styles.zone} points="263,194 346,148 382,168 382,341 307,416 252,383" />

      <g className={styles.connections}>
        <FlowPath d="M67 341 L127 309 L188 342 L201 277" delay={0.2} />
        <FlowPath d="M61 398 L132 438 L226 334 L282 210" delay={0.8} dashed quiet />
        <FlowPath d="M201 277 L282 210 L330 242" delay={2.6} />
        <FlowPath d="M330 242 L350 158" delay={4.7} />
        <FlowPath d="M330 242 L345 326" delay={5.6} />
        <FlowPath d="M330 242 L304 408" delay={6.1} />
      </g>

      <IsoNode delay={0.2} label="Protocols + Console" meta="CONTROLLER / SYNC" width={76} x={67} y={341} />
      <IsoNode
        className={styles.agentNode}
        delay={2.2}
        label="Agent → Draft"
        width={54}
        x={61}
        y={398}
      />

      <g className={styles.corePlatform} transform="translate(201 277)">
        <g className={styles.coreLift} data-node="Lattice.Hub control plane mobile">
          <polygon className={styles.coreLeft} points="-71,0 0,37 0,51 -71,14" />
          <polygon className={styles.coreRight} points="0,37 71,0 71,14 0,51" />
          <polygon className={styles.coreTop} points="0,-37 71,0 0,37 -71,0" />
          <polygon className={styles.coreInset} points="0,-25 48,0 0,25 -48,0" />
          <text className={styles.coreTitle} textAnchor="middle" y="-3">
            LATTICE.HUB
          </text>
          <text className={styles.coreMeta} textAnchor="middle" y="12">
            CONTROL PLANE
          </text>
        </g>
      </g>

      <IsoNode delay={2.6} label="Draft" labelPlacement="above" width={42} x={282} y={210} />
      <g className={styles.gate} transform="translate(305 223)">
        <g className={styles.gateStamp} data-node="Human Gate mobile">
          <polygon points="0,-9 15,0 0,9 -15,0" />
          <text textAnchor="middle" y="3">H</text>
        </g>
      </g>
      <IsoNode
        className={styles.activeNode}
        delay={4.7}
        label="Active"
        tone="blue"
        width={46}
        x={330}
        y={242}
      />

      <IsoNode delay={5.0} label="SDK" width={46} x={350} y={158} />
      <IsoNode delay={5.7} label="Sidecar" width={48} x={345} y={326} />
      <IsoNode delay={6.2} label="Mesh" width={46} x={304} y={408} />

      <text className={styles.mobileBoundary} x="23" y="482">
        CONFIG + GOVERNANCE → VERSION · REGISTRY → DISCOVERY ONLY
      </text>
    </svg>
  );
}

export function ArchitectureFlow() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileLayout = window.matchMedia('(max-width: 720px)');
    const initialFrame = window.requestAnimationFrame(() => {
      setReducedMotion(motionPreference.matches);
      setDocumentHidden(document.hidden);
    });
    const handleMotionPreference = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    const handleLayoutChange = () => setCycle((current) => current + 1);
    const handleVisibility = () => setDocumentHidden(document.hidden);
    const observer = root
      ? new IntersectionObserver(
          ([entry]) => setOffscreen(entry.intersectionRatio < 0.16),
          { threshold: 0.16 },
        )
      : null;

    if (root) observer?.observe(root);
    motionPreference.addEventListener('change', handleMotionPreference);
    mobileLayout.addEventListener('change', handleLayoutChange);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      observer?.disconnect();
      motionPreference.removeEventListener('change', handleMotionPreference);
      mobileLayout.removeEventListener('change', handleLayoutChange);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const animationPaused = userPaused || offscreen || documentHidden || reducedMotion;
  const state = reducedMotion
    ? 'reduced'
    : completed
      ? 'completed'
      : animationPaused
        ? 'paused'
        : 'running';

  const handleControl = () => {
    if (completed) {
      setCycle((current) => current + 1);
      setCompleted(false);
      setUserPaused(false);
      return;
    }

    setUserPaused((current) => !current);
  };

  const controlLabel = completed
    ? '重新播放架构动画'
    : userPaused
      ? '播放架构动画'
      : '暂停架构动画';

  return (
    <figure
      aria-describedby="architecture-flow-description"
      aria-labelledby="architecture-flow-title"
      className={styles.architectureFlow}
      data-state={state}
      ref={rootRef}
    >
      <header className={styles.heading}>
        <span id="architecture-flow-title">CONTROL PLANE TOPOLOGY</span>
        <small>01 — 05 / ONE CONTROL PLANE VIEW</small>
      </header>

      <div
        aria-hidden="true"
        className={styles.canvas}
        id="architecture-flow-canvas"
        key={cycle}
        onAnimationEnd={(event) => {
          if (
            event.target instanceof HTMLElement
            && event.target.dataset.completionSentinel !== undefined
          ) {
            setCompleted(true);
          }
        }}
      >
        <DesktopTopology />
        <MobileTopology />
        <span className={styles.completionSentinel} data-completion-sentinel="" />
      </div>

      <ol className={styles.stageLegend} aria-hidden="true">
        {topologySteps.map((step) => (
          <li key={step.index}>
            <span>{step.index}</span>
            {step.label}
          </li>
        ))}
      </ol>

      <figcaption className={styles.caption} id="architecture-flow-description">
        <p>
          架构流程示意，不代表实时遥测。仅配置与治理进入版本发布链；服务与 Registry
          使用各自生命周期，Pole Agent 提案止于人工确认后的 Config Draft。
        </p>
        {reducedMotion ? (
          <span className={styles.motionState}>已按系统设置显示静态视图</span>
        ) : (
          <button
            aria-controls="architecture-flow-canvas"
            aria-label={controlLabel}
            className={styles.control}
            onClick={handleControl}
            type="button"
          >
            {completed ? (
              <RotateCcw aria-hidden="true" size={16} />
            ) : userPaused ? (
              <Play aria-hidden="true" size={16} />
            ) : (
              <Pause aria-hidden="true" size={16} />
            )}
            <span>{completed ? '重新播放' : userPaused ? '继续' : '暂停'}</span>
          </button>
        )}
      </figcaption>

      <ol className={styles.accessibleSteps}>
        {topologySteps.map((step) => (
          <li key={step.index}>
            {step.index} {step.label}：{step.detail}
          </li>
        ))}
        <li>Polaris、Nacos、Apollo、Eureka 与 xDS v3 通过协议接入层进入统一控制面。</li>
        <li>MCP / A2A Registry 只负责注册与发现，不进入配置和治理的版本发布链。</li>
        <li>MySQL 是事实来源，CacheManager 增量刷新，EventHub 承担资源事件与发布通知。</li>
        <li>Active 与 History 分离，并通过选择已知版本执行显式回滚。</li>
      </ol>
      <noscript>
        <style>{'button[aria-controls="architecture-flow-canvas"]{display:none!important}'}</style>
      </noscript>
    </figure>
  );
}
