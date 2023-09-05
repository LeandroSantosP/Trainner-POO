import { randomUUID } from "crypto";
import { Product } from "./Product";
import { Coupon } from "./Coupon";
import { ProductWithFare } from "./ProductWithFare";

export class Order {
    readonly id: string;
    private totalOrderPrice: number;
    readonly products: Product[];
    private status: string;
    private coupons: Coupon[];

    constructor(readonly document: string, readonly date: Date, id?: string) {
        this.id = id ?? randomUUID();
        this.products = [];
        this.coupons = [];
        this.totalOrderPrice = 0;
        this.status = "open";
    }

    addCoupon(couponCode: string, percentage: number) {
        const coupon = new Coupon(couponCode, percentage);
        if (this.coupons.some((coupon) => coupon.getCode() === couponCode)) throw new Error("Coupon already Applied");
        this.coupons.push(coupon);
    }

    addProduct(
        productName: string,
        quantity: number,
        price: number,
        description?: string,
        hasFare?: boolean,
        fare?: number
    ) {
        let product = new Product(productName, quantity, price, description);
        if (hasFare && !fare) throw new Error("Product with must has fare provide");
        if (hasFare && fare) {
            product = new ProductWithFare(productName, quantity, price, description, fare);
        }
        this.products.push(product);
    }

    private calculatePrice() {
        let totalPrice = 0;

        for (const product of this.products) {
            if (product instanceof ProductWithFare) {
                const fare = product.calculateFare();
                totalPrice += fare;
            }
            totalPrice += product.getSubtotal();
        }

        this.totalOrderPrice = totalPrice;
    }

    private calculateDiscount() {
        let discount = 0;

        for (const coupon of this.coupons) {
            discount += coupon.getDiscount(this.totalOrderPrice);
        }
        this.totalOrderPrice -= discount;
    }

    getPrice() {
        this.calculatePrice();
        this.calculateDiscount();

        return this.totalOrderPrice;
    }

    getStatus() {
        return this.status;
    }
}
