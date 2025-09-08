import styles from "./styles.module.css";
import Image from "next/image";
import { PropertyFilters } from "@/features/properties/domain/entities/propertyFilters";
import InputAtom from "@/components/atoms/input/Input.atom";
import { usePropertyFilter } from "./usePropertyFilter";

interface FilterAtomProps {
  readonly onFiltersChange?: (filters: PropertyFilters) => void;
}

function PropertyFilterMolecule({ onFiltersChange }: FilterAtomProps) {
  const {
    isExpanded,
    nameInput,
    addressInput,
    handleInputChange,
    handleClear,
    setFilters,
    filters,
    toggleExpanded,
  } = usePropertyFilter(onFiltersChange);

  return (
    <div className={`${styles.container} ${isExpanded ? styles.expanded : ""}`}>
      {/* Botón inicial */}
      <button
        className={styles.triggerButton}
        type="button"
        aria-label="Filtrar"
        onClick={toggleExpanded}
      >
        <Image src="/filter.svg" alt="" width={22} height={22} />
        <span className={styles.label}>Filtrar</span>
        {isExpanded && <p className={styles.closeButton}>×</p>}
      </button>

      {/* Formulario de filtros */}
      <div className={styles.filterForm}>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <InputAtom
              id="name"
              label="Nombre"
              value={nameInput}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Buscar por nombre..."
            />
          </div>

          <div className={styles.field}>
            <InputAtom
              id="address"
              label="Dirección"
              value={addressInput}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Buscar por dirección..."
            />
          </div>

          <div className={styles.field}>
            <p>Precio:</p>
            <div className={styles.buttonsPricesContainer}>
              <button
                type="button"
                className={
                  filters.minPrice === 0 && filters.maxPrice === 2500000
                    ? styles.active
                    : ""
                }
                onClick={() => {
                  const newFilters = {
                    ...filters,
                    minPrice: 0,
                    maxPrice: 2500000,
                  };
                  setFilters(newFilters);
                  onFiltersChange?.(newFilters);
                }}
              >
                Hasta $2500k
              </button>

              <button
                type="button"
                className={
                  filters.minPrice === 2500000 && filters.maxPrice === 150000000
                    ? styles.active
                    : ""
                }
                onClick={() => {
                  const newFilters = {
                    ...filters,
                    minPrice: 2500000,
                    maxPrice: 150000000,
                  };
                  setFilters(newFilters);
                  onFiltersChange?.(newFilters);
                }}
              >
                {"$2500k – $150M"}
              </button>

              <button
                type="button"
                className={
                  filters.minPrice === 150000000 &&
                  filters.maxPrice === undefined
                    ? styles.active
                    : ""
                }
                onClick={() => {
                  const newFilters = {
                    ...filters,
                    minPrice: 150000000,
                    maxPrice: undefined,
                  };
                  setFilters(newFilters);
                  onFiltersChange?.(newFilters);
                }}
              >
                Más de $150M
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="pageSize">Por página:</label>
            <select
              id="pageSize"
              value={filters.pageSize || 20}
              onChange={(e) =>
                handleInputChange("pageSize", Number(e.target.value))
              }
            >
              <option value="">Selecciona cantidad...</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={handleClear} className={styles.clearButton}>
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}
export default PropertyFilterMolecule;
