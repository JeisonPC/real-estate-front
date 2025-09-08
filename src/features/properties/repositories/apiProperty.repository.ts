import { PropertyRepository } from "../domain/interfaces/property.interface";
import {
  PropertyResponse,
  PropertiesResponse,
} from "../domain/entities/propertyResponse";
import { PropertyFilters } from "../domain/entities/propertyFilters";
import { fetcher } from "@/utils/fetcher";
import { URLBuilder } from "@/utils/urlBuilder";
import { URLQueryBuilder } from "@/utils/queryBuilder";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiPropertyRepository implements PropertyRepository {
  private readonly urlBuilder: URLBuilder;

  constructor() {
    this.urlBuilder = new URLBuilder(API_URL || "", new URLQueryBuilder());
  }

  async getAll(filters?: PropertyFilters): Promise<PropertyResponse[]> {
    const url = this.urlBuilder.setPath("/properties").build(filters);

    const response = await fetcher<PropertiesResponse>(url);
    return response.items;
  }
}
