import Link from 'next/link';
import { ArchitectureFlow } from './ArchitectureFlow';
import styles from './HomePage.module.css';

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>Service governance control plane</p>
        <h1 id="home-title">
          把服务变化，
          <span>收进一个控制面。</span>
        </h1>
        <p className={styles.heroLede}>
          Lattice.Hub 统一运行环境、服务发现、配置和治理规则，让 Thin SDK、Local Proxy /
          Sidecar 与 Proxy Mesh 从同一控制面读取版本化的服务与治理视图。
        </p>
        <div className={styles.heroActions}>
          <Link className={`${styles.button} ${styles.buttonPrimary}`} href="/docs">
            开始阅读文档
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            className={`${styles.button} ${styles.buttonSecondary}`}
            href="https://github.com/lattice-hub/pole-control-plane"
          >
            查看 GitHub
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      <div className={styles.heroVisual}>
        <ArchitectureFlow />
      </div>
    </section>
  );
}
