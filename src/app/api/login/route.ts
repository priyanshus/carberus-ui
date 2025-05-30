
export async function POST(req: Request) {

    const body = await req.json();
    const loginResponse = await fetch(`${process.env.BACKEND_HOST}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!loginResponse.ok) {
        return new Response('Login failed', { status: loginResponse.status });
    }

    const setCookieHeader = loginResponse.headers.get('set-cookie');

    // Build response headers to send to browser
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    // Forward 'set-cookie' header if present
    if (setCookieHeader) {
        headers.append('Set-Cookie', setCookieHeader);
    }
    let data = null;

    if (loginResponse.headers.get('content-length') !== '0' && loginResponse.headers.get('content-type')?.includes('application/json')) {
        data = await loginResponse.json();
    }

    return new Response(data, {
        status: loginResponse.status,
        headers,
    });
}
