import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store';
import { toggleItemSelection } from '../../src/redux/slices/selectedItemsSlice';
import useSearchQuery from '../../src/hooks/useSearchQuery';
import ErrorBoundary from '../../src/components/ErrorBoundary';
import Search from '../../src/components/Search';
import CardList from '../../src/components/CardList';
import Spinner from '../../src/components/Spinner';
import Pagination from '../../src/components/Pagination';
import DetailedCard from '../../src/components/DetailedCard';
import ThemeToggle from '../../src/components/ThemeToggle';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  count: number;
  results: Pokemon[];
}

interface HomePageProps {
  initialData: PokemonResponse;
  initialPage: number;
  initialSearchTerm: string;
}

const HomePage = ({
  initialData,
  initialPage,
  initialSearchTerm,
}: HomePageProps) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(initialPage);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useSearchQuery(initialSearchTerm);

  const data = initialData;
  const isLoading = false;
  const error = null;
  const results = data?.results || [];

  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  useEffect(() => {
    const url = `/?query=${searchTerm}&page=${page}${selectedItem ? `&details=${selectedItem}` : ''}`;
    window.history.pushState({}, '', url);
  }, [searchTerm, page, selectedItem]);

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm.trim());
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSelectItem = (name: string) => {
    setSelectedItem(name);
  };

  const handleToggleSelect = (name: string, url: string) => {
    dispatch(toggleItemSelection({ name, url }));
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  return (
    <ErrorBoundary>
      <div className="w-full grid grid-cols-2 min-h-screen bg-white dark:bg-gray-800 transition-colors duration-300">
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

export async function getServerSideProps({
  query,
}: {
  query: { page?: string; query?: string };
}) {
  const page = parseInt(query.page || '1', 10);
  const searchTerm = query.query || '';
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 10}&limit=10`
  );
  const initialData: PokemonResponse = await res.json();
  return {
    props: {
      initialData,
      initialPage: page,
      initialSearchTerm: searchTerm,
    },
  };
}

export default HomePage;
