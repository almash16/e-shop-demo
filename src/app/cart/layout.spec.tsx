import React from "react";
import { render, screen } from "@testing-library/react";
import CartLayout from "./layout";

test("CartLayout renders children wrapped", () => {
  render(
    <CartLayout>
      <div data-testid="child">Child Component</div>
    </CartLayout>
  );

  // Check if the child component is eventually rendered
  const childElement = screen.getByTestId("child");
  expect(childElement).toBeInTheDocument();
});
