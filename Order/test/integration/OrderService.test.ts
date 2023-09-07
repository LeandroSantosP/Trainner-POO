import { OrderService } from "@/application";
import { Clock } from "@/application/interfaces/Clock";
import { ProductDAO } from "@/application/interfaces/ProductDAO";
import { CouponRepository } from "@/application/repository/CouponRepository";
import { FakeClock } from "@/domain/domainServices/FakeClock";
import { Coupon } from "@/domain/entity/Coupon";
import { ProductDAOMemory } from "@/infra/DAO/ProductDAOMemory";
import { CouponRepositoryMemory } from "@/infra/repository/CouponRepositoryMemory";
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
let couponRepository: CouponRepository;

let productDAO: ProductDAO;
let orderService: OrderService;

beforeEach(() => {
    clock = new FakeClock();
    clock.setCurrentDate(new Date("2023-10-10"));
    orderRepository = new OrderRepositoryMemory();
    productDAO = new ProductDAOMemory();
    couponRepository = new CouponRepositoryMemory();
    orderService = new OrderService(clock, orderRepository, couponRepository, productDAO);
});
test("Deve ser possível solicitar um pedido com 3 items", async function () {
    await orderService.applyOrder(applyOrderInput);
    clock.setCurrentDate(new Date("2023-10-10"));

    const output = await orderService.getOrder("81307907008");
    expect(output.document).toBe("81307907008");
    expect(output.orderStatus).toBe("open");
    expect(output.orderDate).toEqual(new Date("2023-10-10"));
    expect(output.totalPrice).toBe(7130);
});

test("Deve ser possível solicitar um pedido com 2 items e aplicar um cupom de desconto", async function () {
    clock.setCurrentDate(new Date("2023-10-10"));
    await couponRepository.persiste(new Coupon("VALE20", 20, new Date("2023-11-01")));
    await orderService.applyOrder({ ...applyOrderInput, coupon: "VALE20" });
    const output = await orderService.getOrder("81307907008");
    expect(output.discount).toBe(1426);
    expect(output.totalPrice).toBe(5704);
    expect(output.taxes).toBe(1730);
});
