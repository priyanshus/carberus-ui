
export async function GET(_req: Request) {
    return new Response('Bye!', {
        status: 200,
        headers: {
            'Set-Cookie': 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure',
        },
    });
}