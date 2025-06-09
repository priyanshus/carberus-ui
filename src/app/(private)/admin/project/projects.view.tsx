"use client";
import CardComponent from "@/app/resusable/card-layout/card.component";
import ProjectsViewHeader from "./projects.view.header";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProjects } from "./service/project.service";
import LoadingSpinner from "@/app/resusable/loading.spinner.component";
import { ProjectsTable } from "./table/project.table.view";
import { projectColumns } from "./table/project.table.columns";
import { fetchUsers as fetchAllUsers } from "../user/service/user.service";
import EditProjectView from "./edit.project.view";
import { useEffect, useState } from "react";
import { Project } from "./service/project";

export default function ProjectsView() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [showPopoverModal, setShowPopoverModal] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["getAllProjects"],
    queryFn: () => fetchAllProjects(),
  });

  useEffect(() => {
    if (data) {
      setFilteredProjects(data);
    }
  }, [data]);


  const handleFilterChange = (searchTerm: string) => {
    if (!data) return;
    else {
      const filtered = data.filter((p: Project) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.prefix.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("Filtered projects:", filtered);
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
    console.log("Action selected:", selectedAction, "for project:", project);
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
      {error && (
        <p>Error loading projects, try again by refreshing the page.</p>
      )}

      {selectedAction && selectedAction === "edit" && (
        <EditProjectView
          project={project}
          isOpen={showPopoverModal}
          onClose={() => setShowPopoverModal(false)}
        />
      )}
    </CardComponent>
  );
}
