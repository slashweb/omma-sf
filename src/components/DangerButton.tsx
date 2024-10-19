import React from 'react';

interface DangerButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const DangerButton: React.FC<DangerButtonProps> = ({children, onClick, type = 'button', className = ''}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex w-full justify-center rounded-md px-3 py-3 text-md leading-6 text-red-600 border-2 border-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-red-600 hover:text-white transition-all ${className}`}

            style={{
                borderRadius: '8px',
                paddingTop: '0.4rem',
                paddingBottom: '0.4rem',
                backgroundColor: 'transparent',  // Fondo transparente por defecto
            }}
        >
            {children}
        </button>
    );
};

export default DangerButton;
