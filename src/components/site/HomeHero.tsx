'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { governanceRules } from '@/lib/site-content';
import { GovernanceRuleCarousel } from './GovernanceRuleCarousel';

const AGENT_DURATION = 6000;
const RULE_DURATION = 2300;

const tracks = [
  {
    id: 'agent-discovery',
    label: 'Agent Discovery',
    eyebrow: 'Agent Discovery · Agent 发现',
    title: 'Agent 能力，\n注册即可发现。',
    subtitle: 'MCP / A2A 能力目录统一注册、发现与治理，让 Agent 像服务一样被纳管。',
    status: ['MCP Registry 已支持', 'A2A Agent Registry 规划中'],
  },
  {
    id: 'traffic-governance',
    label: 'Traffic Governance',
    eyebrow: 'Traffic Governance · 流量治理',
    title: '治理规则，\n沿链路生效。',
    subtitle: '路由、泳道、限流、熔断、镜像、Mock 与鉴权，在同一条控制面链路上改变流量路径。',
    status: ['七类治理规则统一拓扑', 'HTTP / gRPC / xDS 多协议入口'],
  },
];

export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const track = tracks[active];

  const go = (direction: -1 | 1) => {
    setActive((current) => (current + direction + tracks.length) % tracks.length);
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reducedMotion) {
      return undefined;
    }

    const timeout = window.setTimeout(
      () => setActive((current) => (current + 1) % tracks.length),
      active === 0 ? AGENT_DURATION : RULE_DURATION * governanceRules.length,
    );

    return () => window.clearTimeout(timeout);
  }, [active, paused]);

  return (
    <section
      className="hero hxc"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button className="hero-arrow hero-arrow-left" type="button" aria-label="上一屏" onClick={() => go(-1)}>
        ‹
      </button>
      <button className="hero-arrow hero-arrow-right" type="button" aria-label="下一屏" onClick={() => go(1)}>
        ›
      </button>

      <div className="hero-copy">
        <span className="hero-brand">Lattice Hub</span>
        <p className="eyebrow">{track.eyebrow}</p>
        <h1>{track.title}</h1>
        <p className="hero-subtitle">{track.subtitle}</p>
        <div className="hero-actions">
          <Link className="button-primary btn btn-primary btn-arrow" data-magnetic href="/docs">
            <span>阅读文档</span>
            <ArrowRight size={22} strokeWidth={2.6} />
          </Link>
          <Link className="button-secondary btn btn-secondary" data-magnetic href="/components">
            <span aria-hidden="true">↗</span>
            浏览组件生态
          </Link>
        </div>
        <div className="hero-status" aria-label="当前进度">
          {track.status.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="hero-product" aria-label="双主线产品展示">
        {active === 0 ? <AgentRegistryVisual /> : <GovernanceRuleCarousel paused={paused} />}
      </div>

      <div className="hero-pager" role="tablist" aria-label="首页双主线">
        {tracks.map((item, index) => (
          <button
            aria-label={`切换到${item.label}`}
            aria-selected={index === active}
            className="hero-page-dot"
            style={{ '--hx-dur': `${index === 0 ? AGENT_DURATION : RULE_DURATION * governanceRules.length}ms` } as CSSProperties}
            key={item.id}
            onClick={() => setActive(index)}
            role="tab"
            type="button"
          />
        ))}
      </div>

      <div className="track-tabs sr-only" role="tablist" aria-label="首页双主线备用标签">
          {tracks.map((track, index) => (
            <button
              aria-controls={`${track.id}-panel`}
              aria-selected={index === active}
              className="track-tab"
              id={`${track.id}-tab`}
              key={track.id}
              onClick={() => setActive(index)}
              role="tab"
              type="button"
            >
              {track.label}
            </button>
          ))}
      </div>
    </section>
  );
}

function AgentRegistryVisual() {
  return (
    <div className="agent-graph hx-art" aria-label="Agent Registry 关系图" data-spotlight>
      <svg viewBox="0 0 720 420" role="img" aria-labelledby="agent-graph-title">
        <title id="agent-graph-title">MCP 与 A2A 能力注册到 Registry 后被 Agent 发现</title>
        <defs>
          <filter id="nodeShadow" x="-20%" y="-40%" width="140%" height="180%">
            <feDropShadow dx="0" dy="16" floodColor="#2f5dff" floodOpacity="0.08" stdDeviation="18" />
          </filter>
        </defs>

        <path className="flow-line" d="M174 112 C276 112 296 202 360 202" />
        <path className="flow-dash" d="M174 112 C276 112 296 202 360 202" />
        <path className="flow-line" d="M174 308 C276 308 296 218 360 218" />
        <path className="flow-dash" d="M174 308 C276 308 296 218 360 218" />
        <path className="flow-line" d="M546 112 C444 112 424 202 360 202" />
        <path className="flow-dash" d="M546 112 C444 112 424 202 360 202" />
        <path className="flow-line" d="M546 308 C444 308 424 218 360 218" />
        <path className="flow-dash" d="M546 308 C444 308 424 218 360 218" />

        <g className="dg-node" filter="url(#nodeShadow)" transform="translate(42 74)">
          <rect width="132" height="76" />
          <text x="24" y="33">search</text>
          <text className="muted" x="24" y="56">MCP Server</text>
        </g>
        <g className="dg-node" filter="url(#nodeShadow)" transform="translate(42 270)">
          <rect width="132" height="76" />
          <text x="24" y="33">database</text>
          <text className="muted" x="24" y="56">MCP Server</text>
        </g>
        <g className="dg-node is-dashed" filter="url(#nodeShadow)" transform="translate(546 74)">
          <rect width="132" height="76" />
          <text x="24" y="33">planner</text>
          <text className="muted" x="24" y="56">A2A · 规划</text>
        </g>
        <g className="dg-node is-dashed" filter="url(#nodeShadow)" transform="translate(546 270)">
          <rect width="132" height="76" />
          <text x="24" y="33">worker</text>
          <text className="muted" x="24" y="56">A2A · 规划</text>
        </g>
        <g className="registry-core" filter="url(#nodeShadow)" transform="translate(292 166)">
          <rect width="136" height="108" />
          <text x="68" y="48" textAnchor="middle">Registry</text>
          <text className="muted" x="68" y="72" textAnchor="middle">capability index</text>
        </g>
      </svg>
    </div>
  );
}
