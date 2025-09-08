'use client'
import { PropertyFilters } from "@/features/properties/domain/entities/propertyFilters";
import { useCallback, useState } from "react";

export function useFilters() {
  const [filters, setFilters] = useState<PropertyFilters | undefined>(
    undefined
  );

  const handleFiltersChange = useCallback((newFilters: PropertyFilters) => {
    setFilters(newFilters);
  }, []);

  return { filters, setFilters, handleFiltersChange };
}
