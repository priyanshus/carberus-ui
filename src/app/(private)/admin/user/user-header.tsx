import PrimaryButtonComponent from "@/app/resusable/primary.button.component";
import { PersonIcon } from '@radix-ui/react-icons';
import { redirect } from "next/navigation";

interface UserHeaderProps {
    userCount?: number;
    onSearchChange?: (searchTerm: string) => void;
}


export default function UserHeader({userCount, onSearchChange}: UserHeaderProps) {

  function handleNewUserClick() {
    redirect('/admin/user/add-user');
  }

  return (
    <div className="flex flex-row items-center overflow-auto w-full">
      {/* Left: Title + Count */}
      <div className="flex gap-2 h-fit items-center">
        <h1 className="text-xl font-semibold text-primary-800">
          User Management
        </h1>
        <button className="w-fit bg-background-light px-2 border-1 rounded-md text-[12px] text-primary-500">
          {userCount}
        </button>
      </div>

      {/* Center: Input Box */}
      <div className="mx-auto">
    
      </div>

      <div className="justify-end">
      <input
          type="text"
          id="filterInput"
          onChange={(e) => {onSearchChange && onSearchChange(e.target.value)}}
          placeholder="Search users..."
          className="border py-2 px-2 w-[300]  border-primary-500 rounded-sm text-sm mr-2 gap-1 focus:outline-none focus:border-primary-800"
        />
        <PrimaryButtonComponent onClickAction={handleNewUserClick} labelText="Add User" icon={PersonIcon}></PrimaryButtonComponent>
        
      </div>
    </div>
  );
}
