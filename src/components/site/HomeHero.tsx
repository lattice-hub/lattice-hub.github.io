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
          Lattice.Hub 让 AI 服务的路由、限流、熔断、镜像与 Mock 共享同一治理视图。
          Pole Agent 的 Prompt 受控发布；模型凭据由 Pole Secret 仅在运行时解析，
          不进入浏览器、日志或模型上下文。
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
