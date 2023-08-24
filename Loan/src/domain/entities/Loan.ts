import { Installment } from "./Installment";

export abstract class Loan {
    Installments: Installment[];
    protected loanAmount: number;

    constructor(
        private readonly code: string,
        readonly purchaseTotalPrice: number,
        readonly downPayment: number,
        readonly salary: number,
        readonly period: number
    ) {
        this.loanAmount = this.purchaseTotalPrice - this.downPayment;
        if (this.salary * 0.25 < this.loanAmount / this.period) {
            throw new Error("Insufficient salary");
        }
        this.Installments = this.generateInstallments();
    }

    getCode() {
        return this.code;
    }

    protected abstract generateInstallments(): Installment[];
}

export type LoanCreateInput = {
    code?: string;
    purchaseTotalPrice: number;
    downPayment: number;
    salary: number;
    period: number;
};
