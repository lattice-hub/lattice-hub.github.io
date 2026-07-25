import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, GitBranch, Search, ShieldCheck } from 'lucide-react';

export function HomeHero() {
  return (
    <section className="hero" aria-labelledby="home-title">
      <div className="hero-copy">
        <p className="overline">Cloud native service governance</p>
        <h1 id="home-title">
          让服务治理，
          <br />
          拥有同一个控制面。
        </h1>
        <p className="hero-subtitle">
          Lattice Hub 统一运行环境、服务发现、配置发布、流量治理、身份与平台观测。
          兼容已有协议，也让控制面能力被 Agent 安全调用。
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/docs">
            开始阅读
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
          <Link className="button button-secondary" href="/components">
            查看组件生态
          </Link>
        </div>
        <div className="hero-proof" aria-label="已实现能力">
          <span>多协议接入</span>
          <span>九类治理能力</span>
          <span>MCP / A2A Registry</span>
        </div>
      </div>

      <div className="console-preview" aria-label="Lattice Hub 控制台产品界面示意">
        <div className="console-titlebar">
          <div className="console-brand">
            <span className="console-glyph" aria-hidden="true">L</span>
            <strong>Lattice.Hub</strong>
          </div>
          <div className="environment-switch">
            <span className="status-dot" aria-hidden="true" />
            运行环境
            <ChevronDown aria-hidden="true" size={13} />
          </div>
        </div>

        <div className="console-layout">
          <aside className="console-sidebar" aria-label="控制台导航示意">
            <span className="side-label">CONTROL PLANE</span>
            <span className="side-item is-active">服务概览</span>
            <span className="side-item">治理工作台</span>
            <span className="side-item">配置管理</span>
            <span className="side-item">平台监控</span>
            <span className="side-label">AI NATIVE</span>
            <span className="side-item">MCP 服务</span>
            <span className="side-item">A2A Agent</span>
          </aside>

          <div className="console-canvas">
            <div className="canvas-heading">
              <div>
                <span>运行环境 / Namespace</span>
                <h2>服务概览</h2>
              </div>
              <span className="preview-search"><Search aria-hidden="true" size={14} /> 搜索资源</span>
            </div>

            <div className="console-metrics">
              <article>
                <span>服务接入</span>
                <strong>多协议</strong>
                <small>注册 · 发现</small>
              </article>
              <article>
                <span>实例状态</span>
                <strong>双探测</strong>
                <small>心跳 · 主动探测</small>
              </article>
              <article>
                <span>发布模型</span>
                <strong>版本化</strong>
                <small>灰度 · 回滚</small>
              </article>
            </div>

            <div className="release-panel">
              <div className="release-panel-head">
                <div>
                  <span className="panel-label">GOVERNANCE RELEASE</span>
                  <h3>路由规则发布</h3>
                </div>
                <span className="release-state">编辑态与发布态分离</span>
              </div>
              <div className="release-track" aria-label="治理发布进度">
                <span className="is-done"><Check size={12} /> 草稿</span>
                <i />
                <span className="is-done"><Check size={12} /> 校验</span>
                <i />
                <span>灰度 / 全量</span>
              </div>
              <div className="rule-summary">
                <GitBranch aria-hidden="true" size={16} />
                <span>请求匹配条件</span>
                <strong>按目标实例分流</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="agent-strip">
          <div className="agent-strip-icon"><ShieldCheck aria-hidden="true" size={18} /></div>
          <div className="agent-strip-copy">
            <span>Pole Agent · 安全操作模式</span>
            <strong>配置差异已生成，确认后只保存草稿。</strong>
          </div>
          <span className="agent-strip-state">等待你确认</span>
        </div>
      </div>
    </section>
  );
}
