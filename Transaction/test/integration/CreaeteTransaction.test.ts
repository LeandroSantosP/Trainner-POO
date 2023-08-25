import { CreateTransaction } from "@/application/usecases/CreateTransaction";
import { GetTransaction } from "@/application/usecases/GetTransaction";
import { transactionRepositoryMemory } from "@/infra/repositories/TransactionRepositoryMemory";

const transactionRepository = new transactionRepositoryMemory();

test("should be able create a new Transaction", async function () {
    const transaction = new CreateTransaction(transactionRepository);
    const input = {
        email: "john.doe@gmail.com",
        amount: 1000,
        paymentMethod: "boleto",
        installmentsNumber: 1,
        transaction_date: new Date("2023-08-12"),
    };
    await transaction.execute(input);

    const getTransaction = new GetTransaction(transactionRepository);
    const output = await getTransaction.execute("john.doe202300000001");
    expect(output.status).toBe("open");
    expect(output.installmentsNumber).toBe(1);
    expect(output.balance).toBe(1100);
    expect(output.amount).toBe(1000);
    expect(output.paymentMethod).toBe("boleto");
});
