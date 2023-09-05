import { randomUUID } from "crypto";
import { Product } from "./Product";
import { Coupon } from "./Coupon";
import { ProductWithFare } from "./ProductWithFare";

export class Order {
    readonly id: string;
    private totalOrderPrice: number;
    readonly products: Product[];
    private taxas: number;
    private status: string;
    private coupons: Coupon[];
    private discount: number;

    constructor(readonly document: string, readonly date: Date, id?: string) {
        this.id = id ?? randomUUID();
        this.products = [];
        this.coupons = [];
        this.totalOrderPrice = 0;
        this.taxas = 0;
        this.discount = 0;
        this.status = "open";
    }

    addCoupon(couponCode: string, percentage: number) {
        const coupon = new Coupon(couponCode, percentage);
        if (this.coupons.some((coupon) => coupon.getCode() === couponCode)) throw new Error("Coupon already Applied");
        this.coupons.push(coupon);
    }

    addItem(
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
            totalPrice += product.getSubtotal();
        }
        this.totalOrderPrice = totalPrice;
        return totalPrice;
    }

    getTaxes() {
        let taxas = 0;
        for (const product of this.products) {
            if (product instanceof ProductWithFare) {
                taxas += product.calculateFare();
            }
        }
        this.taxas = taxas;
        return taxas;
    }

    private calculateDiscount(subTotal: number): number {
        let discount = 0;
        for (const coupon of this.coupons) {
            discount += coupon.getDiscount(subTotal);
        }
        this.discount = discount;
        return discount;
    }

    getTotalPrice() {
        const subTotal = this.calculatePrice() + this.getTaxes();
        const discount = this.calculateDiscount(subTotal);

        return subTotal - discount;
    }

    changeStatus(newStatus: string) {
        this.status = newStatus;
    }

    getCompleteInfos() {
        const totalPrice = this.getTotalPrice();
        const taxes = this.taxas;

        const discount = this.discount;
        return {
            totalPrice,
            taxes,
            discount,
        };
    }

    getStatus() {
        return this.status;
    }
}
