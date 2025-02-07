import React from 'react';
import Card from './Card';

interface CardListProps {
  results: { name: string; description?: string }[];
  onSelect: (name: string) => void;
}

const CardList: React.FC<CardListProps> = ({ results, onSelect }) => {
  return (
    <div className="space-y-4">
      {results.length > 0 ? (
        results.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            description={item.description}
            onClick={() => onSelect(item.name)}
          />
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default CardList;
