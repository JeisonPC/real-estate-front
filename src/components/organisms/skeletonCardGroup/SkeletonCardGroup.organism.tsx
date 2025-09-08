"use client";

import React, { useMemo } from "react";
import SkeletonCard from "@/components/molecules/skeletonCard/SkeletonCard.molecules";
import styles from './styles.module.css';

interface SkeletonCardGroupProps {
  readonly quantity?: number;
}

function SkeletonCardGroupOrganism({ quantity = 1 }: SkeletonCardGroupProps) {
  const keys = useMemo(
    () => Array.from({ length: quantity }, () => crypto.randomUUID()),
    [quantity]
  );

  return (
    <div className={styles.container}>
      {keys.map((k) => (
        <SkeletonCard key={k} />
      ))}
    </div>
  );
}

export default SkeletonCardGroupOrganism;
