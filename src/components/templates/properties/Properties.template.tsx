"use client";

import React, { useState } from "react";
import Card from "../../molecules/card/Card.molecules";
import { useGetProperties } from "@/features/properties/hooks/useGetProperties";
import { PropertyFilters } from "@/features/properties/domain/entities/propertyFilters";
import styles from "./styles.module.css";
import SkeletonCardGroupOrganism from "@/components/organisms/skeletonCardGroup/SkeletonCardGroup.organism";
import PropertyFilterMolecule from "@/components/molecules/filter/PropertyFilter.molecules";

function PropertiesTemplate() {
  const [filters, setFilters] = useState<PropertyFilters | undefined>(
    undefined
  );
  const { data, error } = useGetProperties(filters);

  const handleFiltersChange = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
  };

  if (error) return <div>Error loading properties</div>;

  return (
    <section className={styles.container}>
      {data ? (
        data?.map((property) => (
          <Card
            key={property.id}
            id={property.id}
            idOwner={property.idOwner}
            name={property.name}
            address={property.address}
            price={property.price}
            imageUrl={property.imageUrl}
          />
        ))
      ) : (
        <SkeletonCardGroupOrganism quantity={9} />
      )}

      <PropertyFilterMolecule onFiltersChange={handleFiltersChange} />
    </section>
  );
}

export default PropertiesTemplate;
