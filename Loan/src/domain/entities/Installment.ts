import { randomUUID } from "crypto";

export class Installment {
    id: string;
    constructor(
        readonly installmentNumber: number,
        readonly amount: number,
        readonly interest: number,
        readonly amortization: number,
        readonly balance: number,
        id?: string
    ) {
        this.id = id ?? randomUUID();
    }
}
