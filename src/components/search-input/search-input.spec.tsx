import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SearchInput } from "./search-input";

const mockSetFilter = jest.fn();
jest.mock("../../hooks/useFilter/useFilter", () => {
  return {
    useFilterStore: () => ({
      setFilter: mockSetFilter,
    }),
  };
});

describe("SearchInput", () => {
  it("calls setFilter with the entered search query", () => {
    const { asFragment } = render(<SearchInput />);

    expect(asFragment()).toMatchSnapshot();
    const inputElement = screen.getByPlaceholderText("Search product");

    fireEvent.change(inputElement, { target: { value: "test-query" } });

    expect(mockSetFilter).toHaveBeenCalledWith("test-query");
  });
});
