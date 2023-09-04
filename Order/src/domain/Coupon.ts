export class Coupon {
    constructor(private code: string, private percentage: number) {}

    getDiscount(value: number) {
        const parserPercentage = this.percentage / 100;
        const discount = value * parserPercentage;
        return discount;
    }

    getCode() {
        return this.code;
    }
}
