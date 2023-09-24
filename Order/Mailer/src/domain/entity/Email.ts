import { AppError } from "./AppError";

export class Email {
    private value: string;
    constructor(email: string) {
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            throw new AppError("Invalid email!");
        }
        this.value = email;
    }

    getValue() {
        return this.value;
    }
}
