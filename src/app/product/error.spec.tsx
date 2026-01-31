import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorPage from "./error";

describe("ErrorPage", () => {
  it('renders the "Product not found" text', () => {
    render(<ErrorPage />);
    const errorText = screen.getByText("Product not found");
    expect(errorText).toBeInTheDocument();
  });
});
