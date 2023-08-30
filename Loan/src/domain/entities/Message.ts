import { randomUUID } from "crypto";

export class MailerMessage {
    private message_id: string;

    private status?: string;

    constructor(
        readonly from: string,
        readonly to: string,
        readonly subject: string,
        readonly message: string,
        message_id?: string
    ) {
        this.message_id = message_id ?? randomUUID();
    }

    getMessageId() {
        return this.message_id;
    }

    getStatus() {
        return this.status;
    }
    sended() {
        this.status = "sended";
    }
    reject() {
        this.status = "reject";
    }
}
