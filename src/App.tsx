import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router';
import ErrorBoundary from './ErrorBoundary';
import Search from './Search';
import CardList from './CardList';
import Spinner from './Spinner';
import Pagination from './Pagination';
import DetailedCard from './DetailedCard';
import NotFound from './NotFound';
import './App.css';

const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  return [query, (value: string) => setSearchParams({ query: value })] as const;
};

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useSearchQuery();
  const [results, setResults] = useState<
    { name: string; description?: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    fetchData(searchTerm, page);
  }, [searchTerm, page]);

  const fetchData = async (query: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`
      );
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      const filteredResults = query
        ? data.results.filter((pokemon: { name: string }) =>
            pokemon.name.includes(query.toLowerCase())
          )
        : data.results;
      setResults(filteredResults);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm.trim());
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    navigate(`/?query=${searchTerm}&page=${newPage}`);
  };

  const handleSelectItem = (name: string) => {
    setSelectedItem(name);
    navigate(`/?query=${searchTerm}&page=${page}&details=${name}`);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
    navigate(`/?query=${searchTerm}&page=${page}`);
  };

  return (
    <div className="w-full grid grid-cols-2 min-h-screen">
      <div className="col-span-1 flex flex-col justify-center items-center text-center space-y-5">
        <Search searchTerm={searchTerm} onSearch={handleSearch} />
        {loading && <Spinner />}
        {error && <p className="error">Error: {error}</p>}
        <CardList results={results} onSelect={handleSelectItem} />
        <Pagination currentPage={page} onPageChange={handlePageChange} />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        {selectedItem && (
          <DetailedCard itemName={selectedItem} onClose={handleCloseDetails} />
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
