import styles from "./styles.module.css";

function SkeletonCard() {
  return (
    <section className={styles.container} aria-hidden="true">
      <div className={`${styles.media} ${styles.skel}`} />
      <div className={styles.content}>
        <div className={`${styles.line} ${styles.lg} ${styles.skel}`} />
        <div className={`${styles.line} ${styles.md} ${styles.skel}`} />
        <div className={`${styles.price} ${styles.skel}`} />
      </div>
    </section>
  );
}

export default SkeletonCard;