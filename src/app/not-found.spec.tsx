import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./not-found";

test('Page component renders "Page not found" message', () => {
  render(<Page />);
  const notFoundMessage = screen.getByText("Page not found :(");
  expect(notFoundMessage).toBeInTheDocument();
});
