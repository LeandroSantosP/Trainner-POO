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

    async save(message: Message): Promise<void> {
        console.log(message);

        this.messages.push(message);
    }

    async listByToEmail(email: string): Promise<Message[]> {
        return this.messages.filter((message) => message.to.getValue() === email);
    }
    async getById(id: string): Promise<Message> {
        const message = this.messages.find((message) => message.getId() === id);
        if (!message) throw new AppError("Message not found");
        return message;
    }
}
