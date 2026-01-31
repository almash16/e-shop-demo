import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "./layout";

describe("Layout", () => {
  it("renders the layout with children", () => {
    render(
      <Layout>
        <div data-testid="test-child">Test Child</div>
      </Layout>
    );

    const childElement = screen.getByTestId("test-child");
    const backLink = screen.getByRole("link", { name: "back to home page" });

    expect(childElement).toBeInTheDocument();
    expect(backLink).toBeInTheDocument();
  });
});
