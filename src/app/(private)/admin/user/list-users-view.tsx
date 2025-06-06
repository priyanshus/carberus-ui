"use client";
import CardComponent from "@/app/resusable/card-layout/card.component";
import React, { useState, useEffect } from "react";
import UserView from "./user-view";
import UserHeader from "./user-header";
import { User, Users } from "@/app/service/user/user.model";
import UserEditView from "./user-edit-view";
import LoadingSpinner from "@/app/resusable/loading.spinner.component";
import getErrorMessage from "@/app/appConstants/app.errors.mapping";
import { deleteUser, fetchUsers, updateUserRole } from "./service/user.service";
import ErrorToastComponent from "@/app/resusable/error.toast.component";

export default function ListUsersView() {
  const [isEditableMode, setEditableMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [editableUserId, setEditableUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err: any) {
        const errorMessage = getErrorMessage(err.message);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleEditConfirmation = (user: User, role: string) => {
    setError("");
    role = role.replaceAll(' ', '').toUpperCase();
    const updateRole = async () => {
      try {
        await updateUserRole(user, role);
        await getAllUsers();
      } catch (err: any) {
        const errorMessage = getErrorMessage(err.message);
        setError(errorMessage);
      } finally {
        setEditableMode(false);
      }
    };

    updateRole();
  }

  const handleDeleteConfirmation = (user: User) => {
    setError("");
    const submitDeleteRequest = async () => {
      try {
        await deleteUser(user);
        await getAllUsers();
      } catch (err: any) {
        console.log('In error');
        const errorMessage = getErrorMessage(err.message);
        setError(errorMessage);
      } finally {
        setEditableMode(false);
      }
    };

    submitDeleteRequest();
  }

  useEffect(() => {
    const filtered = users.filter((user) => {
      const email = user.email.toLowerCase();
      return email.includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filtered);
  }, [searchTerm]);


  const handleEditUser = (user: User, enableEdit: boolean) => {
    setEditableMode(enableEdit);
    setEditableUserId(user.id);
  };

  return (
    <div>
      <CardComponent
        header={
          <UserHeader
            userCount={filteredUsers.length}
            onSearchChange={setSearchTerm}
          />
        }
      >
        <div className="grid grid-cols-4 gap-2 border-b border-border-grey font-bold">
          <div>Full Name</div>
          <div>Email</div>
          <div>Role</div>
        </div>

        {loading && <LoadingSpinner />}
        {error && (<ErrorToastComponent errorMessage={error}/>)}

        {filteredUsers &&
          filteredUsers.map((user, index) => (
            <div key={index}>
              {isEditableMode && user.id == editableUserId ? (
                <UserEditView
                  user={user}
                  onSave={(user, role) => handleEditConfirmation(user, role)}
                  onCancel={() => handleEditUser(user, false)}
                />
              ) : (
                <UserView
                  user={user}
                  onDelete={(user) => handleDeleteConfirmation(user)}
                  onEdit={(user) => handleEditUser(user, true)}
                />
              )}
            </div>
          ))}
      </CardComponent>
    </div>
  );
};

