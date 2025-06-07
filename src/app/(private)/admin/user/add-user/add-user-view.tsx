'use client'

import { useState } from "react";
import PrimaryInputBox from "../../../../resusable/primary.input.component";
import PrimaryButtonComponent from "@/app/resusable/primary.button.component";
import PrimaryListBoxComponent from "@/app/resusable/primary.llistbox.component";
import { USER_ROLES, UserRole } from "@/app/appConstants/user.roles";
import { addUser, fetchUsers } from "../service/user.service";
import getErrorMessage from "@/app/appConstants/app.errors.mapping";
import ErrorToastComponent from "@/app/resusable/error.toast.component";
import { CheckIcon } from "@radix-ui/react-icons";
import PopupCardComponent from "@/app/resusable/card-layout/popup.card.component";
import SuccessMessageComponent from '../../../../resusable/feedback/success.message.component';

interface AddUserViewProps {
  open: boolean
  onClose: () => void;
}

export default function AddUserView({ open, onClose }: AddUserViewProps) {

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: USER_ROLES[0] as UserRole,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getAllUsers = async () => {
    try {
      const data = await fetchUsers();
    } catch (err: any) {
      const errorMessage = getErrorMessage(err.message);
    }
  };

  async function saveUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const role = form.role.replaceAll(" ", "").toUpperCase();

    try {
      await addUser({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        password: "123456",
        role,
      });

      setSuccessMessage(`Successfully added ${form.email}.`);
      setForm({
        email: "",
        firstName: "",
        lastName: "",
        role: USER_ROLES[0],
      });

      await getAllUsers();
    } catch (err: any) {
      setErrorMessage(getErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PopupCardComponent
        isOpen={open}
        onClose={onClose}
        title="Add User"
      >
        <div>
          <form id="addUserForm" onSubmit={saveUser}>
            <div className="mb-4">
              <label className="block text-sm text-primary-500 font-bold">
                Email
              </label>
              <div className="my-1">
                <PrimaryInputBox
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e })}
                  placeholder="Enter Email"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex flex-col">
                <label className="block text-sm text-primary-500 font-bold">
                  First Name
                </label>
                <div className="my-1">
                  <PrimaryInputBox
                    id="fname"
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e })}
                    placeholder="Enter First Name"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="block text-sm text-primary-500 font-bold">
                  Last Name
                </label>
                <div className="my-1">
                  <PrimaryInputBox
                    id="lname"
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e })}
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-primary-500 font-bold mb-1">
                Select Role
              </label>
              <PrimaryListBoxComponent
                options={USER_ROLES}
                onChange={(role) => setForm({ ...form, role })}
                value={form.role}
              />
            </div>
            <div className="flex flex-row gap-2 mt-10 justify-end">
              <PrimaryButtonComponent icon={CheckIcon} disabled={loading} labelText="Add User" />
            </div>
          </form>
        </div>

        <div className="mt-4">
          {successMessage && (
            <SuccessMessageComponent message={successMessage} />
          )}
        </div>
      </PopupCardComponent>

      {errorMessage && <ErrorToastComponent errorMessage={errorMessage} />}
    </div>
  );
}
