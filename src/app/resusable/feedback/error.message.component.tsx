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
        <div className="bg-danger-background-highlighter text-danger-higlighter border-l-4 border-l-danger-higlighter p-4 rounded-md flex items-center justify-start ">
          
          <ExclamationTriangleIcon className="mr-2h-6 w-6" />
          <p className="font-bold">
            {messageText}
          </p>
          <Cross1Icon
            className="ml-auto mr-2 cursor-pointer hover:text-primary-500"
            onClick={() => setShow(false)}
          />
        </div>
      )}
    </>
  );
}
