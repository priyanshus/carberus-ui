import logger from "@/lib/logger";
import { RequestOptions } from "../clientTypes";


export default async function bffFetch<TBody = unknown>(
    endpoint: string,
    options: RequestOptions<TBody> = {}
): Promise<Response> {
    const {
        method = 'GET',
        body,
        auth = true,
        headers = {},
        ...rest
    } = options;

    const baseHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        ...headers,
    };

    const fetchOptions: RequestInit = {
        method,
        headers: baseHeaders,
        ...rest,
    };

    if (body !== undefined) {
        fetchOptions.body = JSON.stringify(body);
    }

    try {
        logger.info(`Incoming Request: ${method} : ${endpoint}: ${fetchOptions.body}`);
        const response = await fetch(endpoint, fetchOptions);

        console.log(response);
        logger.info(`Received Response: ${method} : ${endpoint} : ${response.status}`);
        return response;
    } catch (error) {
        throw error;
    }
}
