import { Installment } from "@/domain/entities/Installment";
import { TaxBoleto } from "@/domain/entities/TaxBoleto";
import { TaxCreditCard } from "@/domain/entities/TaxCreditCard";

test("Deve ser possivel criar um installment", function () {
    const tax = new TaxBoleto();
    const installment = new Installment(1000, "boleto", 1, tax);
    expect(installment).toBeDefined();
});

test("Deve ser possivel calcular as taxas de uma installment(mdr)", function () {
    const tax = new TaxCreditCard();
    tax.add(10, 10);
    tax.add(10, 10);

    const installment = new Installment(1000, "credit_card", 10, tax);

    expect(installment.mdr).toBe(220);
});

test("Deve lancar um erro caso a Tax seja diferente do paymentMethod", function () {
    const tax = new TaxBoleto();
    expect(() => new Installment(1000, "credit_card", 2, tax)).toThrowError("invalid Tax Type!");
});

test("Deve lancar um erro caso atualizar um status invalido.", function () {
    const tax = new TaxBoleto();
    const installment = new Installment(1000, "boleto", 1, tax);

    expect(() => installment.changeStatus("paid")).not.toThrowError();
    expect(() => installment.changeStatus("invalid_status")).toThrowError("Status not allowed!");
});
