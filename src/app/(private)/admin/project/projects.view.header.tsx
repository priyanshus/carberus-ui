"use client";

import PrimaryButtonComponent from "@/app/resusable/primary.button.component";
import { useState } from "react";
import AddProjectView from "./add.project.view";
import { User } from "@/app/service/user/user.model";
import { Project } from "./service/project";

interface ProjectsViewHeaderProps {
  users?: User[];
  projects?: Project[]
  onFilter: (searchTerm: string) => void;
}

export default function ProjectsViewHeader({ users, projects, onFilter }: ProjectsViewHeaderProps) {
  const [showAddProjectPopup, setShowAddProjectPopup] = useState(false);

  return (
    <div className="flex flex-row items-center w-full">
      <div className="flex flex-col h-fit">
        <h1 className="text-lg font-bold text-primary-800">
          Project Management
        </h1>
        <p className="text-sm text-secondry">
          Manage your projects efficiently.
        </p>
      </div>

      <div className="mx-auto"></div>

      <input
        type="text"
        id="filterInput"
        onChange={(e) => onFilter(e.target.value)}
        placeholder="Search projects..."
        className="input-box mr-2"
      />

      <PrimaryButtonComponent
        labelText="Add Project"
        onClickAction={() => setShowAddProjectPopup(true)}
      />

      {showAddProjectPopup && (
        <AddProjectView
          projects={projects ?? []}
          users={users}
          open={showAddProjectPopup}
          onClose={() => setShowAddProjectPopup(false)}
        />
      )}
    </div>
  );
}
