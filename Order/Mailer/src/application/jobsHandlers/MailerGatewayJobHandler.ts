import { MailerGateway } from "@/application/interfaces/MailerGateway";
import { Job } from "../interfaces/Job";
import { MessageRepository } from "@/application/repository/MessageRepository";
import { Message } from "@/domain/entity/Message";
import { Queue } from "@/infra/queue/Queue";
import { MessageBuilder } from "@/domain/builder/MessageBuilder";

export class MailerGatewayJobHandler<Ops> implements Job {
    jobName = "MailerGatewayJob";
    opts?: Ops;

    constructor(
        readonly mailerGateway: MailerGateway,
        readonly messageRepository: MessageRepository,
        readonly queue: Queue
    ) {}

    async handle(data: Input): Promise<void> {
        const message = new MessageBuilder()
            .addId(data.id)
            .addBody(data.body)
            .addFrom(data.from)
            .addSubject(data.subject)
            .addTo(data.to)
            .build();

        const output = await this.mailerGateway.send({
            body: message.body,
            from: message.from.getValue(),
            to: message.to.getValue(),
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
