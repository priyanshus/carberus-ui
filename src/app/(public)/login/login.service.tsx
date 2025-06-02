"use server";
import { redirect } from "next/navigation";
import { loginSchema } from "./login.schema";


export async function postLoginAction(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const res = await fetch('http://localhost:10001/api/v1/login', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });


  if (!res.ok) {
    return { errors: { general: ["Invalid email or password."] } };
  }
  const jwtToken = res.headers.get("authorization");
  if (!jwtToken) {
    return { errors: { general: ["Something went wrong."] } };
  } else {
    redirect("/dashboard");
  }
}