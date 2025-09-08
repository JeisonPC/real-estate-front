import { Property } from "./property";

export interface PropertyRequest extends Partial<Property> {
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
}
