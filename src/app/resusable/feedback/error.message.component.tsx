import { CheckCircledIcon, Cross1Icon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function ErrorMessageComponent({
  message,
}: {
  message: string;
}) {
  const [show, setShow] = useState(true);
  const messageText = message.length > 100 ? message.slice(0, 97) + "..." : message;
  return (
    <>
      {show && (
        <div className="bg-danger-higlighter p-2 rounded-lg flex items-center justify-start shadow-md">
          
          <ExclamationTriangleIcon className="mr-2 text-white h-6 w-6" />
          <p className="text-sm text-white">
            {messageText}
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
