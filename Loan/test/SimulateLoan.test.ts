import { SimulateLoan } from "@/application/SimulateLoan";

test("deve ser possível simular um emprestimo com a tabela price", async function () {
    const simulateLoan = new SimulateLoan();
    const input = {
        code: "12345",
        purchaseTotalPrice: 540500,
        salary: 230000,
        downPayment: 150000,
        period: 7,
        tableType: "price",
    };
    const output = await simulateLoan.execute(input);

    expect(output.installments.at(1).balance).toBe(336365.66);
    expect(output.installments.at(output.installments.length - 1).balance).toBe(57464.73);
    expect(output.installments.at(output.installments.length - 2).balance).toBe(0);
});
