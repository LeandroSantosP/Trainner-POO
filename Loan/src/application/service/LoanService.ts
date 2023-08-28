import { LoanFactory } from "@/domain/factory/LoanFactory";
import { LoanRepository } from "../repository/LoanRepository";
import { RepositoryAndQueueFactory } from "../factory/RepositoryAndQueueFactory";
import { InstallmentRepository } from "../repository/InstallmentRepository";
import {
    GetLoanInput,
    GetLoanOutput,
    SimulateLoanInput,
    SubmitLoanInput,
    SimulateLoanOutput,
} from "./LoanServiceTypes";
import { Queue } from "../interfaces/Queue";
import { MailerEvent } from "@/infra/event/MailerEvent";

export class LoanService {
    loanRepository: LoanRepository;
    installmentRepository: InstallmentRepository;
    queue: Queue;
    constructor(repositoryAndQueueFactory: RepositoryAndQueueFactory) {
        this.loanRepository = repositoryAndQueueFactory.loanRepository();
        this.installmentRepository = repositoryAndQueueFactory.installmentRepository();
        this.queue = repositoryAndQueueFactory.queueController();
    }

    async submitLoan(input: SubmitLoanInput): Promise<void> {
        const loan = LoanFactory.createLoan(input);

        await this.loanRepository.save(loan);
        for (const installment of loan.Installments) {
            await this.installmentRepository.save(installment);
        }

        const mailerEvent = new MailerEvent(
            "john.Doe@gmail.com",
            loan.getCode(),
            "Financiamento",
            "Seu financiamento foi aprovado com successor"
        );

        this.queue.publisher("mailerEvent", mailerEvent);
    }

    async simulateLoan(input: SimulateLoanInput): Promise<SimulateLoanOutput> {
        const output: SimulateLoanOutput = {
            installments: [],
        };

        const loan = LoanFactory.createLoan(input);
        loan.Installments.forEach((loanInstalment) => {
            output.installments.push({
                installmentNumber: loanInstalment.installmentNumber,
                amount: loanInstalment.amount,
                interest: loanInstalment.interest,
                amortization: loanInstalment.amortization,
                balance: loanInstalment.balance,
            });
        });

        return output;
    }

    async getLoan(input: GetLoanInput): Promise<GetLoanOutput> {
        const loan = await this.loanRepository.getByCode(input.code);
        const output: GetLoanOutput = {
            installments: [],
            status: loan.getStatus(),
        };

        loan.Installments.forEach((loanInstalment) => {
            output.installments.push({
                installmentNumber: loanInstalment.installmentNumber,
                amount: loanInstalment.amount,
                interest: loanInstalment.interest,
                amortization: loanInstalment.amortization,
                balance: loanInstalment.balance,
            });
        });
        return output;
    }
}
