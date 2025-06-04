"use client";
import CardComponent from "@/app/resusable/card-layout/card.component";
import React, { useState, useEffect } from "react";
import UserView from "./user-view";
import UserHeader from "./user-header";
import clientHttpClient from "@/lib/http/client/clientHttpClient";
import { User, Users } from "@/app/service/user/user.model";
import UserEditView from "./user-edit-view";

const ListUsersView = () => {
  const [isEditableMode, setEditableMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [editableUserId, setEditableUserId] = useState<string | null>(null);

  useEffect(() => {
    clientHttpClient<User[]>("/api/users", {
      method: "GET",
    })
      .then((response) => {
        console.log("Fetched users:", response);
        const { data, status } = response;
        if (status !== 200) {
          throw new Error("Failed to fetch users");
        }
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    console.log("Search term changed:", searchTerm);
    const filtered = users.filter((user) => {
      const email = user.email.toLowerCase();
      return email.includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filtered);
  }, [searchTerm]);

  const handleEditUser = (user: User, enableEdit: boolean) => {
    console.log("Editing user:", user);
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
        {filteredUsers &&
          filteredUsers.map((user, index) => (
            <div key={index}>
              {isEditableMode && user.id == editableUserId ? (
                <UserEditView
                  user={user}
                  onCancel={() => handleEditUser(user, false)}
                />
              ) : (
                <UserView
                  user={user}
                  onEdit={(user) => handleEditUser(user, true)}
                />
              )}
            </div>
          ))}
      </CardComponent>
    </div>
  );
};

export default ListUsersView;
