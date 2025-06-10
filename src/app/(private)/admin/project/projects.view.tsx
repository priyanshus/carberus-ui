"use client";
import CardComponent from "@/app/resusable/card-layout/card.component";
import ProjectsViewHeader from "./projects.view.header";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllProjects, submitProjectStatusChange } from "./service/project.service";
import LoadingSpinner from "@/app/resusable/loading.spinner.component";
import { ProjectsTable } from "./table/project.table.view";
import { projectColumns } from "./table/project.table.columns";
import { fetchUsers as fetchAllUsers } from "../user/service/user.service";
import EditProjectView from "./edit.project.view";
import { useEffect, useState } from "react";
import { Project } from "./service/project";
import ConfirmDialog from "@/app/resusable/confirmation.dialog.component";
import getErrorMessage from "@/app/appConstants/app.errors.mapping";
import ErrorMessageComponent from "@/app/resusable/feedback/error.message.component";


export default function ProjectsView() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [showPopoverModal, setShowPopoverModal] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
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
    console.log("Delete success state changed:", deleteSuccess);
    if (deleteSuccess) {
      queryClient.refetchQueries({ queryKey: ["getAllProjects"] });
      setDeleteSuccess(false); 
    }
  }, [deleteSuccess]);

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      return await submitProjectStatusChange(id);
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
      const filtered = data.filter((p: Project) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.prefix.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  };

  const {
    isLoading: usersLoadingError,
    error: errorUsers,
    data: appUsers,
  } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: () => fetchAllUsers(),
    staleTime: 1000 * 60 * 5,
  });

  function handleActionSelect(action: string, project: Project) {
    setSelectedAction(action);
    setProject(project);
    setShowPopoverModal(true);
    if (action === "edit") {
      console.log("Edit action selected for project:", project);
    } else if (action === "assignMembers") {
      console.log("Assign Members action selected for project:", project);
    } else if (action === "viewMembers") {
      console.log("View Members action selected for project:", project);
    } else if (action === "archive") {
      console.log("Archived action selected for project:", project);
    } else {
      console.log("No action selected for project:", project);
    }
  }

  function handleArchiveProject(project: Project) {
    mutation.mutate(project.id);
    setShowPopoverModal(false);
    setSelectedAction(null);
    setProject(null);
  }

  return (
    <CardComponent
      header={
        <ProjectsViewHeader
          users={appUsers}
          projects={data}
          onFilter={handleFilterChange}
        />
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
      { errorMessage && <ErrorMessageComponent message={errorMessage} />}

      {selectedAction && selectedAction === "edit" && (
        <EditProjectView
          project={project}
          isOpen={showPopoverModal}
          onClose={() => setShowPopoverModal(false)}
        />
      )}

      {selectedAction && selectedAction === "archive" && (
        <ConfirmDialog
          title={`Archive Project ${project?.name}`}
          open={showPopoverModal}
          description="Are you sure you want to archive this project?"
          onCancel={() => setShowPopoverModal(false)}
          onConfirm={() => handleArchiveProject(project as Project)}
        />
      )}
    </CardComponent>
  );
}
