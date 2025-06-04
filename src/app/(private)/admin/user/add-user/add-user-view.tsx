import CardComponent from "@/app/resusable/card-layout/card.component";
import PrimaryInputBox from "../../../../resusable/primary.input.component";
import PrimaryButtonComponent from "@/app/resusable/primary.button.component";
import SecondryButtonComponent from "@/app/resusable/secondry.button.component";
import { useState } from "react";
import React from "react";
import { useFormState } from "react-dom";
import { set } from "zod/v4";
import { time } from "console";
import clientHttpClient from "@/lib/http/client/clientHttpClient";
import { fi } from "zod/v4/locales";

export default function AddUserView() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveUserResponse, setSaveUserResponse] = useState("");
  const password = "123456";

  async function saveUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    
    const { status } = await clientHttpClient('/api/user', {
          method: 'POST',
          body: {
            email,
            firstName,
            lastName,
            password
          }
        });
    if (status !== 201) {
        setLoading(false);
        setSaveUserResponse(`Failed to save user ${email}. Please try again.`);
    } else if (status === 201) {
        setLoading(false);
        setEmail("");
        setFirstName(""); 
        setLastName("");
        setSaveUserResponse(`Successfully added ${email}.`);
    } else {
        setSaveUserResponse(`Something went wrong while saving user ${email}. Please try again.`);
        setLoading(false);
    }

  return (
    <div>
      <CardComponent
        header={
          <h1 className="text-xl font-semibold text-primary-800">Add User</h1>
        }
      >
        <div className="grid grid-cols-2 gap-2">
          <form id="addUserForm" onSubmit={saveUser}>
            <label className="block text-sm text-primary-500 font-bold">
              Email
            </label>
            <div className="my-1 w-lg">
              <PrimaryInputBox id="email" type="email" required onChange={e => setEmail(e)} placeholder="Enter Email" />
            </div>

            <div className="grid grid-cols-2 gap-2 w-lg my-2">
              <div className="flex flex-col">
                <label className="block text-sm text-primary-500 font-bold">
                  First Name
                </label>
                <div className="my-1">
                  <PrimaryInputBox id="fname" type="text" onChange={e => setFirstName(e)} required placeholder="Enter First Name" />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="block text-sm text-primary-500 font-bold">
                  Last Name
                </label>
                <div className="my-1">
                  <PrimaryInputBox id="lname" type="text" onChange={e => setLastName(e)} placeholder="Enter Last Name" />
                </div>
              </div>

              <div className="flex flex-row gap-2 mt-8">
                <PrimaryButtonComponent disabled={loading} labelText="Save" />
                <SecondryButtonComponent disabled={loading} labelText="Cancel" />
              </div>
            </div>
          </form>
        </div>

        <div className="col-span-2">
          {saveUserResponse && (
            <div className="text-primary-800">{saveUserResponse}</div>
          )}
        </div>
      </CardComponent>
    </div>
  );
}
