import { LoanFactory } from "@/domain/factory/LoanFactory";

export class SimulateLoan {
    constructor() {}
    async execute(input: Input): Promise<Output> {
        const output: Output = {
            installments: [],
        };

        let installments = [];

        const loan = LoanFactory.createLoan(input);
        for (const installment of loan.Installments) {
            installments.push({
                installmentNumber: installment.installmentNumber,
                amount: installment.amount,
                interest: installment.interest,
                amortization: installment.amortization,
                balance: installment.balance,
            });
        }

        output.installments = installments;

        return output;
    }
}

type Input = {
    code: string;
    purchaseTotalPrice: number;
    downPayment: number;
    salary: number;
    period: number;
    tableType: string;
};

type Output = {
    installments: {
        installmentNumber: number;
        amount: number;
        interest: number;
        amortization: number;
        balance: number;
    }[];
};
