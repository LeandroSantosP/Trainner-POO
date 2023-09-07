import { randomUUID } from "crypto";
import { OrderLine } from "./OrderLine";
import { Coupon } from "./Coupon";
import { OrderLineWithFare } from "./ProductWithFare";

export class Order {
    readonly id: string;
    private totalOrderPrice: number;
    readonly products: OrderLine[];
    private taxas: number;
    private status: string;
    private coupons: Coupon[];
    private discount: number;
    private freight: number = 0;

    constructor(readonly document: string, readonly date: Date, id?: string) {
        this.id = id ?? randomUUID();
        this.products = [];
        this.coupons = [];
        this.totalOrderPrice = 0;
        this.taxas = 0;
        this.discount = 0;
        this.status = "open";
    }

    addCoupon(couponCode: string, percentage: number, expire_date: Date = new Date()) {
        const coupon = new Coupon(couponCode, percentage, expire_date);
        if (this.coupons.some((coupon) => coupon.getCode() === couponCode)) throw new Error("Coupon already Applied");
        this.coupons.push(coupon);
    }
    setFreight(freight: number) {
        this.freight = freight;
    }
    addItem(props: AddItemProps) {
        const { price, productName, quantity, description, fare, hasFare, id } = props;
        const productId = id ?? randomUUID();
        let product = new OrderLine(productId, productName, quantity, price);
        if (hasFare && !fare) throw new Error("Product with must has fare provide");
        if (hasFare && fare) {
            product = new OrderLineWithFare(productId, productName, quantity, price, fare);
        }
        if (this.products.some((product) => product.id === id)) {
            throw new Error("Product already select.");
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

    private calculateDiscount(subTotal: number): number {
        let discount = 0;
        for (const coupon of this.coupons) {
            if (coupon.isValid(this.date)) {
                discount += coupon.getDiscount(subTotal);
            }
        }
        this.discount = discount;
        return discount;
    }

    getTotalPrice() {
        const freight = this.freight;
        const subTotal = this.calculatePrice() + this.getTaxes() + freight;
        const discount = this.calculateDiscount(subTotal);
        return subTotal - discount;
    }

    changeStatus(newStatus: string) {
        this.status = newStatus;
    }
    getTaxes() {
        let taxas = 0;
        for (const product of this.products) {
            if (product instanceof OrderLineWithFare) {
                taxas += product.calculateFare();
            }
        }
        this.taxas = taxas;
        return taxas;
    }

    getCompleteInfos() {
        const totalPrice = this.getTotalPrice();
        const taxes = this.taxas;
        const discount = this.discount;
        const freight = this.freight;
        return {
            totalPrice,
            taxes,
            discount,
            freight,
        };
    }

    getStatus() {
        return this.status;
    }
}

type AddItemProps = {
    productName: string;
    quantity: number;
    price: number;
    description?: string;
    hasFare?: boolean;
    fare?: number;
    id?: string;
};
