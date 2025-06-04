export async function GET(req: Request) {
    const cookie = req.headers.get('cookie') || '';
    const auth = req.headers.get('authorization') || '';
  
    const backendResponse = await fetch(`${process.env.BACKEND_HOST}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie,
        'Authorization': auth,
      },
    });
  
    if (!backendResponse.ok) {
      return new Response('failed', { status: backendResponse.status });
    }
  
    const body = backendResponse.body;
  
    return new Response(body, {
      status: backendResponse.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  