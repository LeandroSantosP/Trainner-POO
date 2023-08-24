import { LoanRepository } from "../repository/LoanRepository";

export class GetLoan {
    constructor(readonly loanRepository: LoanRepository) {}
    async execute(input: Input): Promise<Output> {
        const loan = await this.loanRepository.getByCode(input.code);
        const output: Output = {
            installments: [],
            status: loan.getStatus(),
        };
        for (const loanInstalment of loan.Installments) {
            output.installments.push({
                installmentNumber: loanInstalment.installmentNumber,
                amount: loanInstalment.amount,
                interest: loanInstalment.interest,
                amortization: loanInstalment.amortization,
                balance: loanInstalment.balance,
            });
        }
        return output;
    }
}

type Input = {
    code: string;
};

type Output = {
    installments: {
        installmentNumber: number;
        amount: number;
        interest: number;
        amortization: number;
        balance: number;
    }[];
    status: string;
};
