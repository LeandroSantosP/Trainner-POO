import { MailerMessage } from "@/domain/entities/Message";

export interface MailerRepository {
    save(message: MailerMessage): Promise<void>;
    get(messageId: string): Promise<MailerMessage>;
}
