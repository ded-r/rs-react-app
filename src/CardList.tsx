import { Component } from 'react';

interface CardListProps {
  results: { name: string; description?: string }[];
}

class CardList extends Component<CardListProps> {
  render() {
    const { results } = this.props;
    return (
      <div>
        {results.length > 0 ? (
          results.map((item, index) => (
            <div key={index}>
              <h3>{item.name}</h3>
              <p>{item.description || 'No description available'}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    );
  }
}

export default CardList;
