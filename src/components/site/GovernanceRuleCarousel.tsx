'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { governanceRules } from '@/lib/site-content';

type GovernanceRuleCarouselProps = {
  paused?: boolean;
};

export function GovernanceRuleCarousel({ paused = false }: GovernanceRuleCarouselProps) {
  const [active, setActive] = useState(0);
  const rule = governanceRules[active];

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reducedMotion) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % governanceRules.length);
    }, 2300);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section className="product-panel governance-panel" aria-label="流量治理规则面板" data-spotlight>
      <div className="panel-header">
        <div>
          <span className="panel-kicker">Traffic governance</span>
          <h2>流量治理链路</h2>
        </div>
        <span className="panel-status">{rule.name}</span>
      </div>

      <div className="governance-body">
        <div className="rule-copy" aria-live="polite">
          <div className="rule-card is-active">
            <h3>{rule.name}</h3>
            <p>{rule.summary}</p>
            <div className="rl-meter" aria-hidden="true">
              <i style={{ '--meter': rule.variant === 'limit' ? '.64' : '.82' } as CSSProperties} />
            </div>
          </div>
          <div className="rule-dots" aria-label="治理规则轮播">
            {governanceRules.map((item, index) => (
              <button
                aria-label={`切换到${item.name}规则`}
                aria-current={index === active}
                className="rule-step"
                key={item.id}
                onClick={() => setActive(index)}
                type="button"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className={`topology topology-${rule.variant}`} aria-label={`${rule.name}规则拓扑`}>
          <div className="topology-node node-client">
            <span>client</span>
            <strong>{rule.clientLabel}</strong>
          </div>
          <div className="topology-node node-control">
            <span>控制面</span>
            <strong>{rule.controlLabel}</strong>
          </div>
          <div className="topology-node node-upstream-a">
            <span>上游 A</span>
            <strong>{rule.upstreamA}</strong>
          </div>
          <div className="topology-node node-upstream-b">
            <span>上游 B</span>
            <strong>{rule.upstreamB}</strong>
          </div>

          <div className="edge edge-client-control">{rule.variant === 'limit' ? '≤1000 rps' : ''}</div>
          <div className="edge edge-control-a">{rule.edgeA}</div>
          <div className="edge edge-control-b">{rule.edgeB}</div>
          <div className="edge-flow edge-flow-client-control" />
          <div className="edge-flow edge-flow-control-a" />
          <div className="edge-flow edge-flow-control-b" />
        </div>
      </div>
    </section>
  );
}
