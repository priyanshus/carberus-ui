'use client';
import ClassRoomSelector from "./classroom.selector";
import FileImportComponent from "../../../resusable/file.import.component";
import clientHttpClient from "@/lib/http/client/clientHttpClient";
import User from "../../../service/user/user.model";

import React, { useEffect, useState } from 'react';
import { isCurrentUserHasAdminRole } from "@/app/service/user/user.service";

export default function QuickSummaryPage() {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        clientHttpClient<User>('/api/me', { method: 'GET', auth: true })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                setError('Failed to load user');
                console.error(err);
            });
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-extrabold">Quick Summary</h1>
            <p>{user?.roles}</p>
            <div className="mt-4">
                <ClassRoomSelector />
            </div>

            {user && isCurrentUserHasAdminRole(user) && (<div>
                <FileImportComponent title="Import Students Metadata" />
            </div>)}
        </div>
    );
}
