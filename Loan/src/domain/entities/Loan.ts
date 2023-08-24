import { Installment } from "./Installment";

export abstract class Loan {
    private Installments: Installment[];

    constructor(
        private readonly code: string,
        readonly purchaseTotalPrice: number,
        readonly downPayment: number,
        readonly salary: number,
        readonly period: number
    ) {
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
