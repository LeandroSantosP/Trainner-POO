import { LoanFactory } from "@/domain/factory/LoanFactory";
import { LoanRepository } from "../repository/LoanRepository";
import { InstallmentRepository } from "../repository/InstallmentRepository";
export class SubmitLoan {
    constructor(
        private readonly loanRepository: LoanRepository,
        private readonly installmentRepository: InstallmentRepository
    ) {}
    async execute(input: Input): Promise<void> {
        const loan = LoanFactory.createLoan(input);

        await this.loanRepository.save(loan);
        for (const installment of loan.Installments) {
            await this.installmentRepository.save(installment);
        }

        // LoanSubmitted
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
