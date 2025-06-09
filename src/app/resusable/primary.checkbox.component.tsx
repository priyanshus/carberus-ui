import { Checkbox } from "@headlessui/react";


interface CheckboxProps {
    labelText?: string;
    checked?: boolean;
    onChangeAction?: (checked: boolean) => void;
    disabled?: boolean;
    additionalClasses?: string;
}
export default function PrimaryCheckboxComponent({
    labelText = 'Checkbox',
    checked = false,
    onChangeAction,
    disabled = false,
    additionalClasses = ''
}: CheckboxProps) {
    return (
        <Checkbox
      checked={checked}
      onChange={onChangeAction}
      className="group block size-4 rounded border bg-white data-checked:bg-blue-500"
    >
      <svg className="stroke-white opacity-0 group-data-checked:opacity-100" viewBox="0 0 14 14" fill="none">
        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Checkbox>
    );
}