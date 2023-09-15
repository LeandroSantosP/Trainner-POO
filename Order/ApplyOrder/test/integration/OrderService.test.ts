import { OrderService } from "@/application";
import { OrderServiceFactory } from "@/application/factory/OrderServiceFactory";
import { Clock } from "@/application/interfaces/Clock";
import { FakeClock } from "@/domain/domainServices/FakeClock";
import { Address } from "@/domain/entity/Address";
import { Coupon } from "@/domain/entity/Coupon";
import knexConnection from "@/infra/database/knexfile";
import { OrderServiceFactoryDatabase } from "@/infra/factory/OrderServiceFactoryDatabase";
import { ProductGateway } from "@/infra/gateways/ProductGateWay";
import { AxiosHttpClient } from "@/infra/httpClient/AxiosHttpClient";
import { Queue } from "@/infra/queue/Queue";
import { RabbitMqAdapter } from "@/infra/queue/RabbitMqAdapter";
import knexClear from "knex-cleaner";

let applyOrderInput = {
    documentTo: "81307907008",
    documentFrom: "85878184656",
    items: [
        {
            productId: "a3ff22d2-4e54-4db4-ae87-9e739f578009",
            quantity: 1,
        },
        {
            productId: "e0907ecf-3b90-4bbf-b741-ad3da998b59e",
            quantity: 2,
        },
        {
            productId: "3faccc5e-ab42-405e-b75e-45fba9c920cd",
            quantity: 4,
        },
    ],
};

let clock: Clock;
let orderService: OrderService;
let orderServiceFactory: OrderServiceFactory;

let queue: Queue;

beforeEach(async () => {
    queue = new RabbitMqAdapter();
    await queue.connect();
    await knexClear.clean(knexConnection, {
        mode: "delete",
        restartIdentity: true,
        ignoreTables: ["product"],
    });
    clock = new FakeClock();
    orderServiceFactory = new OrderServiceFactoryDatabase();
    await orderServiceFactory.addressRepository().save(new Address("81307907008", "", "", "", 40.7128, -74.006));
    await orderServiceFactory.addressRepository().save(new Address("85878184656", "", "", "", 34.0522, -118.2437));
    clock.setCurrentDate(new Date("2023-10-10"));
    const httpClient = new AxiosHttpClient();
    const productGateway = new ProductGateway(httpClient);
    orderService = new OrderService(orderServiceFactory, productGateway, clock, queue);
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
