import { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Search from './Search';
import CardList from './CardList';
import Spinner from './Spinner';
import './App.css';
import './Spinner.css';

interface AppState {
  searchTerm: string;
  results: { name: string; description?: string }[];
  loading: boolean;
  error: string | null;
  forceError: boolean;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      results: [],
      loading: false,
      error: null,
      forceError: false,
    };
  }

  componentDidMount() {
    this.fetchData(this.state.searchTerm);
  }

  fetchData = async (query: string) => {
    this.setState({ loading: true, error: null, forceError: false });

    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
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

      this.setState({ results: filteredResults, loading: false });
    } catch (error) {
      this.setState({ error: (error as Error).message, loading: false });
    }
  };

  handleSearch = (searchTerm: string) => {
    const trimmedSearch = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedSearch);
    this.setState({ searchTerm: trimmedSearch, forceError: false });
    this.fetchData(trimmedSearch);
  };

  forceError = () => {
    this.setState({
      forceError: true,
      error: 'Manually triggered error',
      results: [],
    });
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="container">
          <Search
            searchTerm={this.state.searchTerm}
            onSearch={this.handleSearch}
          />
          {this.state.loading && <Spinner />}
          {this.state.error && (
            <p className="error">Error: {this.state.error}</p>
          )}
          {!this.state.forceError && <CardList results={this.state.results} />}
          <button onClick={this.forceError} className="error-button">
            Trigger Error
          </button>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
