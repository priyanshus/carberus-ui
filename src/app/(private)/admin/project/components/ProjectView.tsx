"use client";
import CardComponent from "@/app/resusable/card-layout/card.component";
import ProjectsViewHeader from "./ProjetViewHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllProjects,
  submitProjectStatusChange,
} from "../service/project.service";
import LoadingSpinner from "@/app/resusable/loading.spinner.component";
import { ProjectsTable } from "./ProjectTableView";
import { projectColumns } from "../hooks/projectTableColumns";
import EditProjectView from "./EditProjectView";
import { useEffect, useState } from "react";
import { Project } from "../model/project";
import ConfirmDialog from "@/app/resusable/confirmation.dialog.component";
import getErrorMessage from "@/app/appConstants/app.errors.mapping";
import ErrorMessageComponent from "@/app/resusable/feedback/error.message.component";
import en from "@/copy/en";
import { set } from "zod/v4-mini";
import { NEW_PROJECT_CONSTANTS } from "@/shared/form/form.constants";
import { PROJECT_STATUS } from "@/shared/appConstants";

export default function ProjectsView() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [showPopoverModal, setShowPopoverModal] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [projectStatus, setProjectStatus] = useState<string>("");
  const queryClient = useQueryClient();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getAllProjects"],
    queryFn: () => fetchAllProjects(),
  });

  useEffect(() => {
    if (data) {
      setFilteredProjects(data);
    }
  }, [data]);

  useEffect(() => {
    if (deleteSuccess) {
      queryClient.refetchQueries({ queryKey: ["getAllProjects"] });
      setDeleteSuccess(false);
    }
  }, [deleteSuccess]);

  const mutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await submitProjectStatusChange(id, status);
    },
    onSuccess: () => {
      setDeleteSuccess(true);
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error.message);
      setErrorMessage(errorMessage);
    },
  });

  const handleFilterChange = (searchTerm: string) => {
    if (!data) return;
    else {
      const filtered = data.filter(
        (p: Project) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.prefix.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  };

  function handleActionSelect(action: string, project: Project) {
    setErrorMessage("");
    setProject(project);
    setShowPopoverModal(true);
    setSelectedAction(action);

    if (action === "archive") {
      setProjectStatus(PROJECT_STATUS.ARCHIVED);
    } else if (action === "activate") {
      setProjectStatus(PROJECT_STATUS.ACTIVE);
    }
  }

  function handleProjectStatusChange(project: Project) {
    mutation.mutate({ id: project.id, status: projectStatus });
    setShowPopoverModal(false);
    setSelectedAction(null);
    setProject(null);
  }

  return (
    <CardComponent
      header={
        <ProjectsViewHeader projects={data} onFilter={handleFilterChange} />
      }
    >
      <div className="mt-8">
        <p className="ml-auto text-secondry text-sm">
          Total Projects:{" "}
          <span className="text-primary-800">{data ? data.length : 0}</span>
        </p>
        <ProjectsTable
          data={filteredProjects ?? []}
          columns={projectColumns}
          onActionSelect={(a, p) => handleActionSelect(a, p)}
        />
      </div>

      {isLoading && <LoadingSpinner />}
      {errorMessage && <ErrorMessageComponent message={errorMessage} />}

      {selectedAction && selectedAction === "edit" && (
        <EditProjectView
          project={project}
          isOpen={showPopoverModal}
          onClose={() => setShowPopoverModal(false)}
        />
      )}

      {selectedAction === "archive" && (
        <ConfirmDialog
          title={`${en.project.archive.title} ${project?.name}`}
          open={showPopoverModal}
          description={en.project.archive.description}
          onCancel={() => setShowPopoverModal(false)}
          onConfirm={() => handleProjectStatusChange(project as Project)}
        />
      )}

      {selectedAction === "activate" && (
        <ConfirmDialog
          title={`${en.project.activate.title} ${project?.name}`}
          open={showPopoverModal}
          description={en.project.activate.description}
          onCancel={() => setShowPopoverModal(false)}
          onConfirm={() => handleProjectStatusChange(project as Project)}
        />
      )}
    </CardComponent>
  );
}
