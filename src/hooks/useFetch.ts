import { useCallback } from "react";
import { fetcher } from "@/utils/fetcher";

export function useFetch() {
  const fetchWrapper = useCallback(
    async <T>(url: string, options?: RequestInit): Promise<T> => {
      return fetcher<T>(url, options);
    },
    []
  );
  return fetchWrapper;
}
