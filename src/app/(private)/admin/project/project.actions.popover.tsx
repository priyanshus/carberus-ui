import { Popover, PopoverPanel, PopoverButton } from "@headlessui/react";
import { DotsHorizontalIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { on } from "events";
import Link from "next/link";
import { Project } from "./service/project";

interface ProjectActionsPopoverProps {
  project: Project;
  onSelect: (action: string) => void;
}
export function ProjectActionsPopover({
  project,
  onSelect,
}: ProjectActionsPopoverProps) {
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
        className="absolute z-10 mt-2 w-40 bg-white border border-border-highlighter rounded-md shadow-lg flex flex-col text-sm hover:font-semibold"
      >
        {project.status !== "ARCHIVED" && (
          <a
            onClick={() => onSelect("edit")}
            className="px-4 py-2 hover:bg-background-higlighter"
          >
            Edit Details
          </a>
        )}
        {project.status !== "ARCHIVED" && (
          <a
            onClick={() => onSelect("assignMembers")}
            className="px-4 py-2 hover:bg-background-higlighter cursor-pointer"
          >
            Assign Members
          </a>
        )}
        <Link
          href={`/projects/edit`}
          className="px-4 py-2 hover:bg-background-higlighter"
        >
          View Members
        </Link>
        {project.status !== "ARCHIVED" ? (
          <button
            onClick={() => onSelect("archive")}
            className="px-4 py-2 text-danger-higlighter hover:bg-danger-background-highlighter text-left cursor-pointer"
          >
            Archive
          </button>
        ) : (
          <button
            onClick={() => onSelect("activate")}
            className="px-4 py-2 bg-success-background-highlighter text-success-higlighter text-left cursor-pointer"
          >
            Activate
          </button>
        )}
      </PopoverPanel>
    </Popover>
  );
}
