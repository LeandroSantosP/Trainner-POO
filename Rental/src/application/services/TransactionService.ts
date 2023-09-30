import { Transaction } from "@/domain/Transition";
import { TransactionRepository } from "../repository/TransactionRepository";

export class TransactionService {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    async makeTransaction(input: MakeTransaction) {
        const transaction = Transaction.create({
            ...input,
        });
        console.log(transaction);
    }
}

type MakeTransaction = {
    fare?: number;
    method: string;
    document: string;
    amount: number;
};
