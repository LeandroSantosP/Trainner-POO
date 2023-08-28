import { MailerRepository } from "@/application/repository/MailerRepository";
import { MailerMessage } from "@/domain/entities/Message";

export class MailerRepositoryMemory implements MailerRepository {
    messages: Set<MailerMessage> = new Set();
    async save(message: MailerMessage): Promise<void> {
        this.messages.add(message);
    }
    async get(messageId: string): Promise<MailerMessage> {
        let messages = Array.from(this.messages);
        const message = messages.find((message) => message.getMessageId() === messageId);
        if (!message) throw new Error("Message not found");
        return message;
    }
}
