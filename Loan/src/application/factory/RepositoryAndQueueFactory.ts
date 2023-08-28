import { Queue } from "../interfaces/Queue";
import { InstallmentRepository } from "../repository/InstallmentRepository";
import { LoanRepository } from "../repository/LoanRepository";

export interface RepositoryAndQueueFactory {
    loanRepository(): LoanRepository;
    installmentRepository(): InstallmentRepository;
    queueController(): Queue;
}
