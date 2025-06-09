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
import { useState } from "react";

export default function ProjectsView() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [projectId, setProjectId] = useState("");
  const [showPopoverModal, setShowPopoverModal] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["getAllProjects"],
    queryFn: () => fetchAllProjects(),
  });

  const {
    isLoading: usersLoadingError,
    error: errorUsers,
    data: appUsers,
  } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: () => fetchAllUsers(),
    staleTime: 1000 * 60 * 5,
  });

  function handleActionSelect(action: string, projectId: string) {
    setSelectedAction(action);
    setProjectId(projectId);
    setShowPopoverModal(true);
    console.log("Action selected:", selectedAction, "for project:", projectId);
    if (action === "edit") {
      console.log("Edit action selected for project:", projectId);
    } else if (action === "assignMembers") {
      console.log("Assign Members action selected for project:", projectId);
    }
    else if (action === "viewMembers") {      
      console.log("View Members action selected for project:", projectId);
    }
    else if (action === "archive") {
      console.log("Archived action selected for project:", projectId);
    } else {
      console.log("No action selected for project:", projectId);
    }
  }
  
  return (
    <CardComponent header={<ProjectsViewHeader users={appUsers} />}>
      <div className="mt-8">
        <p className="ml-auto text-secondry text-sm">
          Total Projects:{" "}
          <span className="text-primary-800">{data ? data.length : 0}</span>
        </p>
        <ProjectsTable data={data ?? []} columns={projectColumns} onActionSelect={(a, p) => handleActionSelect(a, p) } />
      </div>

      {isLoading && <LoadingSpinner />}
      {error && (
        <p>Error loading projects, try again by refreshing the page.</p>
      )}

      { selectedAction && selectedAction === "edit" && (<EditProjectView projectId={projectId} isOpen={showPopoverModal} onClose={() => setShowPopoverModal(false)}/>)}
    </CardComponent>
  );
}
