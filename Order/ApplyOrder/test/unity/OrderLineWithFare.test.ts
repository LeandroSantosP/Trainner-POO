import { OrderLineWithFare } from "@/domain/entity/OrderLineWithFare";
import { randomUUID } from "crypto";

test("Deve ser passível criar um produto e calcular o imposto", function () {
    const id = randomUUID();

    const orderLine = new OrderLineWithFare(id, 10, 1000);
    const fare = orderLine.calculateFare();
    expect(fare).toBe(200);
});

test("Deve ser passível criar um produto e calcular o imposto com uma taxa custom", function () {
    const id = randomUUID();
    const orderLine = new OrderLineWithFare(id, 10, 1000, 3);
    const fare = orderLine.calculateFare();
    expect(fare).toBe(300);
});

test("Deve aplicar o imposto mínimo de 10", function () {
    const id = randomUUID();
    const orderLine = new OrderLineWithFare(id, 1, 100);
    const fare = orderLine.calculateFare();
    expect(fare).toBe(10);
});
