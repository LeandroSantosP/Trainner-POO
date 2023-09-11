import { AppError } from "@/domain/entity/AppError";
import { OrderLine } from "@/domain/entity/OrderLine";
import { randomUUID } from "crypto";

test("Deve ser possível criar um produto", function () {
    const id = randomUUID();

    const orderLine = new OrderLine(id, 10, 2000);
    expect(orderLine.price).toBe(2000);
});

test("Deve ser possível criar um produto e calcular o total", function () {
    const id = randomUUID();
    const orderLine = new OrderLine(id, 10, 2000);
    expect(orderLine.getTotal()).toBe(20000);
});

test("Deve não deve ser possível criar um produto com quantidade negativa", function () {
    const id = randomUUID();

    expect(() => new OrderLine(id, -10, 2000)).toThrow(new AppError("Product quantity must not be negative"));
});
