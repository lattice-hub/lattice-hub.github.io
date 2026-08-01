'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { SiteLocale } from '@/lib/site-locale';
import { localizeHref } from '@/lib/site-locale';
import {
  ComponentCollaborationDiagram,
  GovernanceExecutionDiagram,
} from './ArchitectureDiagrams';
import { getArchitectureCopy } from './architectureLocale';
import styles from './ArchitectureFlow.module.css';

const slideOrder = [
  { id: 'governance', index: '01' },
  { id: 'collaboration', index: '02' },
] as const;

type ArchitectureFlowProps = {
  locale: SiteLocale;
};

export function ArchitectureFlow({ locale }: ArchitectureFlowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const copy = getArchitectureCopy(locale);
  const activeSlideDefinition = slideOrder[activeIndex];
  const activeSlide = copy.flow.slides[activeSlideDefinition.id];

  return (
    <figure
      aria-describedby="architecture-flow-description"
      aria-labelledby="architecture-flow-title"
      className={styles.architectureFlow}
      lang={locale}
    >
      <div className={styles.topbar}>
        <div className={styles.header}>
          <div>
            <span className={styles.kicker}>{copy.flow.kicker}</span>
            <strong id="architecture-flow-title">{copy.flow.title}</strong>
          </div>
        </div>

        <div className={styles.switcher} aria-label={copy.flow.topicSelector}>
          {slideOrder.map((slide, index) => (
            <button
              aria-controls="architecture-flow-canvas"
              aria-pressed={activeIndex === index}
              className={styles.switchButton}
              key={slide.id}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span>{slide.index}</span>
              {copy.flow.slides[slide.id].label}
            </button>
          ))}
        </div>
      </div>

      <div
        aria-label={copy.flow.frameStatus(
          activeIndex + 1,
          slideOrder.length,
          activeSlide.label,
        )}
        aria-live="polite"
        className={styles.canvas}
        id="architecture-flow-canvas"
        key={activeSlideDefinition.id}
        role="group"
      >
        {activeSlideDefinition.id === 'collaboration' ? (
          <ComponentCollaborationDiagram locale={locale} />
        ) : (
          <GovernanceExecutionDiagram locale={locale} />
        )}
      </div>

      <figcaption className={styles.caption} id="architecture-flow-description">
        <div>
          <span>{activeSlide.label}</span>
          <strong>{activeSlide.title}</strong>
          <p>{activeSlide.detail}</p>
        </div>
        <Link href={localizeHref('/architecture', locale)}>
          {copy.flow.viewArchitecture}
          <span aria-hidden="true">→</span>
        </Link>
      </figcaption>
    </figure>
  );
}
