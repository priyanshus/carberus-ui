import { RequestOptions } from "../clientTypes";

export default async function clientFetch<TBody = unknown>(
  url: string,
  options: RequestOptions<TBody> = {}
): Promise<Response> {
  const {
    method = 'GET',
    body,
    auth = true,
    ...rest
  } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const fetchOptions: RequestInit = {
    method,
    headers,
    ...rest,
  };

  if (body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);
    return response;
  } catch (error) {
    throw error;
  }
}



