import { Transaction } from "@/domain/entities/Transaction";

export interface ITransactionRepository {
    save(transaction: Transaction): Promise<void>;
    getByCode(transactionCode: string): Promise<Transaction>;
    getSequence(): Promise<number>;
}
