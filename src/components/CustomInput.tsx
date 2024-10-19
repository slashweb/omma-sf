import React from 'react';

interface CustomInputProps {
    id: string;
    name: string;
    type: string;
    value: string;
    placeholder: string;
    required?: boolean;
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
                                                     id,
                                                     name,
                                                     type,
                                                     value,
                                                     placeholder,
                                                     required = false,
                                                     disabled = false,
                                                     onChange,
                                                 }) => {
    return (
        <div className="rounded-md shadow-sm">
            <div>
                <input
                    id={id}
                    name={name}
                    type={type}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="block w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    style={{
                        borderRadius: '8px',
                        border: '2px solid rgba(0, 199, 255, 0.50)', // Border azul
                        background: 'rgba(0, 199, 255, 0.05)',       // Fondo azul claro translúcido
                    }}
                />
            </div>
        </div>
    );
};

export default CustomInput;
