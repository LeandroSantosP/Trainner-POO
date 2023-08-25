import { Tax } from "@/domain/entities/Tax";
import { Transaction } from "@/domain/entities/Transaction";

export function MakeMockTransaction({
    installmentsNumber,
    paymentMethod,
    amount = 1000,
    tax,
}: {
    installmentsNumber: number;
    paymentMethod: string;
    amount?: number;
    tax: Tax;
}): { transaction: Transaction } {
    const transactionInput = {
        email: "jonhDoe@gmail.com",
        amount,
        installmentsNumber,
        paymentMethod,
        tax,
    };

    const transaction = Transaction.create(transactionInput);
    return { transaction };
}
