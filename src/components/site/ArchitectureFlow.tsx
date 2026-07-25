'use client';

import { Pause, Play, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './ArchitectureFlow.module.css';

const stages = [
  {
    index: '01',
    label: '入口汇入',
    labelEn: 'ENTER',
    detail: '协议客户端、Console / API 与 Kubernetes Controller 进入同一个控制面。',
    meta: 'Polaris · Nacos · Apollo · Eureka · xDS v3',
  },
  {
    index: '02',
    label: '统一模型',
    labelEn: 'MODEL',
    detail: 'Environment / Namespace 统一承载服务、配置与治理；MCP / A2A 目录只负责注册发现。',
    meta: 'MCP + A2A / REGISTER & DISCOVER ONLY',
  },
  {
    index: '03',
    label: '确认与版本',
    labelEn: 'VERIFY',
    detail: '配置提案先经人工确认进入 Draft；配置与治理再经发布门禁形成 Version。',
    meta: 'PROPOSAL CONFIRM → DRAFT / RELEASE GATE → VERSION',
  },
  {
    index: '04',
    label: '生效视图',
    labelEn: 'ACTIVATE',
    detail: 'Active 与 History 分离；选择已知版本显式回滚，不把旧状态重新猜一遍。',
    meta: 'ACTIVE VIEW · EXPLICIT ROLLBACK',
  },
  {
    index: '05',
    label: '运行时消费',
    labelEn: 'CONSUME',
    detail: 'SDK / 协议客户端、Sidecar 与 Envoy / Gateway / Mesh 按支持范围消费。',
    meta: 'ONE CONTROL PLANE VIEW',
  },
] as const;

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
    const initialFrame = window.requestAnimationFrame(() => {
      setReducedMotion(motionPreference.matches);
      setDocumentHidden(document.hidden);
    });
    const handleMotionPreference = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    const handleVisibility = () => setDocumentHidden(document.hidden);
    const observer = root
      ? new IntersectionObserver(
          ([entry]) => setOffscreen(entry.intersectionRatio < 0.16),
          { threshold: 0.16 },
        )
      : null;

    if (root) observer?.observe(root);
    motionPreference.addEventListener('change', handleMotionPreference);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      observer?.disconnect();
      motionPreference.removeEventListener('change', handleMotionPreference);
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
        <div>
          <span>ARCHITECTURE / CHANGE RELAY</span>
          <strong id="architecture-flow-title">从变化，到确定的运行时视图。</strong>
        </div>
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
        <div className={styles.spine}>
          <span />
          <i data-relay-marker="" />
        </div>
        <span className={styles.completionSentinel} data-completion-sentinel="" />

        <div className={styles.stageGrid}>
          {stages.map((stage) => (
            <section className={styles.stage} key={stage.index}>
              <div className={styles.stageIndex}>
                <span>{stage.index}</span>
                <small>{stage.labelEn}</small>
              </div>
              <div className={styles.stageCopy}>
                <h3>{stage.label}</h3>
                <p>{stage.detail}</p>
                <small>{stage.meta}</small>
              </div>
            </section>
          ))}
        </div>

      </div>

      <figcaption className={styles.caption} id="architecture-flow-description">
        <p>
          架构流程示意，不代表实时遥测。只有配置与治理进入版本发布链；Pole Agent
          确认提案后只保存已有配置的编辑态草稿，正式发布仍由用户另行确认。
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
        {stages.map((stage) => (
          <li key={stage.index}>
            {stage.label}：{stage.detail} {stage.meta}。
          </li>
        ))}
        <li>Pole Agent 只通过 Pole MCP 白名单读取生成已有配置更新提案，人工确认后只进入 Config Draft。</li>
        <li>MySQL 是事实来源，CacheManager 增量刷新，EventHub 承担资源事件与发布通知。</li>
      </ol>
    </figure>
  );
}
