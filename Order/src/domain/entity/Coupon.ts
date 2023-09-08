export class Coupon {
    constructor(private code: string, readonly percentage: number, readonly expire_date = new Date()) {}

    getDiscount(value: number) {
        const parserPercentage = this.percentage / 100;
        const discount = value * parserPercentage;
        return discount;
    }

    isValid(date: Date): boolean {
        const isVAlid = this.expire_date.getTime() > date.getTime();
        return !!isVAlid;
    }

    getCode() {
        return this.code;
    }
}
