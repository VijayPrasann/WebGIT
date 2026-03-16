import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, icon, className = '', ...props }) => {
    return (
        <button className={`btn-primary ${className}`} {...props}>
            {children}
            {icon && <span className="btn-icon">{icon}</span>}
        </button>
    );
};
