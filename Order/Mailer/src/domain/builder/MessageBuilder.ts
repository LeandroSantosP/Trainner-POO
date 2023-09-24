import { AppError } from "../entity/AppError";
import { Message } from "../entity/Message";

export class MessageBuilder {
    public from?: string;
    public to?: string;
    public subject?: string;
    public body?: string;
    private id?: string;

    addFrom(from: string) {
        this.from = from;
        return this;
    }
    addTo(to: string) {
        this.to = to;
        return this;
    }
    addSubject(subject: string) {
        this.subject = subject;
        return this;
    }
    addBody(body: string) {
        this.body = body;
        return this;
    }
    addId(id: string) {
        this.id = id;
        return this;
    }
    build() {
        if (!this.from || !this.to || !this.subject || !this.body || !this.id) {
            throw new AppError("Message is incomplete");
        }

        return new Message(this.from, this.to, this.subject, this.body, this.id);
    }
}
