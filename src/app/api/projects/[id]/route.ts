import bffFetch from "@/lib/http/server/serverHttpClient";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();
  const cookie = req.headers.get("cookie") || "";
  const response = await bffFetch(`${process.env.BACKEND_HOST}/projects/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") || "application/json",
    },
  });
}