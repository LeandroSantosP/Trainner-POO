import { MailerGateway } from "@/application/interfaces/MailerGateway";
import { Job } from "../../infra/backgroundJobs/jobs/Job";
import { MessageRepository } from "@/application/repository/MessageRepository";
import { Message } from "@/domain/entity/Message";
import { Queue } from "@/infra/queue/Queue";

export class MailerGatewayJobHandler<Ops> implements Job {
    jobName = "MailerGatewayJob";
    opts?: Ops;

    constructor(
        readonly mailerGateway: MailerGateway,
        readonly messageRepository: MessageRepository,
        readonly queue: Queue
    ) {}

    async handle(data: Input): Promise<void> {
        const message = new Message(data.id, data.from, data.to, data.subject, data.body);

        const output = await this.mailerGateway.send({
            body: message.body,
            from: message.from,
            to: message.to,
            subject: message.subject,
        });

        if (output.status === "sended") {
            await this.messageRepository.save(message);
        } else {
            await this.queue.publisher("MessageFailed", {
                eventName: "MessageFailed",
            });
        }
    }
}

type Input = {
    id: string;
    from: string;
    to: string;
    subject: string;
    body: string;
};
