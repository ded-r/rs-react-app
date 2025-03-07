import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import CardList from '../CardList';

test('renders the specified number of cards', () => {
  const mockResults = [{ name: 'Pikachu' }, { name: 'Charmander' }];
  render(
    <MemoryRouter>
      <CardList results={mockResults} onSelect={() => {}} />
    </MemoryRouter>
  );
  expect(screen.getAllByRole('heading')).toHaveLength(mockResults.length);
});

test("displays 'No results found' when results array is empty", async () => {
  render(
    <MemoryRouter>
      <CardList results={[]} onSelect={() => {}} />
    </MemoryRouter>
  );

  expect(await screen.findByText(/No results found/i)).toBeInTheDocument();
});
