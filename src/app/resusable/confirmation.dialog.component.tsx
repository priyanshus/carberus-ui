import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { Fragment } from "react";
import PopupCardComponent from "./card-layout/popup.card.component";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  hightlightText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <PopupCardComponent isOpen={open} onClose={onCancel} title={title}>
      <div className="flex p-4 bg-yellow-100 text-sm rounded-sm">
        <p className="max-w-100 text-justify">{description}</p>
      </div>
      <div className="flex flex-row gap-2 justify-center w-100 mt-10">
        <button className="btnSecondry" onClick={onCancel}>Cancel</button>
        <button className="btn" onClick={onConfirm}>Confirm</button>
      </div>
    </PopupCardComponent>
  );
}
