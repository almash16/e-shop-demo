import { FakeAPIRating } from "./rating";


export interface FakeAPIProduct {    
        id: number,
        title: string,
        price: number,
        description: string,
        category: string,
        image: string,
        rating: FakeAPIRating,
}