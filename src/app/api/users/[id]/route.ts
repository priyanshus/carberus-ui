import bffFetch from "@/lib/http/server/serverHttpClient";
import { NextRequest } from "next/server";


export async function DELETE(req: NextRequest): Promise<Response> {
  const id = req.nextUrl.pathname.split('/').pop();
  const endpoint = `${process.env.BACKEND_HOST}/users/${id}`;
  const cookie = req.headers.get('cookie') || '';

  const response = await bffFetch(endpoint, {
    method: 'DELETE',
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

export async function PUT(req: NextRequest ): Promise<Response> {
  const id = req.nextUrl.pathname.split('/').pop();
  const endpoint = `${process.env.BACKEND_HOST}/users/${id}`;
  const cookie = req.headers.get('cookie') || '';
  const payload = await req.json() || '';

  const response = await bffFetch(endpoint, {
    method: 'PUT',
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