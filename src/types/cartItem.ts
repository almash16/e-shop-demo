import currency from "currency.js";

export interface CartItems {
    items: {
        id: number,
        quantity: number
    }[],
    total:currency,    
}