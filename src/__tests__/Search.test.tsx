import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../Search";
import { vi } from "vitest";

beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  vi.spyOn(localStorage.__proto__, "setItem"); 
  vi.spyOn(localStorage.__proto__, "getItem");
});

test("saves search term to local storage", () => {
  const handleSearch = vi.fn();
  render(<Search onSearch={handleSearch} />);

  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Pikachu" } });
  fireEvent.click(screen.getByText("Search"));

  expect(handleSearch).toHaveBeenCalledWith("Pikachu");
  expect(localStorage.setItem).toHaveBeenCalledWith("searchTerm", "Pikachu");
  expect(localStorage.getItem("searchTerm")).toBe("Pikachu");
});

test("ensures localStorage.setItem is called", () => {
  const handleSearch = vi.fn();
  render(<Search onSearch={handleSearch} />);

  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Pikachu" } });
  fireEvent.click(screen.getByText("Search"));

  expect(localStorage.setItem).toHaveBeenCalledWith("searchTerm", "Pikachu");
});
