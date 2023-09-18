import { Message } from "@/domain/entity/Message";

export interface MessageRepository {
    save(mailer: Message): Promise<void>;
    getById(id: string): Promise<Message>;
}
