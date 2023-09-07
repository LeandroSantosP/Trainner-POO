import { randomUUID } from "crypto";

class Dimensions {
    constructor(readonly width: number, readonly height: number, readonly length: number, readonly weight: number) {
        Object.values(this).some((value) => {
            if (value < 0) throw new Error("Invalid Dimension");
        });
    }
}

export class Product {
    private constructor(
        readonly id: string,
        readonly name: string,
        private price: number,
        readonly description: string,
        readonly dimensions: Dimensions
    ) {}
    static create(input: ProductInput) {
        const { id, name, price, description, width, height, length, weight } = input;
        const dimensions = new Dimensions(width, height, length, weight);
        return new Product(id ?? randomUUID(), name, price, description, dimensions);
    }

    getPrice() {
        return this.price;
    }
}

type ProductInput = {
    id?: string;
    price: number;
    name: string;
    description: string;
    width: number;
    height: number;
    length: number;
    weight: number;
};
