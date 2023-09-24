import { AppError } from "./AppError";
import { Email } from "./Email";

export class Message {
    from: Email;
    to: Email;
    constructor(from: string, to: string, public subject: string, public body: string, private id: string) {
        this.from = new Email(from);
        this.to = new Email(to);
        if (body.length < 30) {
            throw new AppError("Message body is too short must be greater than 30 caractere");
        }
    }

    getId() {
        return this.id;
    }
}
