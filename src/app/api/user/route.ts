
export async function POST(request: Request) {
    const body = await request.json();
    const addUserResponse = await fetch(`${process.env.BACKEND_HOST}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    return new Response(addUserResponse.body, {
        status: addUserResponse.status,
        headers: addUserResponse.headers,
    });
}