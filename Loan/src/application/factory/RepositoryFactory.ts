import { InstallmentRepository } from "../repository/InstallmentRepository";
import { LoanRepository } from "../repository/LoanRepository";

export interface RepositoryFactory {
    loanRepository(): LoanRepository;
    installmentRepository(): InstallmentRepository;
}
