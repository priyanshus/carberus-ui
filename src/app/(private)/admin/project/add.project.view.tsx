"use client";
import PopupCardComponent from "@/app/resusable/card-layout/popup.card.component";
import SuccessMessageComponent from "@/app/resusable/feedback/success.message.component";
import PrimaryButtonComponent from "@/app/resusable/primary.button.component";
import PrimaryInputBox from "@/app/resusable/primary.input.component";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { submitAddProjectForm } from "./service/project.service";
import { AddProjectModel } from "./service/project";
import getErrorMessage from "@/app/appConstants/app.errors.mapping";
import LoadingSpinner from "@/app/resusable/loading.spinner.component";
import ErrorMessageComponent from "@/app/resusable/feedback/error.message.component";
import { User } from "@/app/service/user/user.model";

interface AddProjectViewProps {
  users?: User[];
  open: boolean;
  onClose: () => void;
}
export default function AddProjectView({
  users,
  open,
  onClose,
}: AddProjectViewProps) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const isUserListInvalid = !users || users.length === 0;

  const [form, setForm] = useState<AddProjectModel>({
    title: "",
    prefix: "",
    description: "",
    members: [],
  });

  const mutation = useMutation({
    mutationFn: async (formData: AddProjectModel) => {
      return await submitAddProjectForm(formData);
    },
    onSuccess: () => {
      setLoading(false);
      setSuccessMessage(`Project "${form.title}" added successfully.`);
      queryClient.invalidateQueries({ queryKey: ["getAllProjects"] });
    },
    onError: (error: any) => {
      setLoading(false);
      const errorMessage = getErrorMessage(error.message);
      setErrorMessage(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    mutation.mutate(form);
  };

  if (isUserListInvalid) {
    return (
      <PopupCardComponent isOpen={open} onClose={onClose} title="Add Project">
        <div className="text-red-500 p-4">
          <ErrorMessageComponent message="No users available to assign to the project. Please try after sometime or add users first." />
        </div>
      </PopupCardComponent>
    );
  }
  return (
    <PopupCardComponent isOpen={open} onClose={onClose} title="Add Project">
      <div className="w-full">
        <form id="addProject" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-primary-500 font-bold">
              Name
            </label>
            <div className="my-1">
              <PrimaryInputBox
                id="title"
                type="name"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e })}
                placeholder="Enter Name (max 50 characters)"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-primary-500 font-bold">
              Description
            </label>
            <div className="my-1">
              <PrimaryInputBox
                id="description"
                type="text"
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e })}
                placeholder="Enter Description (max 255 characters)"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-primary-500 font-bold">
              Project Code
            </label>
            <div className="my-1">
              <PrimaryInputBox
                id="prefix"
                type="text"
                required
                value={form.prefix}
                onChange={(e) => setForm({ ...form, prefix: e })}
                placeholder="Project Code (max 4 chars e.g., PRJ1)"
              />
            </div>
          </div>


          {mutation.isPending && <LoadingSpinner />}
          <div className="flex flex-row gap-2 mt-10 justify-end">
            <PrimaryButtonComponent
              disabled={loading}
              labelText="Add Project"
            />
          </div>
        </form>
      </div>

      <div className="mt-4">
        {mutation.isSuccess && (
          <SuccessMessageComponent message={successMessage} />
        )}
        {mutation.isError && <ErrorMessageComponent message={errorMessage} />}
      </div>
    </PopupCardComponent>
  );
}
