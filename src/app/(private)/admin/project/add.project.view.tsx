"use client";
import PopupCardComponent from "@/app/resusable/card-layout/popup.card.component";
import SuccessMessageComponent from "@/app/resusable/feedback/success.message.component";
import PrimaryButtonComponent from "@/app/resusable/primary.button.component";
import PrimaryInputBox from "@/app/resusable/primary.input.component";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { submitAddProjectForm } from "./service/project.service";
import { AddProjectModel, Project } from "./service/project";
import getErrorMessage from "@/app/appConstants/app.errors.mapping";
import LoadingSpinner from "@/app/resusable/loading.spinner.component";
import ErrorMessageComponent from "@/app/resusable/feedback/error.message.component";
import { User } from "@/app/service/user/user.model";
import { NEW_PROJECT_CONSTANTS } from "@/shared/form/form.constants";

interface AddProjectViewProps {
  users?: User[];
  projects: Project[];
  open: boolean;
  onClose: () => void;
}
export default function AddProjectView({
  users,
  projects,
  open,
  onClose,
}: AddProjectViewProps) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDuplicateTitle, setIsDuplicateTitle] = useState(false);
  const [isDuplicateCode, setIsDuplicateCode] = useState(false);

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
      setSuccessMessage(`${form.title} added successfully.`);
      queryClient.invalidateQueries({ queryKey: ["getAllProjects"] });
    },
    onError: (error: any) => {
      console.error("Error adding project:", error);
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

  const handleProjectTitleChange = (newTitle: string) => {
    setForm({ ...form, title: newTitle });
    if (newTitle.length > 0) {
      const isDuplicate = projects.some((p) =>
        p.title.toLowerCase().startsWith(newTitle.toLowerCase())
      );
      setIsDuplicateTitle(isDuplicate);
    }
    else {
      setIsDuplicateTitle(false); 
    }
  };

  const handleProjectCodeChange = (newCode: string) => {
    setForm({ ...form, prefix: newCode });

    if (newCode.length > 0) {
      const isDuplicate = projects.some((p) => p.prefix.startsWith(newCode));

      setIsDuplicateCode(isDuplicate);
    }
    else {
      setIsDuplicateCode(false); 
    }


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
      <div className="min-w-[600]">
        <form id="addProject" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-primary-500 font-bold">
              Project Title
            </label>
            <div className="my-1">
              <PrimaryInputBox
                id="title"
                type="name"
                maxLength={NEW_PROJECT_CONSTANTS.TITLE_MAX_LENGTH}
                required
                value={form.title}
                hasError={isDuplicateTitle}
                onChange={(e) => handleProjectTitleChange(e)}
                placeholder={`Enter Name (max ${NEW_PROJECT_CONSTANTS.TITLE_MAX_LENGTH} characters)`}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-primary-500 font-bold">
              Description
            </label>
            <div className="my-1">
              <textarea
                maxLength={NEW_PROJECT_CONSTANTS.DESCRIPTION_MAX_LENGTH}
                rows={3}
                className="input-box w-full h-24"
                id="description"
                required
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder={`Enter Description (max ${NEW_PROJECT_CONSTANTS.DESCRIPTION_MAX_LENGTH} characters)`}
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
                maxLength={NEW_PROJECT_CONSTANTS.PREFIX_MAX_LENGTH}
                required
                value={form.prefix}
                hasError={isDuplicateCode}
                onChange={(e) => handleProjectCodeChange(e)}
                placeholder={`Project Code (max ${NEW_PROJECT_CONSTANTS.PREFIX_MAX_LENGTH} characters)`}
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
