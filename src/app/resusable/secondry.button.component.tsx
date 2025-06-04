import { ButtonProps } from '@headlessui/react';
import React from 'react';
import { ButtonProperties } from './primary.button.component';


export default function SecondryButtonComponent({
    labelText = 'Submit',
    icon: Icon,
    onClickAction,
}: ButtonProperties) {
    return (
        <button type='submit' onClick={onClickAction} className="btnSecondry">
            {Icon && <Icon className="mx-1 icon" />}
            {labelText}
        </button>
    );
}
