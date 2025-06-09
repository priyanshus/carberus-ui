import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react'
import React from 'react'

interface DropdownSelectProps<T extends string> {
  options: readonly T[]
  value: T
  onChange: (value: T) => void
  placeholder?: string
}

export default function PrimaryListBoxComponent<T extends string>({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
}: DropdownSelectProps<T>) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <ListboxButton className="w-full border border-gray-200 rounded-sm py-2 px-2 text-sm text-left bg-white focus:outline-none">
          {value || placeholder}
        </ListboxButton>

        <ListboxOptions className="absolute z-10 mt-2 w-40 bg-white border border-border-highlighter rounded-md flex flex-col text-sm shadow-lg overflow-auto">
          {options.map(option => (
            <ListboxOption
              key={option}
              value={option}
              className={({selected}) =>
                `px-4 py-2 hover:bg-background-higlighter cursor-pointer text-sm {
                  ${selected ? 'font-extrabold text-primary-500' : 'text-primary-800'}`
              }
            >
              {option}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
