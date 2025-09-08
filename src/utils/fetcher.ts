export async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Error fetching " + url);
  return res.json();
}
