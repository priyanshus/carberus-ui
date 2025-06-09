import { Popover,PopoverPanel,PopoverButton } from '@headlessui/react';
import { DotsHorizontalIcon, DotsVerticalIcon } from '@radix-ui/react-icons'; 
import { on } from 'events';
import Link from 'next/link';

interface ProjectActionsPopoverProps {
  projectId: string;
  onSelect: (action: string) => void;
}
export function ProjectActionsPopover({ projectId, onSelect }: ProjectActionsPopoverProps) {

  return (
    <Popover className="relative">
      <PopoverButton title="Modify Project" className="p-2 hover:bg-background-higlighter cursor-pointer rounded">
        <DotsHorizontalIcon className="w-5 h-5 text-primary-800" />
      </PopoverButton>

      <PopoverPanel
        anchor="bottom"
        className="absolute z-10 mt-2 w-40 bg-white border border-border-highlighter rounded-md shadow-lg flex flex-col text-sm"
      >
        <a
          onClick={() => onSelect('edit')} 
          className="px-4 py-2 hover:bg-background-higlighter"
        >
          Edit Details
        </a>
        <a
          onClick={() => onSelect('assignMembers')} 
          className="px-4 py-2 hover:bg-background-higlighter"
        >
          Assign Members
        </a>
        <Link
          href={`/projects/${projectId}/edit`}
          className="px-4 py-2 hover:bg-background-higlighter"
        >
          View Members
        </Link>
        <button
          onClick={() => console.log("Confirm delete:", projectId)}
          className="px-4 py-2 text-danger-higlighter hover:bg-danger-background-highlighter text-left"
        >
          Deactivate
        </button>
      </PopoverPanel>
    </Popover>
  );
}
