import { renderHook, act } from "@testing-library/react";
import { useFilterStore } from "./useFilter";
import { Order } from "core/types/order";

describe("useFilterStore", () => {
  it("should set and get filter", () => {
    const { result } = renderHook(() => useFilterStore());

    act(() => {
      result.current.setFilter("test-filter");
    });

    expect(result.current.filter).toBe("test-filter");
  });

  it("should set and get order", () => {
    const { result } = renderHook(() => useFilterStore());

    act(() => {
      result.current.setOrder(Order.ASC);
    });

    expect(result.current.order).toBe(Order.ASC);
  });
});
