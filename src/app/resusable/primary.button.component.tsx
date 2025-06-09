import React from 'react';
import { IconProps } from '@radix-ui/react-icons/dist/types';

export type ButtonProperties = {
    labelText?: string;
    icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
    onClickAction?: () => void;
    disabled?: boolean;
    additionalClasses?: string;
};

export default function PrimaryButtonComponent({
    labelText = 'Submit',
    icon: Icon, // Rename for JSX use
    onClickAction,
    disabled = false,
    additionalClasses = ''
}: ButtonProperties) {
    return (
        <button type='submit' onClick={onClickAction} className={`btn ${additionalClasses}`} disabled={disabled}>
            {Icon && <Icon className='w-4 h-4 mr-0.5'/>}
            {labelText}
        </button>
    );
}
