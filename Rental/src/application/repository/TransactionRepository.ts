import { Transaction } from "@/domain/Transition";

export interface TransactionRepository {
    persiste(transaction: Transaction): Promise<void>;
    get(transactionId: string): Promise<Transaction>;
}
