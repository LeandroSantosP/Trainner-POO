import { Tax } from "./Tax";

export class TaxCreditCard extends Tax {
    constructor() {
        super("credit_card");
    }

    calculatePercentage(taxIndex: number, amountForCalculate: number): number {
        const currentTax = this.taxs[taxIndex];

        return (currentTax.percentage * amountForCalculate) / 100;
    }
}
