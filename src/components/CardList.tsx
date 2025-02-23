// components/CardList.tsx
import React from 'react';
import Card from './Card';

interface CardListProps {
  results: { name: string; url: string }[];
  onSelect: (name: string) => void;
  onToggle: (name: string, url: string) => void;
  selectedItems: Array<{ name: string; url: string }>;
}

const CardList: React.FC<CardListProps> = ({ results, onSelect, onToggle, selectedItems }) => {
  return (
    <div className="space-y-4">
      {results.length > 0 ? (
        results.map((item) => (
          <Card
            key={item.name}
            name={item.name}
            url={item.url}
            onClick={() => onSelect(item.name)}
            isSelected={selectedItems.some(selected => selected.name === item.name)}
            onToggle={() => onToggle(item.name, item.url)}
          />
        ))
      ) : (
        <p className="text-gray-500">No results found</p>
      )}
    </div>
  );
};

export default CardList;