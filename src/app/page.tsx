import PropertiesTemplate from "@/components/templates/properties/Properties.template";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PropertiesTemplate />
      </main>
    </div>
  );
}
