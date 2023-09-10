import { OrderService } from "@/application";
import { OrderServiceFactory } from "@/application/factory/OrderServiceFactory";
import { Clock } from "@/application/interfaces/Clock";
import { FakeClock } from "@/domain/domainServices/FakeClock";
import { Address } from "@/domain/entity/Address";
import { Coupon } from "@/domain/entity/Coupon";
import knexConnection from "@/infra/database/knexfile";
import { OrderServiceFactoryDatabase } from "@/infra/factory/OrderServiceFactoryDatabase";
import knexClear from "knex-cleaner";

let applyOrderInput = {
    documentTo: "81307907008",
    documentFrom: "85878184656",
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

beforeEach(async () => {
    await knexClear.clean(knexConnection);
    clock = new FakeClock();
    orderServiceFactory = new OrderServiceFactoryDatabase();
    await orderServiceFactory.addressRepository().save(new Address("81307907008", "", "", "", 40.7128, -74.006));
    await orderServiceFactory.addressRepository().save(new Address("85878184656", "", "", "", 34.0522, -118.2437));
    clock.setCurrentDate(new Date("2023-10-10"));
    orderService = new OrderService(orderServiceFactory, clock);
});
test("Deve ser possível solicitar um pedido com 3 items", async function () {
    await orderService.applyOrder(applyOrderInput);
    clock.setCurrentDate(new Date("2023-10-10"));
    const output = await orderService.getOrder("81307907008");
    expect(output.orderCode).toBe("202300000001");
    expect(output.document).toBe("81307907008");
    expect(output.orderStatus).toBe("open");
    expect(output.orderDate).toEqual(new Date("2023-10-10"));
    expect(output.totalPrice).toBe(7152);
});

test("Deve ser possível solicitar um pedido com 2 items e aplicar um cupom de desconto", async function () {
    clock.setCurrentDate(new Date("2023-10-10"));
    await orderServiceFactory.couponRepository().persiste(new Coupon("VALE20", 20, new Date("2023-11-01")));
    await orderService.applyOrder({ ...applyOrderInput, coupon: "VALE20" });
    const output = await orderService.getOrder("81307907008");
    expect(output.discount).toBe(1430.4);
    expect(output.totalPrice).toBe(5721.6);
    expect(output.taxes).toBe(1730);
});

afterAll(async () => {
    await orderServiceFactory.orderRepository().close();
    await orderServiceFactory.couponRepository().close();
});
