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
          Lattice.Hub 让 Console、Kubernetes Controller、Thin SDK、Pingora Sidecar 与
          Envoy / Gateway 围绕同一控制面协作；治理规则在控制面发布，由已接入的运行时组件按支持范围执行。
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
