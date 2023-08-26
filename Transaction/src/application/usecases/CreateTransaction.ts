import { TransactionFactory } from "@/domain/factories/TransactionFactory";
import { ITransactionRepository } from "../repositories/ITransactionRepository";

export class CreateTransaction {
    constructor(readonly transactionRepository: ITransactionRepository) {}
    async execute(input: Input): Promise<void> {
        const sequence = await this.transactionRepository.getSequence();
        const transaction = TransactionFactory.createTransaction({ ...input, sequence });
        // request for payment gateway
        await this.transactionRepository.save(transaction);
    }
}

type Input = {
    email: string;
    paymentMethod: string;
    amount: number;
    installmentsNumber: number;
    transaction_date?: Date;
};
