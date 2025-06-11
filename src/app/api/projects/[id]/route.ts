import bffFetch from "@/lib/http/server/serverHttpClient";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();
  const payload = (await req.json()) || "";
  console.log("PATCH payload", payload);
  const cookie = req.headers.get("cookie") || "";
  const response = await bffFetch(`${process.env.BACKEND_HOST}/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: payload
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") || "application/json",
    },
  });
}