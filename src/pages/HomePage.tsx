import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useGetPokemonsQuery } from '../redux/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleItemSelection } from '../redux/slices/selectedItemsSlice';
import useSearchQuery from '../hooks/useSearchQuery';
import ErrorBoundary from '../components/ErrorBoundary';
import Search from '../components/Search';
import CardList from '../components/CardList';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import DetailedCard from '../components/DetailedCard';
import ThemeToggle from '../components/ThemeToggle';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Use the search query hook
  const [searchTerm, setSearchTerm] = useSearchQuery();

  // Fetch Pokémon data
  const { data, error, isLoading } = useGetPokemonsQuery({ page, searchTerm });
  const results = data?.results || [];

  // Get selected items from Redux store
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  // Handle search with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        navigate(`/?query=${searchTerm}&page=${page}`);
      } else {
        navigate(`/?page=${page}`);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, page, navigate]);

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm.trim());
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSelectItem = (name: string) => {
    setSelectedItem(name);
    navigate(`/?query=${searchTerm}&page=${page}&details=${name}`);
  };

  const handleToggleSelect = (name: string, url: string) => {
    dispatch(toggleItemSelection({ name, url }));
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
    navigate(`/?query=${searchTerm}&page=${page}`);
  };

  return (
    <ErrorBoundary>
      <div
        className={`w-full grid grid-cols-2 min-h-screen bg-white dark:bg-gray-800 transition-colors duration-300`}
      >
        <div className="col-span-1 flex flex-col justify-center items-center text-center space-y-5 p-4">
          <div className="w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <ThemeToggle />
              <Search searchTerm={searchTerm} onSearch={handleSearch} />
            </div>

            {isLoading && <Spinner />}
            {error && (
              <p className="text-red-500 dark:text-red-400">
                Error fetching data
              </p>
            )}

            <CardList
              results={results}
              onSelect={handleSelectItem}
              onToggle={handleToggleSelect}
              selectedItems={selectedItems}
            />

            <Pagination
              currentPage={page}
              totalPages={data?.count ? Math.ceil(data.count / 10) : 0}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        <div className="col-span-1 flex justify-center items-center p-4 bg-gray-50 dark:bg-gray-700">
          {selectedItem ? (
            <DetailedCard
              itemName={selectedItem}
              onClose={handleCloseDetails}
            />
          ) : (
            <div className="text-gray-500 dark:text-gray-400">
              Select a Pokémon to view details
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default HomePage;
