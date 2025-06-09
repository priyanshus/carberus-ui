import PrimaryButtonComponent from "@/app/resusable/primary.button.component";
import { PersonIcon } from '@radix-ui/react-icons';
import { useState } from "react";
import AddUserView from "./add-user/add-user-view";

interface UserHeaderProps {
  userCount?: number;
  onSearchChange?: (searchTerm: string) => void;
}


export default function UserHeader({ userCount, onSearchChange }: UserHeaderProps) {
  const [showPopup, setShowPopup] = useState(false);

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

      <div className="mx-auto">

      </div>

        <input
          type="text"
          id="filterInput"
          onChange={(e) => { onSearchChange && onSearchChange(e.target.value) }}
          placeholder="Search users..."
          className="input-box mr-2"
        />
        <PrimaryButtonComponent onClickAction={() => setShowPopup(true)} labelText="Add User" icon={PersonIcon}></PrimaryButtonComponent>

      
      {showPopup && (
        <AddUserView
          open={showPopup}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
