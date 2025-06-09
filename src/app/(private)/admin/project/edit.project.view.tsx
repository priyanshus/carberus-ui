
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

interface EditProjectViewProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
} 


export default function EditProjectView({projectId, isOpen, onClose}: EditProjectViewProps) {
  
  return (
    <PopupCardComponent isOpen={isOpen} onClose={() => onClose()}
      title="Edit Project"
    >
      <h1>{projectId}</h1>
    </PopupCardComponent> 
  );
}
