import React from 'react';

export type ButtonProperties = {
    labelText?: string;
    onClickAction?: () => void;
};

export default function PrimaryButtonComponent({
    labelText = 'Submit',
    onClickAction,
}: ButtonProperties) {
    return (
        <button onClick={onClickAction} className="btn">
            {labelText}
        </button>
    );
}
