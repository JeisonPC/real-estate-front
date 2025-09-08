"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export function ThemeApplier() {
  const theme = useSelector((s: RootState) => s.theme.current as string);

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute("data-theme", theme);
  }, [theme]);

  return null;
}
