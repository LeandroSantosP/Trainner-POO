import { Tax } from "../entities/Tax";
import { TaxBoleto } from "../entities/TaxBoleto";
import { TaxCreditCard } from "../entities/TaxCreditCard";
import { Transaction } from "../entities/Transaction";

export class TransactionFactory {
    constructor() {}

    static createTransaction(input: Input): Transaction {
        const boleto = new TaxBoleto();
        // add taxes for boleto method here
        boleto.add(0, 10);
        const credit_card = new TaxCreditCard();
        // add taxes for credit_card method here
        const availableTaxes = {
            boleto,
            credit_card,
        } as { [key: string]: Tax };
        if (!availableTaxes[input.paymentMethod]) throw new Error("Invalid transaction type!");
        const tax = availableTaxes[input.paymentMethod];
        return Transaction.create({ ...input, tax });
    }
}

type Input = {
    email: string;
    paymentMethod: string;
    installmentsNumber: number;
    amount: number;
    sequence: number;
    transaction_date?: Date;
};
