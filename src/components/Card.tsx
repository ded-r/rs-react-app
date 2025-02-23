// components/Card.tsx
import React from 'react';

interface CardProps {
  name: string;
  url: string;
  onClick: () => void;
  isSelected: boolean;
  onToggle: () => void;
}

const Card: React.FC<CardProps> = ({ name, url, onClick, isSelected, onToggle }) => {
  return (
    <div className="border p-4 rounded-md flex items-center space-x-4 dark:border-gray-600">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-500"
      />
      <div onClick={onClick} className="flex-1 cursor-pointer">
        <h3 className="text-lg font-semibold dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{url}</p>
      </div>
    </div>
  );
};

export default Card;