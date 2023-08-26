import { Tax } from "./Tax";
import { TaxBoleto } from "./TaxBoleto";
import { TaxCreditCard } from "./TaxCreditCard";

export class Installment {
    status: string;
    mdr = 0;
    private availableStatus: string[] = ["waiting_payment", "paid"];
    constructor(
        readonly amount: number,
        readonly paymentMethod: string,
        readonly instalmentNumber: number,
        readonly tax: Tax
    ) {
        if (paymentMethod === "boleto" && !(tax instanceof TaxBoleto)) {
            throw new Error("invalid Tax Type!");
        }

        if (paymentMethod === "credit_card" && !(tax instanceof TaxCreditCard)) {
            throw new Error("invalid Tax Type!");
        }

        this.status = "waiting_payment";
        this.calculateTax();
    }

    changeStatus(status: string) {
        if (!this.availableStatus.includes(status)) throw new Error("Status not allowed!");
        this.status = status;
        return this.status;
    }

    private calculateTax() {
        const total = this.tax.taxs.reduce((stt, acc, taxIndex) => {
            if (this.paymentMethod !== acc.name) return stt;
            if (acc.fix) {
                stt += acc.fix;
            }
            if (acc.percentage) {
                stt += this.tax.calculatePercentage(taxIndex, this.amount);
            }
            return stt;
        }, 0);

        this.mdr = total;
    }
}
