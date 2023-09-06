import { OrderLine } from "@/domain/entity/OrderLine";
import { randomUUID } from "crypto";

test("Deve ser possível criar um produto", function () {
    const id = randomUUID();

    const orderLine = new OrderLine(id, "SmartPhone", 10, 2000);
    expect(orderLine.price).toBe(2000);
    expect(orderLine.name).toBe("SmartPhone");
});

test("Deve ser possível criar um produto e calcular o subtotal", function () {
    const id = randomUUID();
    const orderLine = new OrderLine(id, "SmartPhone", 10, 2000);
    expect(orderLine.getSubtotal()).toBe(20000);
});

test("Deve não deve ser possível criar um produto com quantidade negativa", function () {
    const id = randomUUID();

    expect(() => new OrderLine(id, "SmartPhone", -10, 2000)).toThrow(
        new Error("Product quantity must not be negative")
    );
});
