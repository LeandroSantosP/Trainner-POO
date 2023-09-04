import { randomUUID } from "crypto";
import { Product } from "./Product";
import { format } from "path";
import { Coupon } from "./Coupon";

export class Order {
    private id: string;
    private totalOrderPrice: number;
    products: Product[];
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

    addProduct(productName: string, quantity: number, price: number, description?: string) {
        this.products.push(new Product(productName, quantity, price, description));
    }

    private calculatePrice() {
        let totalPrice = 0;

        for (const product of this.products) {
            totalPrice += product.getSubtotal();
        }

        this.totalOrderPrice = totalPrice;
    }

    private calculateCouponsDiscount() {
        let discount = 0;

        for (const coupon of this.coupons) {
            discount += coupon.getDiscount(this.totalOrderPrice);
        }
        this.totalOrderPrice -= discount;
    }

    getPrice() {
        this.calculatePrice();
        this.calculateCouponsDiscount();

        return this.totalOrderPrice;
    }

    getStatus() {
        return this.status;
    }
}
