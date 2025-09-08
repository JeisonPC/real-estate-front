import { useQuery } from "@tanstack/react-query";
import { PropertyResponse } from "../domain/entities/propertyResponse";
import { PropertyFilters } from "../domain/entities/propertyFilters";
import { getProperties } from "../usecases/getProperties.usecase";
import { ApiPropertyRepository } from "../repositories/apiProperty.repository";

export function useGetProperties(filters?: PropertyFilters) {
  const repository = new ApiPropertyRepository();

  return useQuery<PropertyResponse[], Error>({
    queryKey: ["properties", filters],
    queryFn: () => getProperties(repository, filters),
  });
}
