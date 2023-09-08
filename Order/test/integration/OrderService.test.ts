import { OrderService } from "@/application";
import { OrderServiceFactory } from "@/application/factory/OrderServiceFactory";
import { Clock } from "@/application/interfaces/Clock";
import { FakeClock } from "@/domain/domainServices/FakeClock";
import { Coupon } from "@/domain/entity/Coupon";
import { OrderServiceFactoryMemory } from "@/infra/factory/OrderServiceFactoryMemory";

let applyOrderInput = {
    document: "81307907008",
    items: [
        {
            productId: "123",
            quantity: 1,
        },
        {
            productId: "124",
            quantity: 2,
        },
        {
            productId: "125",
            quantity: 4,
        },
    ],
};

let clock: Clock;
let orderService: OrderService;
let orderServiceFactory: OrderServiceFactory;

beforeEach(() => {
    clock = new FakeClock();
    clock.setCurrentDate(new Date("2023-10-10"));
    orderServiceFactory = new OrderServiceFactoryMemory();
    orderService = new OrderService(orderServiceFactory, clock);
});
test("Deve ser possível solicitar um pedido com 3 items", async function () {
    await orderService.applyOrder(applyOrderInput);
    clock.setCurrentDate(new Date("2023-10-10"));
    const output = await orderService.getOrder("81307907008");
    expect(output.document).toBe("81307907008");
    expect(output.orderStatus).toBe("open");
    expect(output.orderDate).toEqual(new Date("2023-10-10"));
    expect(output.totalPrice).toBe(7160);
});

test("Deve ser possível solicitar um pedido com 2 items e aplicar um cupom de desconto", async function () {
    clock.setCurrentDate(new Date("2023-10-10"));
    await orderServiceFactory.couponRepository().persiste(new Coupon("VALE20", 20, new Date("2023-11-01")));
    await orderService.applyOrder({ ...applyOrderInput, coupon: "VALE20" });
    const output = await orderService.getOrder("81307907008");
    expect(output.discount).toBe(1432);
    expect(output.totalPrice).toBe(5728);
    expect(output.taxes).toBe(1730);
});
