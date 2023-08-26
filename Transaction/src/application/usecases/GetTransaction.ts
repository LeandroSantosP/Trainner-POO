import { ITransactionRepository } from "../repositories/ITransactionRepository";

export class GetTransaction {
    constructor(readonly transactionRepository: ITransactionRepository) {}

    async execute(input: string): Promise<Output> {
        const transaction = await this.transactionRepository.getByCode(input);
        const { amount, balance } = transaction.getBalances();
        const output: Output = {
            status: transaction.getStatus(),
            installmentsNumber: transaction.installmentsNumber,
            paymentMethod: transaction.paymentMethod,
            amount,
            balance,
        };
        return output;
    }
}

type Output = {
    status: string;
    installmentsNumber: number;
    amount: number;
    paymentMethod: string;
    balance: number;
};
