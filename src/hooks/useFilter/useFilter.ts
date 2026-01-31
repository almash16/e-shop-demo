import { Order } from 'core/types/order'
import { create } from 'zustand'

interface FilterStore {
    filter: string,
    setFilter: (filter : string) => void,
    order: Order
    setOrder: (order : Order) => void,
}

export const useFilterStore = create<FilterStore>((set) => ({
  filter: "",
  order: Order.DEFAULT,
  setFilter: (filter: string) => set({ filter }),
  setOrder: (order: Order) => set({ order }),
}))

