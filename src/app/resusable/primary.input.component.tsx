import { on } from "events";
import { required } from "zod/v4-mini";
import clsx from "clsx";

interface PrimaryInputBoxProps {
  id?: string;
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
  placeholder,
  type = "text",
  required = true,
  value,
  maxLength,
  hasError,
  onChange,
}: PrimaryInputBoxProps) {
  return (
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
  );
}
