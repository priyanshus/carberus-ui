import { HttpResponse } from "@/lib/http/clientTypes";
import bffFetch from "@/lib/http/server/serverHttpClient";

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const response = await fetch(`${process.env.BACKEND_HOST}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookie,
    },
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'application/json',
    }
  });;
}


export async function POST(req: Request): Promise<Response> {
  const endpoint = process.env.BACKEND_HOST + "/users";
  const cookie = req.headers.get('cookie') || '';
  const payload = await req.json() || '';

  const response = await bffFetch(endpoint, {
    method: 'POST',
    body: payload,
    headers: {
      'cookie': cookie
    }
  });


  return new Response(response.body, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'application/json',
    }
  });
}
