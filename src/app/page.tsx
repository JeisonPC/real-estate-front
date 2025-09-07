import Image from "next/image";
import styles from "./page.module.css";
import PropertiesTemplate from "@/components/templates/properties.template";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PropertiesTemplate />
      </main>
      <footer className={styles.footer}>
        <p>Powered by Jeison Poveda</p>
      </footer>
    </div>
  );
}
