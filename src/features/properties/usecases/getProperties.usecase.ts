import { PropertyRepository } from "../domain/interfaces/property.interface";
import { PropertyFilters } from "../domain/entities/propertyFilters";

export const getProperties = (
  propertyRepository: PropertyRepository,
  filters?: PropertyFilters
) => {
  return propertyRepository.getAll(filters);
};
