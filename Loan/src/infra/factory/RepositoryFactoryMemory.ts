import { RepositoryAndQueueFactory } from "@/application/factory/RepositoryAndQueueFactory";
import { InstallmentRepository } from "@/application/repository/InstallmentRepository";
import { LoanRepository } from "@/application/repository/LoanRepository";
import { LoanRepositoryMemory } from "../repository/LoanRepositoryMemory";
import { InstallmentRepositoryMemory } from "../repository/InstallmentRepositoryMemory";
import { Queue } from "@/application/interfaces/Queue";
import { MediatorQueue } from "../queue/MediatorQueue";

export class RepositoryAndQueueFactoryMemory implements RepositoryAndQueueFactory {
    queueController(): Queue {
        return MediatorQueue.getInstance();
    }
    loanRepository(): LoanRepository {
        return new LoanRepositoryMemory();
    }
    installmentRepository(): InstallmentRepository {
        return new InstallmentRepositoryMemory();
    }
}
