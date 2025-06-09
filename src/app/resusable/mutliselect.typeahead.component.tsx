import { Combobox, ComboboxOption, ComboboxOptions, ComboboxInput } from "@headlessui/react";
import { useState } from "react";
import { User } from "../service/user/user.model";


type Props = {
  options: User[];
  selected: string[];
  onChange: (newSelected: string[]) => void;
};

export default function MultiSelectTypeahead({ options, selected, onChange }: Props) {
  const [query, setQuery] = useState("");

  const filteredOptions = options.filter(
    (user) =>
      user.email.toLowerCase().includes(query.toLowerCase()) &&
      !selected.includes(user.id)
  );

  const addUser = (user: User) => {
    onChange([...selected, user.id]);
    setQuery("");
  };

  const removeUser = (id: string) => {
    onChange(selected.filter((uid) => uid !== id));
  };

  const selectedUsers = options.filter((u) => selected.includes(u.id));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedUsers.map((user) => (
          <span
            key={user.id}
            className="bg-background-light text-primary-500 text-xs px-2 py-1 rounded flex items-center"
          >
            {user.email}
            <button
              className="ml-1 text-red-500"
              onClick={() => removeUser(user.id)}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <Combobox<User> onChange={addUser}>
        <div className="relative">
          <ComboboxInput
            className="w-full border px-2 py-1 rounded text-sm"
            onChange={(e) => setQuery(e.target.value)}
            displayValue={() => ""}
            placeholder="Type to search users"
          />
          {filteredOptions.length > 0 && (
            <ComboboxOptions className="absolute z-10 w-full bg-white border mt-1 rounded max-h-40 overflow-auto shadow">
              {filteredOptions.map((user) => (
                <ComboboxOption
                  key={user.id}
                  value={user}
                  className={({ active }) =>
                    `cursor-pointer px-2 py-1 ${
                      active ? "bg-blue-100" : ""
                    }`
                  }
                >
                  {user.email}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </div>
  );
}
