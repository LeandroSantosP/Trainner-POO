import { ApplyOrderService } from "@/application";
import { Clock } from "@/application/interfaces/Clock";
import { ProductDAO } from "@/application/interfaces/ProductDAO";
import { FakeClock } from "@/domain/domainServices/FakeClock";
import { ProductDAOMemory } from "@/infra/DAO/ProductDAOMemory";
import { OrderRepositoryMemory } from "@/infra/repository/OrderRepositoryMemory";
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
let orderRepository: OrderRepositoryMemory;
let productDAO: ProductDAO;
let applyOrderService: ApplyOrderService;

beforeEach(() => {
    clock = new FakeClock();
    clock.setCurrentDate(new Date("2023-10-10"));
    orderRepository = new OrderRepositoryMemory();
    productDAO = new ProductDAOMemory();
    applyOrderService = new ApplyOrderService(clock, orderRepository, productDAO);
});
test("Deve ser possível solicitar um pedido com 3 items", async function () {
    await applyOrderService.applyOrder(applyOrderInput);
    clock.setCurrentDate(new Date("2023-10-10"));

    const output = await applyOrderService.getOrder("81307907008");
    expect(output.document).toBe("81307907008");
    expect(output.orderStatus).toBe("open");
    expect(output.discount).toBe(0);
    expect(output.orderDate).toEqual(new Date("2023-10-10"));
    expect(output.totalPrice).toBe(7130);
});

test("Deve ser possível solicitar um pedido com 2 items e aplicar um cupom de desconto", async function () {
    const clock = new FakeClock();
    const orderRepository = new OrderRepositoryMemory();
    const productDAO = new ProductDAOMemory();
    const applyOrderService = new ApplyOrderService(clock, orderRepository, productDAO);
    await applyOrderService.applyOrder({ ...applyOrderInput, coupon: "VALE20" });

    const output = await applyOrderService.getOrder("81307907008");
    expect(output.totalPrice).toBe(7130);
});
