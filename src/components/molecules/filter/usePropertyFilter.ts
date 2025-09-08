import { PropertyFilters } from "@/features/properties/domain/entities/propertyFilters";
import { useState, useEffect } from "react";

export function usePropertyFilter(
  onFiltersChange?: (filters: PropertyFilters) => void
) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [filters, setFilters] = useState<PropertyFilters>({
    name: "",
    address: "",
    minPrice: undefined,
    maxPrice: undefined,
    page: 1,
    pageSize: 20,
  });

  const handleInputChange = (
    field: keyof PropertyFilters,
    value: string | number
  ) => {
    if (field === "name") {
      setNameInput(value as string);
      return;
    }

    if (field === "address") {
      setAddressInput(value as string);
      return;
    }

    const newFilters = {
      ...filters,
      [field]: value === "" ? undefined : value,
    };

    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleClear = () => {
    setNameInput("");
    setAddressInput("");
    const clearedFilters = {
      name: "",
      address: "",
      minPrice: undefined,
      maxPrice: undefined,
      page: 1,
      pageSize: 20,
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const updatedFilters = {
        ...filters,
        name: nameInput || undefined,
        address: addressInput || undefined,
      };

      if (nameInput !== filters.name || addressInput !== filters.address) {
        setFilters(updatedFilters);
        onFiltersChange?.(updatedFilters);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameInput, addressInput]);

  return {
    isExpanded,
    setIsExpanded,
    toggleExpanded,
    filters,
    setFilters,
    nameInput,
    setNameInput,
    addressInput,
    setAddressInput,
    handleInputChange,
    handleClear,
  };
}
