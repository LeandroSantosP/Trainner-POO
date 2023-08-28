import { MailerEvent } from "@/infra/event/MailerEvent";
import { Handler } from "../interfaces/Handler";
import { RepositoryAndQueueFactory } from "../factory/RepositoryAndQueueFactory";
import { LoanRepository } from "../repository/LoanRepository";
import { MailerMessage } from "@/domain/entities/Message";
import { Mailer } from "../interfaces/Mailer";

export class MailerEventHandler implements Handler {
    eventName = "mailerEvent";
    mailerGetaway: Mailer;
    loanRepository: LoanRepository;
    mailerRepository: any;
    constructor(repositoryAndQueueFactory: RepositoryAndQueueFactory) {
        this.loanRepository = repositoryAndQueueFactory.loanRepository();
        this.mailerGetaway = repositoryAndQueueFactory.mailerGateway();
        this.mailerRepository = repositoryAndQueueFactory.mailerRepository();
    }
    async handle(applicationEvent: MailerEvent): Promise<any> {
        const Message = new MailerMessage(
            applicationEvent.from,
            applicationEvent.to,
            applicationEvent.subject,
            applicationEvent.message
        );

        const mailerResponse = await this.mailerGetaway.sendMailer({
            from: applicationEvent.from,
            to: applicationEvent.to,
            subject: applicationEvent.subject,
            message: applicationEvent.message,
        });

        if (mailerResponse.status === "sended") {
            Message.sended();
        }

        if (mailerResponse.status === "reject") {
            Message.reject();
        }

        await this.mailerRepository.save(Message);
    }
}
