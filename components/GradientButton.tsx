import React from 'react';

// Definir los tipos de los props (si estás usando TypeScript)
interface GradientButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;  // Permitir que el usuario agregue clases adicionales si lo desea
}

const GradientButton: React.FC<GradientButtonProps> = ({children, onClick, type = 'button', className = ''}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex w-full justify-center rounded-md px-3 py-3 text-md leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  ${className}`}
            style={{
                borderRadius: '8px',
                background: 'linear-gradient(256deg, #00C7FF 3.41%, #FF00A1 108.76%)',
                paddingTop: '0.4rem',
                paddingBottom: '0.4rem',
            }}
        >
            {children}
        </button>
    );
};

export default GradientButton;
