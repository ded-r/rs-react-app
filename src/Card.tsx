import React from 'react';

interface CardProps {
  name: string;
  description?: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ name, description, onClick }) => (
  <div
    data-testid="card"
    onClick={onClick}
    className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-emerald-500"
  >
    <h3 className="text-lg font-bold">{name}</h3>
    <p className="text-gray-500">{description || 'No description available'}</p>
  </div>
);

export default Card;
