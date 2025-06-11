"use client";
import PopupCardComponent from "@/app/resusable/card-layout/popup.card.component";
import SuccessMessageComponent from "@/app/resusable/feedback/success.message.component";
import PrimaryButtonComponent from "@/app/resusable/primary.button.component";
import PrimaryInputBox from "@/app/resusable/primary.input.component";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { submitAddProjectForm } from "../service/project.service";
import { AddProjectModel, Project } from "../model/project";
import getErrorMessage from "@/app/appConstants/app.errors.mapping";
import LoadingSpinner from "@/app/resusable/loading.spinner.component";
import ErrorMessageComponent from "@/app/resusable/feedback/error.message.component";
import { NEW_PROJECT_CONSTANTS } from "@/shared/form/form.constants";
import { isAddProjectButtonDisabled, isProjectNameValid, isProjectPrefixValid } from "../hooks/projectFormRules";
import en from "@/copy/en";


interface AddProjectViewProps {
  projects: Project[];
  open: boolean;
  onClose: () => void;
}
export default function AddProjectView({
  projects,
  open,
  onClose,
}: AddProjectViewProps) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDuplicateName, setIsDuplicateName] = useState(false);
  const [isDuplicateCode, setIsDuplicateCode] = useState(false);


  const [form, setForm] = useState<AddProjectModel>({
    name: "",
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
      setSuccessMessage(`${form.name} added successfully.`);
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

  const handleProjectNameChange = (newName: string) => {
    setForm({ ...form, name: newName });
    setIsDuplicateCode(false);
    setIsDuplicateName(!isProjectNameValid(newName, projects));
  };

  const handleProjectCodeChange = (newCode: string) => {
    setForm({ ...form, prefix: newCode });
    setIsDuplicateCode(false);
    setIsDuplicateCode(!isProjectPrefixValid(newCode, projects));
  };

  return (
    <PopupCardComponent isOpen={open} onClose={onClose} title={en.project.addProjectLabel}>
      <div className="min-w-[600]">
        <form id="addProject" onSubmit={handleSubmit}>
          <div className="mb-4">
            <PrimaryInputBox
              id="name"
              labelText={en.project.name}
              isMandatory={true}
              type="name"
              maxLength={NEW_PROJECT_CONSTANTS.NAME_MAX_LENGTH}
              required
              value={form.name}
              hasError={isDuplicateName}
              onChange={(e) => handleProjectNameChange(e)}
              placeholder={`${en.project.name} (${en.project.edit.nameLimit()})`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-primary-500 font-bold">
            {en.project.description}
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
                placeholder={`${en.project.description} (${en.project.edit.descriptionLimit()})`}
              />
            </div>
          </div>

          <div className="mb-4">
            <PrimaryInputBox
              id="prefix"
              labelText={en.project.code}
              isMandatory={true}
              type="text"
              maxLength={NEW_PROJECT_CONSTANTS.PREFIX_MAX_LENGTH}
              required
              value={form.prefix}
              hasError={isDuplicateCode}
              onChange={(e) => handleProjectCodeChange(e)}
              placeholder={`${en.project.code} (${en.project.edit.prefixLimit()})`}
            />
          </div>

          {mutation.isPending && <LoadingSpinner />}
          <div className="flex flex-row gap-2 mt-10 justify-end">
            <PrimaryButtonComponent
              disabled={
                isAddProjectButtonDisabled(form) ||
                isDuplicateName ||
                isDuplicateCode
              }
              labelText={en.project.addProjectLabel}
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
