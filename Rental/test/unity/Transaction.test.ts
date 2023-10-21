import { Transaction } from "@/domain/Transition";

test("Deve ser possível criar uma tramação", function () {
    const transaction = Transaction.create({
        document: "11234123916",
        method: "boleto",
        amount: 1000,
    });

    expect(transaction.id).toBeDefined();
    expect(transaction.document).toBe("11234123916");
    expect(transaction.method).toBe("boleto");
    expect(transaction.getTotal()).toBe(1000);
});

test("Deve ser possível criar uma tramação com taxas", function () {
    const transaction = Transaction.create({
        document: "11234123916",
        method: "boleto",
        amount: 1000,
        fare: 20,
    });

    expect(transaction.getTotal()).toBe(1020);
    expect(transaction.fare).toBe(20);
});
