import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import DetailedCard from "../DetailedCard";

test("displays a loading indicator while fetching data", () => {
  render(
    <MemoryRouter>
      <DetailedCard itemName="pikachu" onClose={() => {}} />
    </MemoryRouter>
  );
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("closes when close button is clicked", () => {
  const handleClose = vi.fn();
  render(
    <MemoryRouter>
      <DetailedCard itemName="pikachu" onClose={handleClose} />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText("Close"));
  expect(handleClose).toHaveBeenCalled();
});
