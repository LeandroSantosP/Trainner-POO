import { Order } from "@/domain/entity/Order";

test("Deve criar um pedido e calcular o total.", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));

    order.addItem("SmartPhone", 4, 100, "Uma Descrição");
    order.addItem("TV", 1, 1340, "Uma Descrição");
    order.addItem("PC", 2, 600, "Uma Descrição");
    expect(order.getTotalPrice()).toBe(2940);
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

    order.addItem("SmartPhone", 4, 100, "Uma Descrição");
    order.addItem("TV", 1, 1340, "Uma Descrição");
    order.addItem("PC", 2, 600, "Uma Descrição");

    expect(order.getTotalPrice()).toBe(1764);
});

test("Deve ser possível criar uma order com produtos que contem taxas", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    const fare = 2; // 2%
    order.addItem("SmartPhone", 2, 1000, "Uma Descrição", true, fare);
    const price = order.getTotalPrice();
    expect(price).toBe(2040);
});

test("Deve ser possível obter o desconto, taxas e o valor total de um pedido e mudar o status para: conclude", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    order.addCoupon("VALE10", 10);

    const fare = 2; // 2%
    order.addItem("SmartPhone", 2, 1000, "Uma Descrição", true, fare);
    const output = order.getCompleteInfos();
    order.changeStatus("conclude");
    expect(output.totalPrice).toBe(1836);
    expect(output.discount).toBe(204);
    expect(output.taxes).toBe(40);
    expect(order.getStatus()).toBe("conclude");
});
