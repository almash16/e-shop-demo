import products from "../../mocks/products.json";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";

jest.mock("next/navigation");

describe("Page", () => {
  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve(products[0]),
      } as any);
  });
  it("should fetch and render a product", async () => {
    const page = await Page({ searchParams: { id: "1" } });
    const { asFragment } = render(page);

    expect(asFragment()).toMatchSnapshot();
    const productTitle = screen.getByText(products[0].title);
    expect(productTitle).toBeInTheDocument();
  });
});
