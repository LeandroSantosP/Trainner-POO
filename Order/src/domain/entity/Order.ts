import { randomUUID } from "crypto";
import { OrderLine } from "./OrderLine";
import { Coupon } from "./Coupon";
import { OrderLineWithFare } from "./ProductWithFare";
import { OrderCode } from "./OrderCode";

export class Order {
    readonly id: string;
    private totalOrderPrice: number;
    readonly products: OrderLine[];
    private taxas: number;
    private status: string;
    private coupons: Coupon[];
    private discount: number;
    private freight: number = 0;
    private code: OrderCode;

    constructor(readonly document: string, readonly date: Date, readonly sequence: number = 1, id?: string) {
        this.id = id ?? randomUUID();
        this.code = new OrderCode(date, sequence);
        this.products = [];
        this.coupons = [];
        this.totalOrderPrice = 0;
        this.taxas = 0;
        this.discount = 0;
        this.status = "open";
    }

    static restore(input: RestoreInput): Order {
        const { document, discount, freight, id, price, status, taxes, orderDate, sequence } = input;
        const order = new Order(document, orderDate, sequence, id);
        order.changeStatus(status);
        order.totalOrderPrice = price;
        order.freight = freight;
        order.discount = discount;
        order.taxas = taxes;
        return order;
    }

    addCoupon(couponCode: string, percentage: number, expire_date: Date = new Date()) {
        const coupon = new Coupon(couponCode, percentage, expire_date);
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
        if (this.products.some((product) => product.id === id)) {
            throw new Error("Product already select.");
        }
        this.products.push(product);
    }

    private calculatePrice() {
        let totalPrice = 0;
        for (const product of this.products) {
            totalPrice += product.getTotal();
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
        const total = subTotal - discount;
        this.totalOrderPrice = total;
        return total;
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

    getCode() {
        return this.code.getCode();
    }

    changeStatus(newStatus: string) {
        this.status = newStatus;
    }

    setFreight(freight: number) {
        this.freight = freight;
    }

    getStatus() {
        return this.status;
    }

    getCompleteInfos() {
        const taxes = this.taxas;
        const discount = this.discount;
        const freight = this.freight;
        return {
            totalPrice: this.totalOrderPrice,
            taxes,
            discount,
            freight,
        };
    }
}

type RestoreInput = {
    id: string;
    document: string;
    price: number;
    sequence: number;
    freight: number;
    discount: number;
    taxes: number;
    orderDate: Date;
    status: string;
};

export type AddLineProps = {
    quantity: number;
    price: number;
    hasFare?: boolean;
    fare?: number;
    id?: string;
};
