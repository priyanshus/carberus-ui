'use client';
import LoadingSpinner from "@/app/resusable/loading.spinner.component";
import PrimaryButtonComponent from "@/app/resusable/primary.button.component";
import SecondryButtonComponent from "@/app/resusable/secondry.button.component";
import { User } from "@/app/service/user/user.model";
import { CheckIcon, Cross1Icon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { useState } from "react";

interface UserViewProps {
    user: User;
    onEdit?: (user: User) => void;
    onDelete?: (user: User) => void;
}

export default function UserView({ user, onEdit, onDelete }: UserViewProps) {
    const [mode, setMode] = useState<'default' | 'confirming'>('default');
    const [loading, setLoading] = useState(false);

    return (
        <div className={clsx(
            'grid grid-cols-4 gap-2 h-fit p-1 text-sm items-center border-b',
            mode === 'confirming'
                ? ' text-danger-higlighter font-bold'
                : ' border-border-grey text-primary-500'
        )}>
            <div className="col-span-1">{user.firstName} {user.lastName}</div>
            <div className="col-span-1">{user.email}</div>
            <div className="col-span-1 font-bold">{user.roles ? user.roles.join(", ") : 'NO ROLE' }</div>
            <div className="col-span-1 gap-2 flex justify-end">
                {loading && <LoadingSpinner />}
                {mode === 'default' && (<PrimaryButtonComponent labelText="Change Role" icon={Pencil1Icon} onClickAction={() => { onEdit?.(user); setMode('confirming') }} />)}
                {mode === 'default' && (<SecondryButtonComponent labelText="Delete" icon={TrashIcon} onClickAction={() => { setMode('confirming'); }} />)}

                {mode === 'confirming' && (<SecondryButtonComponent labelText="Cancel" icon={Cross1Icon} onClickAction={() => setMode('default')} />)}
                {mode === 'confirming' && (<PrimaryButtonComponent labelText="Confirm Delete" icon={CheckIcon} onClickAction={() => { onDelete?.(user); setMode('default');}} />)}
            </div>
        </div>
    );
}