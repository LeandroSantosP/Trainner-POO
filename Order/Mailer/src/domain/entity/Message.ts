import { randomUUID } from "crypto";

export class Message {
    constructor(
        public from: string,
        public to: string,
        public subject: string,
        public body: string,
        private id?: string
    ) {
        if (!id) {
            this.id = randomUUID();
        }
    }

    getId() {
        return this.id;
    }
}
