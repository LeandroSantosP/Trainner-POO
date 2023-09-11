import { AppError } from "@/domain/entity/AppError";
import { Order } from "@/domain/entity/Order";

test("Deve criar um pedido e calcular o total.", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));

    order.addLine({ quantity: 4, price: 100 });
    order.addLine({ quantity: 1, price: 1340 });
    order.addLine({ quantity: 2, price: 600 });
    expect(order.getTotalPrice()).toBe(2940);
    expect(order.getStatus()).toBe("open");
});

test("Deve criar um pedido com a código", function () {
    const order = new Order("92218475006", new Date("2023-10-22"), 10, "1234");
    expect(order.getCode()).toBe("202300000010");
});

test("Não deve ser possível adicionar um item repetido no pedido.", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));

    order.addLine({ quantity: 4, price: 100, id: "1234" });

    expect(() => order.addLine({ quantity: 4, price: 100, id: "1234" })).toThrow(
        new AppError("Product already select.")
    );
});

test("Não deve ser possível adicionar coupon ja existente", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    order.addCoupon("VALE10", 10, new Date("2023-11-30"));
    expect(() => order.addCoupon("VALE10", 30, new Date("2023-11-30"))).toThrow(new AppError("Coupon already Applied"));
});

test("Deve criar um pedido e calcular o total com um cupom de 10% e outro de 30%.", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    const coupon_expire = new Date("2023-11-22");
    order.addCoupon("VALE10", 10, coupon_expire);
    order.addCoupon("VALE40", 30, coupon_expire);

    order.addLine({ quantity: 4, price: 100 });
    order.addLine({ quantity: 1, price: 1340 });
    order.addLine({ quantity: 2, price: 600 });

    expect(order.getTotalPrice()).toBe(1764);
});

test("Deve ser possível criar uma order com produtos que contem taxas e total de frete", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    order.setFreight(100);
    const fare = 2; // 2%
    order.addLine({
        quantity: 2,
        price: 1000,
        hasFare: true,
        fare: fare,
    });
    const price = order.getTotalPrice();
    expect(price).toBe(2140);
});

test("Deve ser possível obter o desconto, taxas e o valor total de um pedido e mudar o status para: conclude", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    const coupon_expire = new Date("2023-11-22");
    order.addCoupon("VALE10", 10, coupon_expire);
    order.addLine({
        quantity: 2,
        price: 1000,
        hasFare: true,
        fare: 2,
    });
    const total = order.getTotalPrice();
    const output = order.getCompleteInfos();
    order.changeStatus("conclude");
    expect(total).toBe(1836);
    expect(output.discount).toBe(204);
    expect(output.taxes).toBe(40);
    expect(order.getStatus()).toBe("conclude");
});

test("Deve ser possível calcular o valor do frete de um produto", function () {
    const order = new Order("92218475006", new Date("2023-10-22"));
    order.addLine({
        quantity: 4,
        price: 100,
        hasFare: true,
        fare: 20,
    });
});
