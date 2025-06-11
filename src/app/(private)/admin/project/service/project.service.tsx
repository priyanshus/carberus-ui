import ErrorModel from "@/app/service/error/error.model";
import clientFetch from "@/lib/http/client/clientHttpClient";
import { AddProjectModel, EditProjectModel } from "../model/project";

export async function fetchAllProjects() {
  const response = await clientFetch("/api/projects", { method: "GET" });

  if (!response.ok) {
    const errorModel: ErrorModel = await response.json();
    throw new Error(errorModel.errorCode);
  }

  return await response.json();
}

export async function submitAddProjectForm(payload: AddProjectModel) {
  const response = await clientFetch("/api/projects", {
    method: 'POST',
    body: payload,
  });

  if (!response.ok) {
    const errorModel: ErrorModel = await response.json();
    throw new Error(errorModel.errorCode);
  }
}

export async function submitEditProjectForm(payload: EditProjectModel) {
  const response = await clientFetch("/api/projects", {
    method: 'PUT',
    body: payload,
  });

  if (!response.ok) {
    const errorModel: ErrorModel = await response.json();
    throw new Error(errorModel.errorCode);
  }
}

export async function submitProjectStatusChange(id: string, payload: string) {
  const response = await clientFetch(`/api/projects/${id}`, {
    method: 'PATCH',
    body: {projectStatus: payload},
  });

  if (!response.ok) {
    const errorModel: ErrorModel = await response.json();
    throw new Error(errorModel.errorCode);
  }
}
