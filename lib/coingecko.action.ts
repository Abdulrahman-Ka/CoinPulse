"use server";

import qs from "query-string";

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error("Could not get base url");
if (!API_KEY) throw new Error("Could not get api key");

/**
 * Fetches JSON from the configured CoinGecko base URL for the given endpoint and query parameters.
 *
 * @param endpoint - Path appended to the base URL (without leading slash required)
 * @param params - Optional query parameters to include in the request; empty strings and nulls are omitted
 * @param revalidate - Cache revalidation time in seconds for Next.js fetch (defaults to 60)
 * @returns The response body parsed as JSON, typed as `T`
 * @throws Error when the HTTP response status is not OK; message includes the status code and any error text from the response
 */
export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true }
  );
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-ch-pro-api-key": API_KEY,
    } as Record<string, string>,
    next: { revalidate },
  });
  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => {});
    throw new Error(
      `Api Error: ${response.status}: ${errorBody.error || response.statusText}`
    );
  }
  return response.json();
}