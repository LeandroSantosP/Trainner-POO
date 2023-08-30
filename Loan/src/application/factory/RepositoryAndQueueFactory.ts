import { Mailer } from "../interfaces/Mailer";
import { Queue } from "../interfaces/Queue";
import { InstallmentRepository } from "../repository/InstallmentRepository";
import { LoanRepository } from "../repository/LoanRepository";
import { MailerRepository } from "../repository/MailerRepository";

export interface RepositoryAndQueueFactory {
    loanRepository(): LoanRepository;
    installmentRepository(): InstallmentRepository;
    queueController(): Queue;
    mailerGateway(): Mailer;
    mailerRepository(): MailerRepository;
}
