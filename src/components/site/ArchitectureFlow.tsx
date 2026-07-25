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
    id: 'collaboration',
    index: '01',
    label: '组件协作',
    title: '一个控制面，连接不同接入与执行组件。',
    detail:
      'Console 管理变化，Controller 连接 Kubernetes；已接入的 SDK 与代理运行时按部署形态消费控制面能力。',
  },
  {
    id: 'governance',
    index: '02',
    label: '治理生效',
    title: '规则在控制面发布，在运行时组件执行。',
    detail:
      'SDK 与 Envoy / Gateway 按当前支持范围执行治理；Sidecar 作为可扩展本地数据面，以虚线标出接入边界。',
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
      <div className={styles.header}>
        <div>
          <span className={styles.kicker}>ORGANIZATION ARCHITECTURE</span>
          <strong id="architecture-flow-title">组件如何协作</strong>
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

      <div
        aria-label={`第 ${activeIndex + 1} / ${slides.length} 帧：${activeSlide.label}`}
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
