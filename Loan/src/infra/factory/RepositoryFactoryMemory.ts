import { RepositoryFactory } from "@/application/factory/RepositoryFactory";
import { InstallmentRepository } from "@/application/repository/InstallmentRepository";
import { LoanRepository } from "@/application/repository/LoanRepository";
import { LoanRepositoryMemory } from "../repository/LoanRepositoryMemory";
import { InstallmentRepositoryMemory } from "../repository/InstallmentRepositoryMemory";

export class RepositoryFactoryMemory implements RepositoryFactory {
    loanRepository(): LoanRepository {
        return new LoanRepositoryMemory();
    }
    installmentRepository(): InstallmentRepository {
        return new InstallmentRepositoryMemory();
    }
}
