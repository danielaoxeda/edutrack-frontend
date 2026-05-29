import React from "react";

interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input = ({ label, ...props }: InputProps) => {
    return (
        <div>
            <label className="block text-sm mb-1 text-gray-600">
                {label}
            </label>

            <input
                {...props}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none"
            />
        </div>
    );
};

export default Input;