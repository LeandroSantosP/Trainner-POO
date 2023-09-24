import { JobQueue } from "../interfaces/JobQueue";
import { MessageRepository } from "../repository/MessageRepository";

export class MailerService {
    constructor(readonly jobQueue: JobQueue, readonly messageRepository: MessageRepository) {}

    async send(input: SendInput): Promise<void> {
        if (input.eventName === "OrderApplied") {
            let message = {
                from: "company.name@gmail.com",
                to: input.clientEmail,
                subject: "Pedido",
                body: "Sua comprar foi efetuada com sucesso",
            };
            await this.jobQueue.postOnQueue("MailerGatewayJob", message);
        }
    }

    async getMessagesByEmail(email: string): Promise<GetMessagesByEmailOutput> {
        const messages = await this.messageRepository.listByToEmail(email);
        return messages;
    }
}

type SendInput = {
    clientEmail: string;
    eventName: string;
};

type GetMessagesByEmailOutput = {
    from: string;
    to: string;
    subject: string;
    body: string;
}[];
