import { PropertyFilters } from "../entities/propertyFilters";
import { PropertyResponse } from "../entities/propertyResponse";

export interface PropertyRepository {
  getAll(filters?: PropertyFilters): Promise<PropertyResponse[]>;
}
