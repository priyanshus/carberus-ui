'use client';
import { DropdownMenu } from "radix-ui";
import { useState } from 'react';

type ClassItem = {
    label: string;
    value: string;
};

const classOptions = {
    'Grade 5': [
        { label: 'Section A - Homeroom', value: 'grade5-homeroom' },
        { label: 'Section B - Science', value: 'grade5-science' },
    ],
    'Grade 6': [
        { label: 'Period 1 - English', value: 'grade6-english' },
        { label: 'Period 2 - Science', value: 'grade6-science' },
    ]
};

export default function ClassRoomSelector() {
    const [selected, setSelected] = useState<ClassItem>({
        label: 'Grade 6 - Science (Period 2)',
        value: 'grade6-science',
    });

    return (
        <div className="flex flex-row h-fit bg-white">
            <div className="w-1/2">
                <div className=" rounded-md text-md p-2">
                    <strong>Viewing:</strong> {selected.label} | 24 Students | Room 301
                </div>
            </div>
            <div className="flex w-1/2 justify-end items-center">
                <strong>Change Classroom</strong> 
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger className="ml-4 px-4 py-2 rounded-md text-left h-full border border-blue-400 shadow-sm hover:bg-gray-50 cursor-pointer">
                        {selected.label}
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content className="bg-white rounded-md shadow-lg mt-1 z-50">
                        {Object.entries(classOptions).map(([group, items]) => (
                            <div key={group}>
                                <div className="px-3 pt-2 pb-1 text-xs uppercase text-gray-400">{group}</div>
                                {items.map((item) => (
                                    <DropdownMenu.Item
                                        key={item.value}
                                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                        onSelect={() => setSelected(item)}
                                    >
                                        {item.label}
                                    </DropdownMenu.Item>
                                ))}
                            </div>
                        ))}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>


        </div>
    );
}