export interface QueryBuilder {
  build(params: Record<string, string | number | boolean | undefined>): string;
}

export class URLQueryBuilder implements QueryBuilder {
  build(params: Record<string, string | number | boolean | undefined>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value.toString());
      }
    });

    return searchParams.toString();
  }
}
