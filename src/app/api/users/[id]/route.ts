import bffFetch from "@/lib/http/server/serverHttpClient";


export async function PUT(req: Request, { params }: { params: { id: string } } ): Promise<Response> {
  const endpoint = `${process.env.BACKEND_HOST}/users/${params.id}`;
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

export async function DELETE(req: Request, { params }: { params: { id: string } } ): Promise<Response> {
  const endpoint = `${process.env.BACKEND_HOST}/users/${params.id}`;
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