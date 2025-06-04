import PrimaryButtonComponent from "@/app/resusable/primary.button.component";
import SecondryButtonComponent from "@/app/resusable/secondry.button.component";
import { User } from "@/app/service/user/user.model";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

interface UserViewProps {
    user: User;
    onEdit?: (user: User) => void;
    onDelete?: (user: User) => void;
}

export default function UserView({ user, onEdit, onDelete }: UserViewProps) {
    
    return (
        <div className="grid grid-cols-4 gap-2 h-fit border-b border-border-grey p-1 text-sm items-center">
            <div className="col-span-1 text-primary-500">{user.email}</div>
            <div className="col-span-1 text-primary-500">{user.email}</div>
            <div className="col-span-1 text-primary-500">{user.roles.join(", ")}</div>
            <div className="col-span-1 gap-2 flex justify-end">
                <PrimaryButtonComponent labelText="Edit" icon={Pencil1Icon} onClickAction={() => onEdit?.(user)} />
                <SecondryButtonComponent labelText="Delete" icon={TrashIcon} onClickAction={() => onDelete?.(user)} />
            </div>
        </div>
    );
}