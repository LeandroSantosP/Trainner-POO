import { LoanPrice } from "@/domain/entities/LoanPrice";
import { LoanSac } from "@/domain/entities/LoanSac";

test("Deve ser possível criar um Financiamento com a tabela price", function () {
    const input = {
        code: "12345",
        purchaseTotalPrice: 540500,
        salary: 230000,
        downPayment: 150000,
        period: 7,
        tableType: "price",
    };
    const loan = LoanPrice.create(input);

    const Installments = Array.from(loan.Installments);

    expect(loan.getStatus()).toBe("approved");
    expect(loan.getCode()).toBe("12345");
    expect(Installments.length).toBe(7);
});

test("Deve ser possível criar um Financiamento com a tabela sac e validar as installments", function () {
    const input = {
        code: "123456",
        purchaseTotalPrice: 540500,
        salary: 230000,
        downPayment: 150000,
        period: 7,
        tableType: "sac",
    };
    const loan = LoanSac.create(input);

    const Installments = Array.from(loan.Installments);
    expect(Installments.at(0)?.balance).toBe(334714.29);
    expect(Installments.at(Installments.length - 2)?.balance).toBe(55785.74);
    expect(Installments.at(Installments.length - 1)?.balance).toBe(0);
});

test("Caso o salario seja insuficiente deve lançar um erro.", function () {
    const input = {
        code: "123456",
        purchaseTotalPrice: 540500,
        salary: 10000,
        downPayment: 150000,
        period: 7,
        tableType: "sac",
    };
    expect(() => LoanSac.create(input)).toThrow(new Error("Insufficient salary"));
});

test("", function () {
    let test = new Set("1");

    for (const [key, value] of test.entries()) {
        console.log(key, value);
    }
});
