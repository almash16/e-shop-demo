import { getComparator } from './getComparator';
import { Order } from 'core/types/order';

describe('getComparator', () => {
  it('should return a comparator for ascending order', () => {
    const comparator = getComparator(Order.ASC);
    const productA = { price: 10 } as any;
    const productB = { price: 20 } as any;
    expect(comparator(productA, productB)).toBe(-10);
  });

  it('should return a comparator for descending order', () => {
    const comparator = getComparator(Order.DSC);
    const productA = { price: 10 } as any;
    const productB = { price: 20 } as any;
    expect(comparator(productA, productB)).toBe(10);
  });

  it('should return a comparator for rating order', () => {
    const comparator = getComparator(Order.RATING);
    const productA = { rating: { rate: 3 } } as any;
    const productB = { rating: { rate: 4 } } as any;
    expect(comparator(productA, productB)).toBe(1);
  });

  it('should return a default comparator for unknown order', () => {
    const comparator = getComparator('unknown' as any); // Provide an unknown order
    const productA = { id: 1 } as any;
    const productB = { id: 2 } as any;
    expect(comparator(productA, productB)).toBe(-1);
  });
});