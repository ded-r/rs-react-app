import React, { useEffect, useState } from 'react';

interface DetailedCardProps {
  itemName: string;
  onClose: () => void;
}

const DetailedCard: React.FC<DetailedCardProps> = ({ itemName, onClose }) => {
  const [data, setData] = useState<{ name: string; sprite: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        console.log('Fetching details for:', itemName);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${itemName}`
        );
        if (!response.ok) throw new Error('Failed to fetch data');

        const json = await response.json();
        setData({
          name: json.name,
          sprite: json.sprites.front_default,
        });
      } catch (error) {
        console.error('Error fetching details:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [itemName]);

  return (
    <div className="text-center flex flex-col items-center">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : data ? (
        <>
          <h2 className="text-lg font-bold">{data.name}</h2>
          <img
            src={data.sprite}
            alt={data.name}
            className="w-20 h-20 mx-auto"
          />
        </>
      ) : (
        <p className="text-red-500">Failed to load details.</p>
      )}
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
      >
        Close
      </button>
    </div>
  );
};

export default DetailedCard;
