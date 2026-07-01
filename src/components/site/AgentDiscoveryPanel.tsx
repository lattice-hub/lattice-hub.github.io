'use client';

import { agentCapabilities } from '@/lib/site-content';

export function AgentDiscoveryPanel() {
  return (
    <section className="product-panel" aria-label="Agent 能力发现面板">
      <div className="panel-header">
        <div>
          <span className="panel-kicker">Capability registry</span>
          <h2>Agent 能力发现</h2>
        </div>
        <span className="panel-status">4 modules</span>
      </div>
      <div className="capability-table" role="table" aria-label="能力目录">
        <div className="capability-row capability-row-head" role="row">
          <span>Module</span>
          <span>Protocol</span>
          <span>Status</span>
        </div>
        {agentCapabilities.map((item) => (
          <div className="capability-row" role="row" key={item.name}>
            <span>
              <strong>{item.name}</strong>
              <small>{item.summary}</small>
            </span>
            <span>{item.protocol}</span>
            <span>
              <i data-status={item.status}>{item.status}</i>
            </span>
          </div>
        ))}
      </div>
      <p className="panel-note">
        MCP/A2A 是能力注册与发现入口，权限、协议映射和资源边界仍由控制面统一约束。
      </p>
    </section>
  );
}
