import { Popover, PopoverPanel, PopoverButton } from "@headlessui/react";
import { DotsHorizontalIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { on } from "events";
import Link from "next/link";
import { Project } from "../model/project";
import clsx from 'clsx';

interface ProjectActionsPopoverProps {
  project: Project;
  onSelect: (action: string) => void;
}
export function ProjectActionsPopover({
  project,
  onSelect,
}: ProjectActionsPopoverProps) {

  const isProjectActive = project.status === "ACTIVE";
  const archiveProjectOptions = ['viewMembers', 'activate'];
  const activeProjectOptions = ['edit', 'assignMembers', 'viewMembers', 'archive'];


  return (
    <Popover className="relative">
      <PopoverButton
        title="Modify Project"
        className="p-2 hover:bg-background-higlighter cursor-pointer rounded"
      >
        <DotsHorizontalIcon className="w-5 h-5 text-primary-800" />
      </PopoverButton>

      <PopoverPanel
        anchor="bottom"
        className="absolute z-10 mt-2 w-40 bg-white border border-border-highlighter rounded-md shadow-lg flex flex-col text-sm hover:font-semibold">
        
        { isProjectActive ? 
          activeProjectOptions.map((action) => (
            <a
              key={action}
              onClick={() => onSelect(action)}
              className={clsx(`px-4 py-2 hover:bg-background-higlighter cursor-pointer`, {
                'text-danger-higlighter hover:bg-danger-background-highlighter': action === 'archive'
              })}
            >
              {action.charAt(0).toUpperCase() + action.slice(1).replace(/([A-Z])/g, ' $1')}
            </a>
          )):
          archiveProjectOptions.map((action) => (
            <a
              key={action}
              onClick={() => onSelect(action)}
              className={clsx("px-4 py-2 hover:bg-background-higlighter cursor-pointer", {
                'text-success-higlighter hover:bg-success-background-highlighter': action === 'activate'
              })}
            >
              {action.charAt(0).toUpperCase() + action.slice(1).replace(/([A-Z])/g, ' $1')}
            </a>
          ))    
        }
      </PopoverPanel>
    </Popover>
  );
}
