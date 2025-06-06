"use client";
import { USER_ROLES, UserRole } from "@/app/appConstants/user.roles";
import LoadingSpinner from "@/app/resusable/loading.spinner.component";
import PrimaryButtonComponent from "@/app/resusable/primary.button.component";
import PrimaryListBoxComponent from "@/app/resusable/primary.llistbox.component";
import SecondryButtonComponent from "@/app/resusable/secondry.button.component";
import { User } from "@/app/service/user/user.model";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";


interface UserEditViewProps {
  user: User;
  onSave?: (user: User, role: string) => void;
  onCancel?: () => void;
}

const UserEditView = ({ user, onSave, onCancel }: UserEditViewProps) => {
  const [role, setRole] = useState<UserRole>(USER_ROLES[0]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="py-2 grid grid-cols-4 gap-2 items-center self-center border-b border-border-grey text-sm">
      <div className="truncate text-primary-500">{user.firstName} {user.lastName}</div> 
      <div className="truncate text-primary-500">{user.email}</div>
      <PrimaryListBoxComponent options={USER_ROLES} onChange={setRole} value={role} />
      <div className="col-span-1 gap-2 flex justify-end">
        { loading && <LoadingSpinner />}
        <PrimaryButtonComponent labelText="Save" icon={CheckIcon} onClickAction={() => {setLoading(true); onSave?.(user, role);}} />
        <SecondryButtonComponent labelText="Cancel" icon={Cross1Icon} onClickAction={() => {setLoading(false); onCancel?.()}} />
      </div>
    </div>
  );
};

export default UserEditView;
