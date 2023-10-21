export class Email {
    private value: string;

    constructor(email: string) {
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) throw new Error("Invalid email");
        this.value = email;
    }

    getValue() {
        return this.value;
    }
}
