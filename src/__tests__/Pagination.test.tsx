import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import Pagination from '../Pagination';

test('updates URL query parameter when page changes', () => {
  const handlePageChange = vi.fn();
  render(
    <MemoryRouter>
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('Next'));
  expect(handlePageChange).toHaveBeenCalledWith(2);
});
