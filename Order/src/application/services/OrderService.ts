import { Order } from "@/domain/entity/Order";
import { OrderRepository } from "../repository/OrderRepository";
import { Clock } from "../interfaces/Clock";
import { CouponRepository } from "../repository/CouponRepository";
import { ProductRepository } from "../repository/ProductRepository";
import { FreightCalculator } from "@/domain/domainServices/FreightCalculator";
import { OrderServiceFactory } from "../factory/OrderServiceFactory";

export class OrderService {
    readonly orderRepository: OrderRepository;
    readonly couponRepository: CouponRepository;
    readonly productRepository: ProductRepository;
    constructor(orderServiceFactory: OrderServiceFactory, readonly clock: Clock) {
        this.orderRepository = orderServiceFactory.orderRepository();
        this.couponRepository = orderServiceFactory.couponRepository();
        this.productRepository = orderServiceFactory.productRepository();
    }

    async applyOrder(input: ApplyOrderInput): Promise<void> {
        const currentDate = this.clock.getCurrentDate();
        const order = new Order(input.document, currentDate);
        const coupon = input.coupon ? await this.couponRepository.getByCode(input.coupon) : null;
        if (coupon) {
            order.addCoupon(coupon.getCode(), coupon.percentage, coupon.expire_date);
        }
        const productDimensions: { density: number; volume: number; weight: number }[] = [];
        for (const item of input.items) {
            const product = await this.productRepository.getById(item.productId);
            productDimensions.push({
                density: product.dimensions.getDensity(),
                volume: product.dimensions.getVolume(),
                weight: product.dimensions.weight,
            });
            order.addLine({
                quantity: item.quantity,
                price: product.price,
                hasFare: !!product.fare,
                fare: product.fare,
            });
        }
        const { freight } = FreightCalculator.execute(productDimensions);
        order.setFreight(freight);
        await this.orderRepository.persiste(order);
        // Order required
    }

    async getOrder(document: string): Promise<GetOrderOutPut> {
        const order = await this.orderRepository.get(document);
        const { ...infos } = order.getCompleteInfos();

        const output: GetOrderOutPut = {
            ...infos,
            document: order.document,
            orderDate: order.date,
            orderStatus: order.getStatus(),
        };
        return output;
    }
}

type GetOrderOutPut = {
    document: string;
    taxes: number;
    totalPrice: number;
    discount: number;
    orderStatus: string;
    orderDate: Date;
};

type ApplyOrderInput = {
    document: string;
    coupon?: string;
    items: Array<{ productId: string; quantity: number }>;
};
