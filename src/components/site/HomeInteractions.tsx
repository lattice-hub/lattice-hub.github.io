'use client';

import { useEffect } from 'react';

export function HomeInteractions() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (reducedMotion || coarsePointer) {
      return undefined;
    }

    const spotlightItems = Array.from(document.querySelectorAll<HTMLElement>('[data-spotlight]'));
    const magneticItems = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
    const cleanups: Array<() => void> = [];

    spotlightItems.forEach((item) => {
      const handlePointerMove = (event: PointerEvent) => {
        const rect = item.getBoundingClientRect();
        item.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
        item.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
      };

      item.addEventListener('pointermove', handlePointerMove);
      cleanups.push(() => item.removeEventListener('pointermove', handlePointerMove));
    });

    magneticItems.forEach((item) => {
      const handlePointerMove = (event: PointerEvent) => {
        const rect = item.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
        item.style.transform = `translate(${x * 4}px, ${y * 3}px)`;
      };
      const handlePointerLeave = () => {
        item.style.transform = '';
      };

      item.addEventListener('pointermove', handlePointerMove);
      item.addEventListener('pointerleave', handlePointerLeave);
      cleanups.push(() => {
        item.removeEventListener('pointermove', handlePointerMove);
        item.removeEventListener('pointerleave', handlePointerLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
