import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 border rounded-md hover:bg-gray-200"
      >
        Previous
      </button>
      <span className="font-bold"> Page {currentPage} </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 border rounded-md hover:bg-gray-200"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
