import { TransactionRepository } from "@/application/repository/TransactionRepository";
import { Transaction } from "@/domain/Transition";

export class TransactionRepositoryMemory implements TransactionRepository {
    transactions: Transaction[];
    constructor() {
        this.transactions = [];
    }
    async persiste(transaction: Transaction): Promise<void> {}
    async get(transactionId: string): Promise<Transaction> {
        const transaction = this.transactions.find((transaction) => transaction.id === transactionId);
        if (!transaction) throw new Error("Transaction not found");
        return transaction;
    }
}
