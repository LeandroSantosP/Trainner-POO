import { LoanFactory } from "@/domain/factory/LoanFactory";
import { LoanRepository } from "../repository/LoanRepository";
import { RepositoryFactory } from "../factory/RepositoryFactory";
import { InstallmentRepository } from "../repository/InstallmentRepository";
import {
    GetLoanInput,
    GetLoanOutput,
    SimulateLoanInput,
    SubmitLoanInput,
    SimulateLoanOutput,
} from "./LoanServiceTypes";

export class LoanService {
    loanRepository: LoanRepository;
    installmentRepository: InstallmentRepository;
    constructor(repositoryFactory: RepositoryFactory) {
        this.loanRepository = repositoryFactory.loanRepository();
        this.installmentRepository = repositoryFactory.installmentRepository();
    }

    async submitLoan(input: SubmitLoanInput): Promise<void> {
        const loan = LoanFactory.createLoan(input);

        await this.loanRepository.save(loan);
        for (const installment of loan.Installments) {
            await this.installmentRepository.save(installment);
        }

        // LoanSubmitted
    }

    async simulateLoan(input: SimulateLoanInput): Promise<SimulateLoanOutput> {
        const output: SimulateLoanOutput = {
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

    async getLoan(input: GetLoanInput): Promise<GetLoanOutput> {
        const loan = await this.loanRepository.getByCode(input.code);
        const output: GetLoanOutput = {
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
