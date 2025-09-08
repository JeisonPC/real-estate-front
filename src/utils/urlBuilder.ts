import { QueryBuilder } from "./queryBuilder";

export class URLBuilder {
  private readonly baseUrl: string;
  private path: string = "";

  constructor(baseUrl: string, private readonly queryBuilder: QueryBuilder) {
    this.baseUrl = baseUrl;
  }

  setPath(path: string): this {
    this.path = path;
    return this;
  }

  build(
    queryParams?: Record<string, string | number | boolean | undefined> | object
  ): string {
    const url = `${this.baseUrl}${this.path}`;

    if (!queryParams) {
      return url;
    }

    const queryString = this.queryBuilder.build(
      queryParams as Record<string, string | number | boolean | undefined>
    );
    return queryString ? `${url}?${queryString}` : url;
  }
}
