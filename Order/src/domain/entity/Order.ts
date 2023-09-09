import { randomUUID } from "crypto";
import { OrderLine } from "./OrderLine";
import { Coupon } from "./Coupon";
import { OrderLineWithFare } from "./ProductWithFare";

export class Order {
    readonly id: string;
    readonly orderLine: OrderLine[];
    private status: string;
    private coupons: Coupon[];
    private taxas: number = 0;
    private totalOrderPrice: number = 0;
    private discount: number = 0;
    private freight: number = 0;

    constructor(readonly document: string, readonly date: Date, id?: string) {
        this.id = id ?? randomUUID();
        this.orderLine = [];
        this.coupons = [];
        this.status = "open";
    }

    addCoupon(couponCode: string, percentage: number, expire_date: Date = new Date()) {
        const coupon = new Coupon(couponCode, percentage, expire_date);
        if (!coupon.isValid(this.date)) return;
        if (this.coupons.some((coupon) => coupon.getCode() === couponCode)) throw new Error("Coupon already Applied");
        this.coupons.push(coupon);
    }

    addLine(props: AddLineProps) {
        const { price, quantity, fare, hasFare, id } = props;
        const productId = id ?? randomUUID();
        let product = new OrderLine(productId, quantity, price);
        if (hasFare && !fare) throw new Error("Product with must has fare provide");
        if (hasFare && fare) {
            product = new OrderLineWithFare(productId, quantity, price, fare);
        }
        if (this.orderLine.some((product) => product.id === id)) {
            throw new Error("Product already select.");
        }
        this.orderLine.push(product);
    }

    private calculatePrice() {
        let totalPrice = 0;
        for (const product of this.orderLine) {
            totalPrice += product.getTotal();
        }
        this.totalOrderPrice = totalPrice;
        return totalPrice;
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
        const subTotal = this.calculatePrice() + this.getTaxes() + this.freight;
        const discount = this.calculateDiscount(subTotal);
        return subTotal - discount;
    }

    changeStatus(newStatus: string) {
        this.status = newStatus;
    }

    setFreight(freight: number) {
        this.freight = freight;
    }

    getTaxes() {
        let taxas = 0;
        for (const product of this.orderLine) {
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

type AddLineProps = {
    quantity: number;
    price: number;
    hasFare?: boolean;
    fare?: number;
    id?: string;
};
