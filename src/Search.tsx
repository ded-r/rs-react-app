import React, { Component } from 'react';

interface SearchProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

interface SearchState {
  searchInput: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { searchInput: props.searchTerm || '' };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchInput: event.target.value });
  };

  handleSubmit = () => {
    this.props.onSearch(this.state.searchInput);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchInput}
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <button onClick={this.handleSubmit}>Search</button>
      </div>
    );
  }
}

export default Search;
