import { Order } from "@/domain/entity/Order";
import { OrderRepository } from "../repository/OrderRepository";
import { Clock } from "../interfaces/Clock";
import { CouponRepository } from "../repository/CouponRepository";
import { ProductRepository } from "../repository/ProductRepository";
import { FreightCalculator } from "@/domain/domainServices/FreightCalculator";
import { Product } from "@/domain/entity/Product";
import { Dimensions } from "@/domain/entity/Dimensions";

export class OrderService {
    constructor(
        readonly clock: Clock,
        readonly orderRepository: OrderRepository,
        readonly couponRepository: CouponRepository,
        readonly productRepository: ProductRepository
    ) {}

    async applyOrder(input: ApplyOrderInput): Promise<void> {
        const currentDate = this.clock.getCurrentDate();
        const order = new Order(input.document, currentDate);
        const coupon = input.coupon ? await this.couponRepository.getByCode(input.coupon) : null;
        if (coupon) {
            order.addCoupon(coupon.getCode(), coupon.percentage, coupon.expire_date);
        }
        const productDimensions: Dimensions[] = [];
        for (const item of input.items) {
            const product = await this.productRepository.getById(item.productId);
            productDimensions.push(product.dimensions);
            order.addItem({
                productName: product.name,
                quantity: item.quantity,
                price: product.price,
                description: product.description,
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
        const infos = order.getCompleteInfos();
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
