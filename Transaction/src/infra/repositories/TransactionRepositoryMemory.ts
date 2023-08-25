import { ITransactionRepository } from "@/application/repositories/ITransactionRepository";
import { Transaction } from "@/domain/entities/Transaction";

export class transactionRepositoryMemory implements ITransactionRepository {
    transactions: Transaction[] = [];
    constructor() {}
    async save(transaction: Transaction): Promise<void> {
        this.transactions.push(transaction);
    }
    async getByCode(transactionCode: string): Promise<Transaction> {
        const transaction = this.transactions.find((transition) => transition.code.getCode() === transactionCode);
        if (!transaction) throw new Error("Transaction not found");
        return transaction;
    }
    async getSequence(): Promise<number> {
        return this.transactions.length + 1;
    }
}
