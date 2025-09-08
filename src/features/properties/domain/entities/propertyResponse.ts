import { Property } from "./property";

export interface PropertyResponse extends Property {
  id: string;
  idOwner: string;
}

export interface PropertiesResponse {
  items: PropertyResponse[];
  page: number;
  pageSize: number;
  total: number;
}
