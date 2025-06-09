"use client";
import PopupCardComponent from "@/app/resusable/card-layout/popup.card.component";
import PrimaryButtonComponent from "@/app/resusable/primary.button.component";
import PrimaryInputBox from "@/app/resusable/primary.input.component";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { submitEditProjectForm } from "./service/project.service";
import { EditProjectModel, Project } from "./service/project";
import getErrorMessage from "@/app/appConstants/app.errors.mapping";
import SuccessMessageComponent from "@/app/resusable/feedback/success.message.component";
import ErrorMessageComponent from "@/app/resusable/feedback/error.message.component";

interface EditProjectViewProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProjectView({
  project,
  isOpen,
  onClose,
}: EditProjectViewProps) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState<EditProjectModel>({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (isOpen) {
      setSuccessMessage("");
      setErrorMessage("");
      mutation.reset();
      setForm({
        title: "",
        id: "",
        description: "",
      });
    }
  }, [isOpen]);

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      id: project?.id || "",
      title: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async (formData: EditProjectModel) => {
      return await submitEditProjectForm(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProjects"] });
      setSuccessMessage(`${form.title} updated successfully.`);
    },
    onError: (error: any) => {
      console.error("Error adding project:", error);
      const errorMessage = getErrorMessage(error.message);
      setErrorMessage(errorMessage);
    },
  });

  if (!project) {
    return (
      <PopupCardComponent
        isOpen={isOpen}
        onClose={() => onClose()}
        title="Edit Project"
      >
        <div className="w-full">
          <p className="text-red-500">No project selected for editing.</p>
        </div>
      </PopupCardComponent>
    );
  }

  return (
    <PopupCardComponent
      isOpen={isOpen}
      onClose={() => onClose()}
      title={`Edit ${project.title}`}
    >
      <div className="min-w-[600]">
        <form id="editProjectForm">
          <div className="mb-4">
            <label className="block text-sm text-primary-500 font-bold">
              Project Title
            </label>
            <div className="my-1">
              <PrimaryInputBox
                id="title"
                type="text"
                required
                placeholder={project.title}
                onChange={(e) => handleTitleChange(e)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-primary-500 font-bold">
              <span>
                Description{" "}
                <span className="text-xs">(Max 100 characters)</span>
              </span>
            </label>
            <div className="my-1">
              <textarea
                className="input-box w-full h-16 p-2 border border-border-highlighter rounded focus:outline-none focus:border-primary-800"
                id="description"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </div>
        </form>
        <div className="flex flex-row justify-end mt-4">
          <PrimaryButtonComponent
            labelText="Update Project"
            onClickAction={() => mutation.mutate(form)}
          />
        </div>
        <div className="mt-4">
          {mutation.isSuccess && (
            <SuccessMessageComponent message={successMessage} />
          )}
          {mutation.isError && <ErrorMessageComponent message={errorMessage} />}
        </div>
      </div>
    </PopupCardComponent>
  );
}
