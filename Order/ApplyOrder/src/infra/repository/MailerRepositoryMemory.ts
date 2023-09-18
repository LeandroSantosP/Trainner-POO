import { MessageRepository } from "@/application/repository/MessageRepository";
import { AppError } from "@/domain/entity/AppError";
import { Message } from "@/domain/entity/Message";

export class MessageRepositoryMemory implements MessageRepository {
    messages: Message[] = [];
    static instance: MessageRepositoryMemory;

    static getInstance() {
        if (!MessageRepositoryMemory.instance) {
            MessageRepositoryMemory.instance = new MessageRepositoryMemory();
        }
        return MessageRepositoryMemory.instance;
    }

    async save(mailer: Message): Promise<void> {
        this.messages.push(mailer);
    }
    async getById(id: string): Promise<Message> {
        const message = this.messages.find((message) => message.getId() === id);
        if (!message) throw new AppError("Message not found");
        return message;
    }
}
