import { RepositoryAndQueueFactory } from "@/application/factory/RepositoryAndQueueFactory";
import { InstallmentRepository } from "@/application/repository/InstallmentRepository";
import { LoanRepository } from "@/application/repository/LoanRepository";
import { LoanRepositoryMemory } from "../repository/LoanRepositoryMemory";
import { InstallmentRepositoryMemory } from "../repository/InstallmentRepositoryMemory";
import { Queue } from "@/application/interfaces/Queue";
import { MediatorQueue } from "../queue/MediatorQueue";
import { Mailer } from "@/application/interfaces/Mailer";
import { MailerGatewayMemory } from "../gateway/MailerGatewayMemory";
import { MailerRepository } from "@/application/repository/MailerRepository";
import { MailerRepositoryMemory } from "../repository/MailerRepositoryMemory";

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
    mailerGateway(): Mailer {
        return new MailerGatewayMemory();
    }
    mailerRepository(): MailerRepository {
        return MailerRepositoryMemory.getInstance();
    }
}
