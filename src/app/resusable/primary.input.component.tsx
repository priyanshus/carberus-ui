import { on } from "events";
import { required } from "zod/v4-mini";
import clsx from "clsx";

interface PrimaryInputBoxProps {
  id?: string;
  labelText: string;
  isMandatory?: boolean;
  placeholder?: string;
  type?: string;
  required?: boolean;
  value?: string;
  maxLength?: number;
  hasError?: boolean;
  onChange?: (inputValue: string) => void;
}
export default function PrimaryInputBox({
  id,
  labelText,
  isMandatory,
  placeholder,
  type = "text",
  required = true,
  value,
  maxLength,
  hasError,
  onChange,
}: PrimaryInputBoxProps) {
  return (
    <div>
      <label className="block text-sm text-primary-500 font-bold mb-1" htmlFor={id}>
        {labelText}{" "}
        {isMandatory && <span className="text-danger-higlighter">*</span>}
      </label>
      <input
        type={type}
        id={id}
        required={required}
        value={value}
        maxLength={maxLength}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        placeholder={placeholder}
        className={clsx("w-full", {
          "error-input-box": hasError,
          "input-box": !hasError,
        })}
      />
    </div>
  );
}
