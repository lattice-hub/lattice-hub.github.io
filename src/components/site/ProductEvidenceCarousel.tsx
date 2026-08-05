'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './InteriorPage.module.css';

export type ProductEvidenceSlide = {
  src: string;
  srcDark: string;
  label: string;
  note: string;
  alt: string;
};

type ProductEvidenceCarouselProps = {
  slides: ProductEvidenceSlide[];
  disclaimer: string;
  regionLabel: string;
  expandLabel: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const AUTO_MS = 4500;

function relativeOffset(slideIndex: number, activeIndex: number, total: number) {
  let offset = slideIndex - activeIndex;
  const half = total / 2;
  if (offset > half) offset -= total;
  if (offset < -half) offset += total;
  return offset;
}

function slidePosition(offset: number) {
  if (offset === 0) return 'active' as const;
  if (offset === -1) return 'prev' as const;
  if (offset === 1) return 'next' as const;
  return 'far' as const;
}

export function ProductEvidenceCarousel({
  slides,
  disclaimer,
  regionLabel,
  expandLabel,
  closeLabel,
  prevLabel,
  nextLabel,
}: ProductEvidenceCarouselProps) {
  const { resolvedTheme } = useTheme();
  const titleId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const slide = slides[index] ?? slides[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (slides.length < 2 || paused || lightboxOpen) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [slides.length, paused, index, lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false);
        return;
      }
      if (event.key === 'ArrowLeft') {
        setIndex((current) => (current - 1 + slides.length) % slides.length);
        return;
      }
      if (event.key === 'ArrowRight') {
        setIndex((current) => (current + 1) % slides.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxOpen, slides.length]);

  if (!slide) return null;

  const isDark = mounted && resolvedTheme === 'dark';
  const activeSrc = `${basePath}${isDark ? slide.srcDark : slide.src}`;

  return (
    <div
      aria-label={regionLabel}
      aria-live="polite"
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      role="region"
    >
      <div className={styles.carouselStage}>
        {slides.map((item, slideIndex) => {
          const offset = relativeOffset(slideIndex, index, slides.length);
          const position = slidePosition(offset);
          const src = `${basePath}${isDark ? item.srcDark : item.src}`;
          const isSide = position === 'prev' || position === 'next';
          const isActive = position === 'active';

          return (
            <button
              aria-current={isActive ? 'true' : undefined}
              aria-hidden={position === 'far' ? true : undefined}
              aria-label={
                isActive ? `${expandLabel}：${item.label}` : isSide ? item.label : undefined
              }
              className={`${styles.carouselSlide} ${styles[`carouselSlide_${position}`]}`}
              key={item.src}
              onClick={() => {
                if (isSide) {
                  setIndex(slideIndex);
                  return;
                }
                if (isActive) setLightboxOpen(true);
              }}
              tabIndex={isSide || isActive ? 0 : -1}
              type="button"
            >
              <span className={`${styles.productFrame} ${styles.carouselFrame}`}>
                <Image
                  alt={isActive ? item.alt : ''}
                  height={1000}
                  priority={slideIndex === 0}
                  sizes="(max-width: 720px) 92vw, 920px"
                  src={src}
                  width={1600}
                />
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.carouselBar}>
        <p className={styles.carouselCaption}>
          <span>{slide.label}</span>
          <span aria-hidden="true">·</span>
          <span>{slide.note}</span>
        </p>
        <div className={styles.carouselDots} role="tablist">
          {slides.map((item, slideIndex) => (
            <button
              aria-label={item.label}
              aria-selected={slideIndex === index}
              className={slideIndex === index ? styles.carouselDotActive : styles.carouselDot}
              key={item.src}
              onClick={() => setIndex(slideIndex)}
              role="tab"
              type="button"
            />
          ))}
        </div>
      </div>
      <p className={styles.carouselDisclaimer}>{disclaimer}</p>

      {mounted && lightboxOpen
        ? createPortal(
            <div
              className={styles.lightbox}
              onClick={() => setLightboxOpen(false)}
              role="presentation"
            >
              <div
                aria-labelledby={titleId}
                aria-modal="true"
                className={styles.lightboxDialog}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
              >
                <div className={styles.lightboxTop}>
                  <p className={styles.carouselCaption} id={titleId}>
                    <span>{slide.label}</span>
                    <span aria-hidden="true">·</span>
                    <span>{slide.note}</span>
                  </p>
                  <button
                    aria-label={closeLabel}
                    className={styles.lightboxClose}
                    onClick={() => setLightboxOpen(false)}
                    type="button"
                  >
                    ×
                  </button>
                </div>

                <div className={styles.lightboxFrame}>
                  <Image
                    alt={slide.alt}
                    height={1000}
                    priority
                    sizes="96vw"
                    src={activeSrc}
                    width={1600}
                  />
                </div>

                {slides.length > 1 ? (
                  <div className={styles.lightboxNav}>
                    <button
                      aria-label={prevLabel}
                      className={styles.lightboxNavButton}
                      onClick={() =>
                        setIndex((current) => (current - 1 + slides.length) % slides.length)
                      }
                      type="button"
                    >
                      ←
                    </button>
                    <span className={styles.lightboxCount}>
                      {index + 1} / {slides.length}
                    </span>
                    <button
                      aria-label={nextLabel}
                      className={styles.lightboxNavButton}
                      onClick={() => setIndex((current) => (current + 1) % slides.length)}
                      type="button"
                    >
                      →
                    </button>
                  </div>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
