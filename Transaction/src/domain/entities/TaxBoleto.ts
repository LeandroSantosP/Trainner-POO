import { Tax } from "./Tax";

export class TaxBoleto extends Tax {
    constructor() {
        super("boleto");
    }

    calculatePercentage(taxIndex: number, amountForCalculate: number): number {
        const currentTax = this.taxs[taxIndex];

        return (currentTax.percentage * amountForCalculate) / 100;
    }
}
