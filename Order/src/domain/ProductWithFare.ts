import { Product } from "./Product";
import { ProductFare } from "./ProductFare";

export class ProductWithFare extends Product implements ProductFare {
    private fare = 2;
    private MIN_FARE = 10;
    calculateFare(farePercentage?: number): number {
        let fare = this.MIN_FARE;
        if (!farePercentage) {
            fare = (this.fare * this.price) / 100;
        } else {
            fare = (farePercentage * this.price) / 100;
        }
        return fare < 10 ? this.MIN_FARE : fare;
    }
}
