import { Listbox } from '@headlessui/react'
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
        <Listbox.Button className="w-full border border-primary-500 rounded-sm py-2 px-2 text-sm text-left bg-white focus:outline-none">
          {value || placeholder}
        </Listbox.Button>

        <Listbox.Options className="absolute mt-1 w-full bg-background-light border border-gray-300 rounded-sm shadow-lg z-10 max-h-60 overflow-auto">
          {options.map(option => (
            <Listbox.Option
              key={option}
              value={option}
              className={({ active, selected }) =>
                `cursor-pointer px-3 py-2 text-sm
                ${active ? 'bg-primary-100 text-primary-900' : ''}
                ${selected ? 'font-semibold' : 'font-normal'}`
              }
            >
              {option}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
