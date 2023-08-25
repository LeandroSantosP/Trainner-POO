export class TransactionCode {
    private code: string;
    constructor(email: string, sequence: number, transactionDate: Date) {
        const emailStarted = email.split("@");
        const year = transactionDate.getFullYear();
        this.code = `${emailStarted.at(0)}${year}${sequence.toString().padStart(8, "0")}`;
    }

    getCode() {
        return this.code;
    }
}
