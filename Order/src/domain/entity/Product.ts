import { randomUUID } from "crypto";
import { Dimensions } from "./Dimensions";

export class Product {
    private constructor(
        readonly id: string,
        readonly name: string,
        readonly price: number,
        readonly description: string,
        readonly dimensions: Dimensions,
        readonly fare?: number
    ) {}

    static create(input: ProductInput) {
        const { id, name, price, description, width, height, length, fare, weight } = input;
        const dimensions = new Dimensions(width, height, length, weight);
        return new Product(id ?? randomUUID(), name, price, description, dimensions, fare);
    }

    getPrice() {
        return this.price;
    }
}

type ProductInput = {
    id?: string;
    price: number;
    fare?: number;
    name: string;
    description: string;
    width: number;
    height: number;
    length: number;
    weight: number;
};
