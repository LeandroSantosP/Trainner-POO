import { Order } from "@/domain/Order";

test("Deve criar um pedido e calcular o total.", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));

    order.addProduct("SmartPhone", 4, 100, "Uma Descrição");
    order.addProduct("TV", 1, 1340, "Uma Descrição");
    order.addProduct("PC", 2, 600, "Uma Descrição");
    expect(order.getPrice()).toBe(2940);
    expect(order.getStatus()).toBe("open");
});

test("Não deve ser possível adicionar coupon ja existente", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    order.addCoupon("VALE10", 10);
    expect(() => order.addCoupon("VALE10", 30)).toThrow(new Error("Coupon already Applied"));
});

test("Deve criar um pedido e calcular o total com um cupom de 10% e outro de 30%.", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    order.addCoupon("VALE10", 10);
    order.addCoupon("VALE40", 30);

    order.addProduct("SmartPhone", 4, 100, "Uma Descrição");
    order.addProduct("TV", 1, 1340, "Uma Descrição");
    order.addProduct("PC", 2, 600, "Uma Descrição");

    expect(order.getPrice()).toBe(1764);
});

test("Deve ser possível criar uma order com produtos que contem taxas", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    const fare = 2; // 2%
    order.addProduct("SmartPhone", 2, 1000, "Uma Descrição", true, fare);
    const price = order.getPrice();
    expect(price).toBe(2040);
});
