'use client';

import { Airplay, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useId, useRef, useState } from 'react';
import styles from './ThemeSwitch.module.css';

const options = [
  { value: 'light', label: '亮色', Icon: Sun },
  { value: 'dark', label: '暗色', Icon: Moon },
  { value: 'system', label: '自动', Icon: Airplay },
] as const;

type ThemeValue = (typeof options)[number]['value'];

function resolveOption(theme: string | undefined) {
  return options.find((option) => option.value === theme) ?? options[2];
}

export function ThemeSwitch() {
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
  const activeOption = resolveOption(activeValue);
  const TriggerIcon =
    activeValue === 'system'
      ? resolveOption(resolvedTheme === 'dark' ? 'dark' : 'light').Icon
      : activeOption.Icon;

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
        aria-label={`主题：${activeOption.label}`}
        className={styles.trigger}
        onClick={() => setOpen((current) => !current)}
        ref={triggerRef}
        title={`主题：${activeOption.label}`}
        type="button"
      >
        <TriggerIcon aria-hidden="true" size={16} strokeWidth={2.1} />
      </button>

      {open ? (
        <div
          aria-label="选择主题"
          className={styles.menu}
          id={menuId}
          role="menu"
        >
          {options.map(({ value, label, Icon }) => (
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
          ))}
        </div>
      ) : null}
    </div>
  );
}
