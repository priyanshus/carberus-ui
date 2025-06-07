import { CheckCircledIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function SuccessMessageComponent({
  message,
}: {
  message: string;
}) {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <div className="bg-primary-800 p-2 rounded-lg flex items-center justify-start shadow-md">
          <CheckCircledIcon className="mr-2 text-success-higlighter h-6 w-6" />
          <p className="text-sm font-semibold text-background-light">
            {message}
          </p>
          <Cross1Icon
            className="ml-auto mr-2 cursor-pointer text-background-light hover:text-primary-500"
            onClick={() => setShow(false)}
          />
        </div>
      )}
    </>
  );
}
