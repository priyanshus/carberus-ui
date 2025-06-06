'use client';
import ErrorModel from "@/app/service/error/error.model";
import { User } from "@/app/service/user/user.model";
import clientFetch from "@/lib/http/client/clientHttpClient";

interface addUserPayload {
  email: string,
  firstName: string,
  lastName: string,
  role: string
  password: string
}

export async function fetchUsers(): Promise<User[]> {
  const res = await clientFetch('/api/users', { method: 'GET' });

  if (!res.ok) {
    const errorModel: ErrorModel = await res.json();
    throw new Error(errorModel.errorCode);
  }

  return res.json();
}

export async function updateUserRole(user: User, role: string): Promise<void> {
  const res = await clientFetch(`/api/users/${user.id}`, {
    method: 'PUT',
    body: { 'role': role }
  });

  if (!res.ok) {
    const errorModel: ErrorModel = await res.json();
    console.log(errorModel);
    throw new Error(errorModel.errorCode);
  }
}

export async function deleteUser(user: User): Promise<void> {
  const res = await clientFetch(`/api/users/${user.id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    const errorModel: ErrorModel = await res.json();
    console.log(errorModel);
    throw new Error(errorModel.errorCode);
  }
}

export async function addUser(payload: addUserPayload): Promise<void> {
  const res = await clientFetch(`/api/users/`, {
    method: 'POST',
    body: payload
  });

  if (!res.ok) {
    const errorModel: ErrorModel = await res.json();
    console.log(errorModel);
    throw new Error(errorModel.errorCode);
  }
}