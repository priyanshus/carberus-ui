import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { Cross1Icon } from '@radix-ui/react-icons';
import React, { ReactNode } from 'react'

type PopupCardComponentProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

const PopupCardComponent = ({ isOpen, onClose, title, children }: PopupCardComponentProps) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            <div className="z-50 bg-white rounded-lg p-6 shadow-2xl">
                <div className='flex flex-row mb-6'>
                    {title && (
                        <DialogTitle className="font-semibold text-primary-800">
                            {title}
                        </DialogTitle>
                    )}
                    <div className='ml-auto place-content-end justify-end'>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 cursor-pointer hover:pointer-fine"
                        >
                            <Cross1Icon className='w-4 h-4'/>
                        </button>
                    </div>
                </div>

                <div className="mt-2">
                    {children}
                </div>

            </div>
        </Dialog>
    )
}

export default PopupCardComponent
