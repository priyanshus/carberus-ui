export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestOptions<TBody> extends Omit<RequestInit, 'body' | 'method' | 'headers'> {
  method?: HttpMethod;
  body?: TBody;
  auth?: boolean;
  retries?: number;
  backoff?: number;
  headers?: HeadersInit;
}

export interface HttpResponse<T> {
  data?: T;
  headers: Headers;
  status: number;
}