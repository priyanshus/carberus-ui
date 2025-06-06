import { on } from "events";
import { required } from "zod/v4-mini";


interface PrimaryInputBoxProps {
    id?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    value?: string
    onChange?: (inputValue: string) => void;
}
export default function PrimaryInputBox({id, placeholder, type='text', required=true, value, onChange}: PrimaryInputBoxProps) {
    return (
        <input
          type={type}
          id={id}
          required={required}
          value={value}
          onChange={(e) => {onChange && onChange(e.target.value)}}
          placeholder={placeholder}
          className="w-full border py-2 px-2 border-primary-500 rounded-sm text-sm mr-2 gap-1 focus:outline-none focus:border-primary-800"
        />
    );
}