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
        <div className="bg-success-background-highlighter p-4 rounded-md flex items-center justify-start border-l-4 border-l-success-higlighter">
          <CheckCircledIcon className="mr-2 text-success-higlighter h-6 w-6" />
          <p className="font-bold text-success-higlighter">
            {message}
          </p>
          <Cross1Icon
            className="ml-auto cursor-pointer text-success-higlighter hover:text-primary-500"
            onClick={() => setShow(false)}
          />
        </div>
      )}
    </>
  );
}
