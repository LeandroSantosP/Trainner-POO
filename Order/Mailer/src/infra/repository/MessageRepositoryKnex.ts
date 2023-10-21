import { MessageRepository } from "@/application/repository/MessageRepository";
import { Message } from "@/domain/entity/Message";
import knexConnection from "../database/knexfile";
import { Knex } from "knex";
import { MessageBuilder } from "@/domain/builder/MessageBuilder";

export class MessageRepositoryKnex implements MessageRepository {
    app: Knex;
    constructor() {
        this.app = knexConnection;
    }
    async save(message: Message): Promise<void> {
        await this.app("message").insert({
            id: message.getId(),
            from: message.from.getValue(),
            to: message.to.getValue(),
            subject: message.subject,
            body: message.body,
        });
    }

    async listByToEmail(email: string): Promise<Message[]> {
        const messagesData = await this.app("message").select("*").where({ to: email });
        const messages: Message[] = [];

        for (const messageData of messagesData) {
            const message = new MessageBuilder()
                .addId(messageData.id)
                .addFrom(messageData.from)
                .addTo(messageData.to)
                .addSubject(messageData.subject)
                .addBody(messageData.body)
                .build();
            messages.push(message);
        }

        return messages;
    }

    async getById(id: string): Promise<Message> {
        const [messageData] = await this.app("message").where({ id });
        const message = new MessageBuilder()
            .addId(messageData.id)
            .addFrom(messageData.from)
            .addTo(messageData.to)
            .addSubject(messageData.subject)
            .addBody(messageData.body)
            .build();
        return message;
    }
}
