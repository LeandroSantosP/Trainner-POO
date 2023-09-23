export class Message {
    constructor(
        private id: string,
        public from: string,
        public to: string,
        public subject: string,
        public body: string
    ) {}

    getId() {
        return this.id;
    }
}
