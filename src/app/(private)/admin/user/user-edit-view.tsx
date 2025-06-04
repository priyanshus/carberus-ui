"use client";
import PrimaryButtonComponent from "@/app/resusable/primary.button.component";
import SecondryButtonComponent from "@/app/resusable/secondry.button.component";
import { User } from "@/app/service/user/user.model";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";

interface UserEditViewProps {
  user: User;
  onSave?: (user: User) => void;
  onCancel?: () => void;
}

const UserEditView = ({ user, onSave, onCancel }: UserEditViewProps) => {
  return (
    <div className="py-2 grid grid-cols-4 gap-2 items-center self-center border-b border-border-grey text-sm">
      <input
        type="text"
        id="ediUser"
        placeholder={user.email}
        className="border w-fit p-2 border-primary-500 rounded-sm text-sm focus:border-primary-800 focus:border-2"
      />
      <div className="truncate text-primary-500">{user.email}</div>
      <div className="font-bold text-primary-500">{user.roles.join(", ")}</div>
      <div className="col-span-1 gap-2 flex justify-end">
        <PrimaryButtonComponent labelText="Save" icon={CheckIcon} />
        <SecondryButtonComponent labelText="Cancel" icon={Cross1Icon} onClickAction={onCancel} />
      </div>
    </div>
  );
};

export default UserEditView;
