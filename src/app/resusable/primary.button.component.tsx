import React from 'react';

type PrimaryButtonProps = {
    labelText?: string;
    isEnabled?: boolean;
    onClickAction?: () => void;
};

export default function PrimaryButtonComponent({
    labelText = 'Submit',
    isEnabled = true,
    onClickAction,
}: PrimaryButtonProps) {
    return (
        <button
            disabled={!isEnabled}
            onClick={onClickAction}
            className={`px-4 py-2 rounded-md shadow-sm border transition
        ${isEnabled
                    ? 'border-blue-400 text-blue-500 cursor-pointer pointer-events-auto opacity-100 hover:bg-blue-50'
                    : 'border-gray-400 text-gray-400 cursor-not-allowed pointer-events-none opacity-50'
                }`}
        >
            {labelText}
        </button>
    );
}
