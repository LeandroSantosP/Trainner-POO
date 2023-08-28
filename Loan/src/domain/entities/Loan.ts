import { Installment } from "./Installment";

export abstract class Loan {
    Installments: Set<Installment>;
    protected loanAmount: number;
    protected status: string;

    constructor(
        private readonly code: string,
        private readonly purchaseTotalPrice: number,
        private readonly downPayment: number,
        private readonly salary: number,
        protected readonly period: number,
        readonly tableType: string
    ) {
        this.loanAmount = this.purchaseTotalPrice - this.downPayment;
        if (salary * 0.25 < this.loanAmount / period) {
            throw new Error("Insufficient salary");
        }
        this.status = "received";
        this.Installments = this.generateInstallments();
    }

    getCode() {
        return this.code;
    }

    getStatus() {
        return this.status;
    }

    protected abstract generateInstallments(): Set<Installment>;
}

export type LoanCreateInput = {
    code?: string;
    purchaseTotalPrice: number;
    downPayment: number;
    salary: number;
    period: number;
    tableType: string;
};
