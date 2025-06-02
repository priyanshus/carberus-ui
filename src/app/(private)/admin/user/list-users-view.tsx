'use client'
import CardComponent from '@/app/resusable/card.component';
import PrimaryButtonComponent from '@/app/resusable/primary.button.component';
import SecondryButtonComponent from '@/app/resusable/secondry.button.component';
import React, { useState } from 'react'
import UserEditView from './user-edit-view';

const users = [
  { name: 'Jane Doe', email: 'jane@example.com', role: 'Admin' },
  { name: 'John Smith', email: 'john@company.com', role: 'Editor' },
  { name: 'Sarah Lee', email: 'sarah@domain.com', role: 'Viewer' },
];

const ListUsersView = () => {
  const [isEditableMode, setEditableMode] = useState(false);

  function onEditClick() {
    setEditableMode(true);
  }

  return (

    <div>
      <CardComponent header='Users'>
        <div className="p-2">
          {/* Header Row */}
          <div className="grid grid-cols-4 font-semibold text-primary-800 border-b border-border-grey ">
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Data Rows */}
          {users.map((user, idx) => (
            <div
              key={idx}
              className="items-center place-content-center mt-2 mb-2 grid grid-cols-4 border-b border-border-grey text-sm text-primary-800 hover:bg-gray-50 transition"
            >
              {isEditableMode ? (<div><input placeholder={user.name} className='border border-primary-500 rounded-md p-1'></input></div>): (<div>{user.name}</div>)}
              <div className="truncate">{user.email}</div>
              <div className="font-bold">{user.role}</div>
              <div className="flex justify-end gap-2 mb-2">
                <PrimaryButtonComponent labelText='Edit' onClickAction={onEditClick} />
                <SecondryButtonComponent labelText='Delete' onClickAction={onEditClick} />
              </div>
            </div>
          ))}
        </div>
      </CardComponent>

    </div>
  );
}

export default ListUsersView;
