import { HttpResponse, RequestOptions } from "../clientTypes";

export default async function clientHttpClient<TResponse, TBody = unknown>(
    url: string,
    options: RequestOptions<TBody> = {}
): Promise<HttpResponse<TResponse>> {
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

    const response = await fetch(url, fetchOptions);
    return await buildResponse(response);
}

async function buildResponse<TResponse>(response: Response): Promise<HttpResponse<TResponse>> {
  try {
    const responseData = await response.json();
    return {
      data: responseData,
      headers: response.headers,
      status: response.status,
    };
  } catch (error) {
    return {
      data: {} as TResponse,
      headers: response.headers,
      status: response.status,
    };
  }
}

