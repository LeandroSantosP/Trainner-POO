import { SubmitLoan } from "@/application";

test("Deve ser possível Submeter uma financiamento com a tabela price", async function () {
    const loadRepository = new LoanRepositoryMemory();
    const submitLoan = new SubmitLoan(loadRepository);
    const submitLoanInput = {
        code: "12345",
        purchaseTotalPrice: 540500,
        salary: 230000,
        downPayment: 150000,
        period: 7,
        tableType: "price",
    };
    await submitLoan.execute(submitLoanInput);
    // const getLoan = new GetLoan(loadRepository);
    // const getLoanInput = {
    //     code: "12345",
    // };
    // const output = await getLoan.execute(getLoanInput);
    // expect(output.status).toBe("approved");
    // expect(output.installments.at(0)?.balance).toBe(336365.66);
    // expect(output.installments.at(output.installments.length - 2)?.balance).toBe(57464.73);
    // expect(output.installments.at(output.installments.length - 1)?.balance).toBe(0);
});
