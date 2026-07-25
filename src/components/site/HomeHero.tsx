import Image from 'next/image';
import Link from 'next/link';
import styles from './HomePage.module.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

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
        <span className={styles.visualLabel}>REAL PRODUCT / PLATFORM METRICS</span>
        <div className={styles.productFrame}>
          <Image
            alt="Lattice.Hub Console 平台监控真实界面，展示系统监控图表与服务状态分布"
            height={1000}
            priority
            sizes="(max-width: 1200px) 100vw, 58vw"
            src={`${basePath}/product/console-platform-metrics.webp`}
            width={1600}
          />
        </div>
        <p className={styles.visualNote}>
          来自当前 Console 的真实界面。状态、事件与变化在同一个控制面中可见。
        </p>
      </div>
    </section>
  );
}
