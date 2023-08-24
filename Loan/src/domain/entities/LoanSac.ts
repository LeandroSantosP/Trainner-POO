import { randomUUID } from "crypto";
import { Loan, LoanCreateInput } from "./Loan";
import { Installment } from "./Installment";
import currency from "currency.js";

export class LoanSac extends Loan {
    protected generateInstallments(): Installment[] {
        const loanRate = 1;
        let rate = loanRate / 100;
        let balance = currency(this.loanAmount);
        let installmentNumber = 1;

        let installments: Installment[] = [];

        let amortization = currency(balance.value / this.period);
        while (balance.value > 0) {
            let saldoInicial = currency(balance.value);
            let interest = currency(saldoInicial.value * rate);
            let updatedBalance = currency(saldoInicial.value + interest.value);
            let amount = currency(interest.value + amortization.value);
            balance = currency(updatedBalance.value - amount.value);
            if (balance.value <= 0.05) balance = currency(0);
            const instalment = new Installment(
                installmentNumber,
                amount.value,
                interest.value,
                amortization.value,
                balance.value
            );
            installments.push(instalment);
            installmentNumber++;
        }
        return installments;
    }

    static create(input: LoanCreateInput) {
        return new LoanSac(
            input.code ?? randomUUID(),
            input.purchaseTotalPrice,
            input.downPayment,
            input.salary,
            input.period
        );
    }
}
