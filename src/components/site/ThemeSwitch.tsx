'use client';

import { Airplay, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './ThemeSwitch.module.css';

const options = [
  { value: 'light', label: '亮色', Icon: Sun },
  { value: 'dark', label: '暗色', Icon: Moon },
  { value: 'system', label: '自动', Icon: Airplay },
] as const;

export function ThemeSwitch({ compact = false }: { compact?: boolean }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const active = mounted ? theme ?? 'system' : 'system';

  return (
    <div
      aria-label="主题"
      className={compact ? `${styles.switch} ${styles.compact}` : styles.switch}
      data-theme-toggle=""
      role="group"
    >
      {options.map(({ value, label, Icon }) => (
        <button
          aria-label={label}
          aria-pressed={active === value}
          className={active === value ? styles.active : undefined}
          key={value}
          onClick={() => setTheme(value)}
          title={label}
          type="button"
        >
          <Icon aria-hidden="true" size={14} strokeWidth={2.1} />
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </div>
  );
}
