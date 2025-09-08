import React from "react";
import styles from "./styles.module.css";
import ThemeSwitch from "@/components/atoms/themeSwitch/ThemeSwitch.atom";

interface HeaderTemplateProps {
  readonly title: string;
}

function HeaderTemplate({ title }: HeaderTemplateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.containerInternal}>
        <p>Home</p>
        <h1 className={styles.title}>{title}</h1>
        <div>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}

export default HeaderTemplate;
