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
          Lattice.Hub 将治理规则从控制面分发到多语言服务的执行点，让服务通过 SDK
          或代理在已接入且支持对应能力的调用中执行同一治理意图；Console 与 Kubernetes
          Controller 负责管理变化。
        </p>
        <div className={styles.heroActions}>
          <Link className={`${styles.button} ${styles.buttonPrimary}`} href="/docs">
            开始阅读文档
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            className={`${styles.button} ${styles.buttonSecondary}`}
            href="/architecture"
          >
            查看完整架构
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className={styles.heroVisual}>
        <ArchitectureFlow />
      </div>
    </section>
  );
}
