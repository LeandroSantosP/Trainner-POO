import { OrderLine } from "./OrderLine";
import { ProductFare } from "./ProductFare";

export class OrderLineWithFare extends OrderLine implements ProductFare {
    private fare: number;
    private MIN_FARE = 10;

    constructor(id: string, quantity: number, price: number, fare: number = 2) {
        super(id, quantity, price);
        this.fare = fare;
    }
    calculateFare(): number {
        let fare = ((this.fare * this.price) / 100) * this.quantity;
        return fare < 10 ? this.MIN_FARE : fare;
    }
}
