import { ButtonProps } from '@headlessui/react';
import React from 'react';
import { ButtonProperties } from './primary.button.component';


export default function SecondryButtonComponent({
    labelText = 'Submit',
    onClickAction,
}: ButtonProperties) {
    return (
        <button onClick={onClickAction} className="btnSecondry">
            {labelText}
        </button>
    );
}
