'use client';

import { Airplay, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { getSiteLocaleFromPathname } from '@/lib/site-locale';
import { getSiteUi } from '@/lib/site-ui';
import styles from './ThemeSwitch.module.css';

const optionIcons = {
  light: Sun,
  dark: Moon,
  system: Airplay,
} as const;

type ThemeValue = keyof typeof optionIcons;

function resolveOption(theme: string | undefined, labels: Record<ThemeValue, string>) {
  const value: ThemeValue =
    theme === 'light' || theme === 'dark' || theme === 'system' ? theme : 'system';
  return { value, label: labels[value], Icon: optionIcons[value] };
}

export function ThemeSwitch() {
  const pathname = usePathname();
  const locale = getSiteLocaleFromPathname(pathname);
  const ui = getSiteUi(locale);
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    };

    window.addEventListener('mousedown', closeOnPointer);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('mousedown', closeOnPointer);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const activeValue: ThemeValue = mounted ? ((theme as ThemeValue | undefined) ?? 'system') : 'system';
  const activeOption = resolveOption(activeValue, ui.themeOptions);
  const TriggerIcon =
    activeValue === 'system'
      ? resolveOption(resolvedTheme === 'dark' ? 'dark' : 'light', ui.themeOptions).Icon
      : activeOption.Icon;
  const themeLabel =
    locale === 'en'
      ? `${ui.themePrefix}: ${activeOption.label}`
      : `${ui.themePrefix}：${activeOption.label}`;

  const choose = (value: ThemeValue) => {
    setTheme(value);
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <div className={styles.root} data-theme-toggle="" ref={rootRef}>
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={themeLabel}
        className={styles.trigger}
        onClick={() => setOpen((current) => !current)}
        ref={triggerRef}
        title={themeLabel}
        type="button"
      >
        <TriggerIcon aria-hidden="true" size={16} strokeWidth={2.1} />
      </button>

      {open ? (
        <div
          aria-label={ui.themeMenu}
          className={styles.menu}
          id={menuId}
          role="menu"
        >
          {(Object.keys(optionIcons) as ThemeValue[]).map((value) => {
            const Icon = optionIcons[value];
            const label = ui.themeOptions[value];
            return (
              <button
                aria-checked={activeValue === value}
                className={activeValue === value ? styles.active : undefined}
                key={value}
                onClick={() => choose(value)}
                role="menuitemradio"
                type="button"
              >
                <Icon aria-hidden="true" size={14} strokeWidth={2.1} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
