import { Product } from "./Product";
import { ProductFare } from "./ProductFare";

export class ProductWithFare extends Product implements ProductFare {
    private fare: number;
    private MIN_FARE = 10;

    constructor(name: string, quantity: number, price: number, description?: string, fare: number = 2) {
        super(name, quantity, price, description);
        this.fare = fare;
    }
    calculateFare(): number {
        let fare = ((this.fare * this.price) / 100) * this.quantity;
        return fare < 10 ? this.MIN_FARE : fare;
    }
}
