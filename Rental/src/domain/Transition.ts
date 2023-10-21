import { randomUUID } from "crypto";

export class Transaction {
    readonly fare: number;
    private constructor(
        readonly id: string,
        readonly document: string,
        readonly method: string,
        private readonly amount: number,
        fare?: number
    ) {
        this.fare = fare ?? 0;
    }

    getTotal() {
        return this.amount + this.fare;
    }

    static create(input: Input) {
        return new Transaction(input.id ?? randomUUID(), input.document, input.method, input.amount, input.fare);
    }
}

type Input = {
    id?: string;
    fare?: number;
    method: string;
    document: string;
    amount: number;
};
