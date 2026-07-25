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
    title: '让已接入的 AI 服务，沿调用链执行同一套治理意图。',
    detail:
      '以承载 Agent 的 Pole Service 为例：A/B 路由、限流、熔断、镜像与 Mock 由已接入数据面按支持范围执行；Pole Agent 的 Prompt 与模型凭据则独立发布和托管。',
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
