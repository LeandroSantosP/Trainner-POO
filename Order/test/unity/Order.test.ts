import { Order } from "@/domain/entity/Order";

test("Deve criar um pedido e calcular o total.", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));

    order.addItem({ productName: "SmartPhone", quantity: 4, price: 100, description: "Uma Descrição" });
    order.addItem({ productName: "TV", quantity: 1, price: 1340, description: "Uma Descrição" });
    order.addItem({ productName: "PC", quantity: 2, price: 600, description: "Uma Descrição" });
    expect(order.getTotalPrice()).toBe(2940);
    expect(order.getStatus()).toBe("open");
});

test("Não deve ser possível adicionar um item repetido no pedido.", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));

    order.addItem({ productName: "SmartPhone", quantity: 4, price: 100, description: "Uma Descrição", id: "1234" });

    expect(() =>
        order.addItem({ productName: "SmartPhone", quantity: 4, price: 100, description: "Uma Descrição", id: "1234" })
    ).toThrow(new Error("Product already select."));
});

test("Não deve ser possível adicionar coupon ja existente", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    order.addCoupon("VALE10", 10);
    expect(() => order.addCoupon("VALE10", 30)).toThrow(new Error("Coupon already Applied"));
});

test("Deve criar um pedido e calcular o total com um cupom de 10% e outro de 30%.", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    const coupon_expire = new Date("2023-11-22");
    order.addCoupon("VALE10", 10, coupon_expire);
    order.addCoupon("VALE40", 30, coupon_expire);

    order.addItem({ productName: "SmartPhone", quantity: 4, price: 100, description: "Uma Descrição" });
    order.addItem({ productName: "TV", quantity: 1, price: 1340, description: "Uma Descrição" });
    order.addItem({ productName: "PC", quantity: 2, price: 600, description: "Uma Descrição" });

    expect(order.getTotalPrice()).toBe(1764);
});

test("Deve ser possível criar uma order com produtos que contem taxas", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    const fare = 2; // 2%
    order.addItem({
        productName: "SmartPhone",
        quantity: 2,
        price: 1000,
        description: "Uma Descrição",
        hasFare: true,
        fare: fare,
    });
    const price = order.getTotalPrice();
    expect(price).toBe(2040);
});

test("Deve ser possível obter o desconto, taxas e o valor total de um pedido e mudar o status para: conclude", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    const coupon_expire = new Date("2023-11-22");

    order.addCoupon("VALE10", 10, coupon_expire);

    order.addItem({
        productName: "SmartPhone",
        quantity: 2,
        price: 1000,
        description: "Uma Descrição",
        hasFare: true,
        fare: 2,
    });
    const output = order.getCompleteInfos();
    order.changeStatus("conclude");
    expect(output.totalPrice).toBe(1836);
    expect(output.discount).toBe(204);
    expect(output.taxes).toBe(40);
    expect(order.getStatus()).toBe("conclude");
});

test("Deve ser possível calcular o valor do frete de um produto", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    order.addItem({
        productName: "SmartPhone",
        quantity: 4,
        price: 100,
        description: "Uma Descrição",
        hasFare: true,
        fare: 20,
    });
});
