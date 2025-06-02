"use client";
import clientHttpClient from "@/lib/http/client/clientHttpClient";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginComponent() {
  const [error, setError] = useState<string>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const { status } = await clientHttpClient('/api/login', {
      method: 'POST',
      body: {
        email,
        password
      },
      auth: false,
    });

    if (status == 200) {
      redirect('/test-cases')
    } else {
      setError("Login failed, try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Carberus Login</h1>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col">
            <input
              required
              className="w-full mb-4 p-2 border rounded"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              className="w-full mb-4 p-2 border rounded"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-600"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        {error && <p className="text-red-700 mt-4 font-semibold">{error}</p>}
      </div>
    </div>
  );
}
