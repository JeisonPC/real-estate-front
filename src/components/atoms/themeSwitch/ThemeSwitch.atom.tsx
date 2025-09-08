"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { toggleTheme } from "@/store/theme.slice";
import styles from "./styles.module.css";

export default function ThemeSwitch() {
  const theme = useSelector((s: RootState) => s.theme.current);
  const dispatch = useDispatch<AppDispatch>();

  const isDark = theme === "dark";

  return (
    <button
      className={`${styles.switch} ${isDark ? styles.dark : ""}`}
      onClick={() => dispatch(toggleTheme())}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className={styles.thumb}>{isDark ? "🌙" : "☀️"}</span>
    </button>
  );
}
