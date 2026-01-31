import { FakeAPIProduct } from "core/types/product";
import { useFilterStore } from "../useFilter/useFilter";
import { getComparator } from "core/utils/getComparator";
import {useDeferredValue} from "react"

export const useProducts = (products: FakeAPIProduct[]) => {
    const { filter, order } = useFilterStore();
    const filterDeferred = useDeferredValue(filter);
    return products.filter((product) =>
    product.title.toLowerCase().includes(filterDeferred.toLowerCase())
    ).sort((a, b) => getComparator(order)(a,b));
}