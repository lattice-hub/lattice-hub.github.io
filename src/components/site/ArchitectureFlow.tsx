'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ComponentCollaborationDiagram,
  GovernanceExecutionDiagram,
} from './ArchitectureDiagrams';
import styles from './ArchitectureFlow.module.css';

const slides = [
  {
    id: 'governance',
    index: '01',
    label: '治理生效',
    title: '规则发布一次，在已接入的跨服务调用点生效。',
    detail:
      '以 Java、Rust、Go 与 Python 服务调用为示例：Control Plane 分发统一治理视图，SDK、Sidecar 或 Envoy 在已接入且支持对应能力的执行点落实路由、保护与访问策略。',
  },
  {
    id: 'collaboration',
    index: '02',
    label: '组件协作',
    title: '一个控制面，连接不同接入与执行组件。',
    detail:
      'Console 管理变化，Controller 连接 Kubernetes；已接入的 SDK 与代理运行时按部署形态消费控制面能力。',
  },
] as const;

export function ArchitectureFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  return (
    <figure
      aria-describedby="architecture-flow-description"
      aria-labelledby="architecture-flow-title"
      className={styles.architectureFlow}
    >
      <div className={styles.topbar}>
        <div className={styles.header}>
          <div>
            <span className={styles.kicker}>ORGANIZATION ARCHITECTURE</span>
            <strong id="architecture-flow-title">治理与组件全景</strong>
          </div>
          <span className={styles.counter} aria-hidden="true">
            {activeSlide.index} / 02
          </span>
        </div>

        <div className={styles.switcher} aria-label="选择架构主题">
          {slides.map((slide, index) => (
            <button
              aria-controls="architecture-flow-canvas"
              aria-pressed={activeIndex === index}
              className={styles.switchButton}
              key={slide.id}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span>{slide.index}</span>
              {slide.label}
            </button>
          ))}
        </div>
      </div>

      <div
        aria-label={`第 ${activeIndex + 1} / ${slides.length} 帧：${activeSlide.label}`}
        aria-live="polite"
        className={styles.canvas}
        id="architecture-flow-canvas"
        key={activeSlide.id}
        role="group"
      >
        {activeSlide.id === 'collaboration' ? (
          <ComponentCollaborationDiagram />
        ) : (
          <GovernanceExecutionDiagram />
        )}
      </div>

      <figcaption className={styles.caption} id="architecture-flow-description">
        <div>
          <span>{activeSlide.label}</span>
          <strong>{activeSlide.title}</strong>
          <p>{activeSlide.detail}</p>
        </div>
        <Link href="/architecture">
          查看完整架构
          <span aria-hidden="true">→</span>
        </Link>
      </figcaption>
    </figure>
  );
}
