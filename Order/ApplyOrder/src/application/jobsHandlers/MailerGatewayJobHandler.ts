import { MailerGateway } from "@/application/interfaces/MailerGateway";
import { Job } from "../../infra/backgroundJobs/jobs/Job";
import { MessageRepository } from "@/application/repository/MessageRepository";
import { Message } from "@/domain/entity/Message";

export class MailerGatewayJobHandler implements Job {
    jobName = "MailerGatewayJob";
    opts?: any;

    constructor(readonly mailerGateway: MailerGateway, readonly messageRepository: MessageRepository) {}

    async handle(data: any): Promise<void> {
        const message = new Message(data.id, data.from, data.to, data.subject, data.body);
        const output = await this.mailerGateway.send({
            body: message.body,
            from: message.from,
            to: message.to,
            subject: message.subject,
        });

        if (output.status === "sended") {
            await this.messageRepository.save(message);
        }
    }
}
