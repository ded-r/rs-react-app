import React, { useState, useEffect } from 'react';

interface SearchProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, onSearch }) => {
  const [searchInput, setSearchInput] = useState(searchTerm || '');

  useEffect(() => {
    setSearchInput(searchTerm);
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = () => {
    if (!searchInput.trim()) return;
    localStorage.setItem('searchTerm', searchInput);
    onSearch(searchInput);
  };

  return (
    <div className="">
      <input
        type="text"
        value={searchInput}
        onChange={handleChange}
        placeholder="Search..."
        className="border border-gray-200 px-2"
      />
      <button
        onClick={handleSubmit}
        className="border border-gray-200 px-2 cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
