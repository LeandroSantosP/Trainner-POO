import { TaxBoleto } from "@/domain/entities/TaxBoleto";
import { TaxCreditCard } from "@/domain/entities/TaxCreditCard";
import { MakeMockTransaction } from "../shared/UnitsFunctions";

test("Deve ser possível criar uma nova transação do tipo boleto e verificar o status inicial.", function () {
    const tax = new TaxBoleto();

    const { transaction } = MakeMockTransaction({ installmentsNumber: 1, paymentMethod: "boleto", tax });
    const transactionStatus = transaction.getStatus();

    expect(transactionStatus).toBe("open");
    expect(transaction.paymentMethod).toBe("boleto");
});

test("Deve ser possível criar uma nova transação em 3 vezes e gerar as parcelas.", function () {
    const tax = new TaxCreditCard();
    const { transaction } = MakeMockTransaction({ installmentsNumber: 3, paymentMethod: "credit_card", tax });

    const InstalmentFirst = transaction.installments.at(0);
    const InstalmentLast = transaction.installments.at(transaction.installments.length - 1);

    const { balance } = transaction.getBalances();

    expect(balance).toBe(1000);
    expect(InstalmentFirst?.amount).toBe(333.33);
    expect(InstalmentFirst?.status).toBe("waiting_payment");
    expect(InstalmentFirst?.instalmentNumber).toBe(1);
    expect(InstalmentLast?.amount).toBe(333.33);
    expect(InstalmentLast?.status).toBe("waiting_payment");
    expect(InstalmentLast?.instalmentNumber).toBe(3);
});

test("Deve ser possível criar uma nova transação em 4 vezes e pagar todas as pareceras e mudar o status para closed.", function () {
    const tax = new TaxCreditCard();
    const { transaction } = MakeMockTransaction({ installmentsNumber: 4, paymentMethod: "credit_card", tax });
    tax.add(10, 10);
    tax.add(10, 10);
    transaction.pay();

    for (const instalment of transaction.installments) {
        expect(instalment.status).toBe("paid");
    }

    const { balance } = transaction.getBalances();
    const transactionStatus = transaction.getStatus();
    expect(balance).toBe(0);
    expect(transactionStatus).toBe("closed");
});

test("Deve lancar um erro casso a parcela ja tenha sido paga", function () {
    const tax = new TaxCreditCard();
    const { transaction } = MakeMockTransaction({ installmentsNumber: 4, paymentMethod: "credit_card", tax });
    transaction.pay(2);
    expect(() => transaction.pay(2)).toThrowError("Instalment 2 already paid");
});

test("Deve ser possível criar uma nova transação em 4 vezes e pagar somente a primeira parcela.", function () {
    const tax = new TaxCreditCard();
    const { transaction } = MakeMockTransaction({ installmentsNumber: 4, paymentMethod: "credit_card", tax });

    const InstalmentFirst = transaction.installments.at(0);
    transaction.pay(1);

    expect(InstalmentFirst?.status).toBe("paid");

    for (const instalment of transaction.installments) {
        if (instalment.instalmentNumber === 1) continue;
        expect(instalment.status).toBe("waiting_payment");
    }

    const { balance } = transaction.getBalances();
    expect(balance).toBe(750);
});

test("Deve ser possível criar uma nova transação em 4 vezes e pagar somente a primeira parcela.", function () {
    const tax = new TaxCreditCard();
    const { transaction } = MakeMockTransaction({ installmentsNumber: 4, paymentMethod: "credit_card", tax });

    expect(() => transaction.pay(10)).toThrowError("Instalment not found");
});

test("Deve ser possível criar uma nova transação a vista e calcular o imposto com taxa variável e fixa.", function () {
    const tax = new TaxBoleto();

    tax.add(10, 10);
    tax.add(10, 10);

    const { transaction } = MakeMockTransaction({ installmentsNumber: 1, paymentMethod: "boleto", tax });

    transaction.pay();

    const InstalmentFirst = transaction.installments.at(0);

    expect(InstalmentFirst?.mdr).toBe(220);
    const { balance } = transaction.getBalances();
    expect(balance).toBe(0);
});
