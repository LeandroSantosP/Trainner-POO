import { randomUUID } from "crypto";
import { Loan, LoanCreateInput } from "./Loan";
import { Installment } from "./Installment";
import currency from "currency.js";

export class LoanPrice extends Loan {
    protected generateInstallments(): Set<Installment> {
        const loanRate = 1;
        let rate = loanRate / 100;
        let balance = currency(this.loanAmount);
        let installmentNumber = 1;

        let installments: Set<any> = new Set();

        let formula = Math.pow(1 + rate, this.period);
        let amount = balance.multiply((formula * rate) / (formula - 1));
        while (balance.value > 0) {
            let interest = balance.multiply(rate);
            let amortization = amount.subtract(interest);
            balance = balance.subtract(amortization);
            if (balance.value <= 0.05) balance = currency(0);

            const instalment = new Installment(
                installmentNumber,
                amount.value,
                interest.value,
                amortization.value,
                balance.value
            );

            installments.add(instalment);
            installmentNumber++;
        }
        this.status = "approved";
        return installments;
    }

    static create(input: LoanCreateInput) {
        return new LoanPrice(
            input.code ?? randomUUID(),
            input.purchaseTotalPrice,
            input.downPayment,
            input.salary,
            input.period,
            input.tableType
        );
    }
}
