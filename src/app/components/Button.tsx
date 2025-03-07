import React, { memo } from 'react'

interface ButtonProps {
    name: string;
    onClick?: () => void;
}

const Button = memo(({ name, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer w-40 m-2"
        >
            {name}
        </button>
    )
})

Button.displayName = 'Button';

export default Button;