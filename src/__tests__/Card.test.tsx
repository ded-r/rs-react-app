import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Card from "../Card";

test("renders the relevant card data", () => {
  render(<Card name="Pikachu" description="Electric Pokémon" onClick={() => {}} />);
  expect(screen.getByText("Pikachu")).toBeInTheDocument();
  expect(screen.getByText("Electric Pokémon")).toBeInTheDocument();
});

test("clicking on a card triggers the onClick function", () => {
  const handleClick = vi.fn();
  render(<Card name="Pikachu" description="Electric Pokémon" onClick={handleClick} />);
  fireEvent.click(screen.getByTestId("card"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
