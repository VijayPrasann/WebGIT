import React from 'react';
import './Card.css';

interface CardProps {
    title: string;
    description: string;
}

export const Card: React.FC<CardProps> = ({ title, description }) => {
    return (
        <div className="card">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
        </div>
    );
};
