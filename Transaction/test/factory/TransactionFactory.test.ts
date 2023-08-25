import { Transaction } from "@/domain/entities/Transaction";
import { TransactionFactory } from "@/domain/factories/TransactionFactory";

test("Deve ser possivel craiar um transaction a partir de um a factory", function () {
    const transactionInput = {
        email: "jonhDoe@gmail.com",
        amount: 1000,
        installmentsNumber: 2,
        paymentMethod: "credit_card",
        sequence: 1,
    };
    const transactionFactory = TransactionFactory.createTransaction(transactionInput);

    expect(transactionFactory).toBeInstanceOf(Transaction);
});
