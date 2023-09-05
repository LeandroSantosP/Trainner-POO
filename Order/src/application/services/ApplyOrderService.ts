import { Order } from "@/domain/entity/Order";
import { OrderRepository } from "../repository/OrderRepository";
import { Clock } from "../interfaces/Clock";
import { ProductDAO } from "../interfaces/ProductDAO";

export class ApplyOrderService {
    constructor(readonly clock: Clock, readonly orderRepository: OrderRepository, readonly productDAO: ProductDAO) {}

    async applyOrder(input: ApplyOrderInput): Promise<void> {
        const currentDate = this.clock.getCurrentDate();
        const order = new Order(input.document, currentDate);

        for (const item of input.items) {
            const product = await this.productDAO.get(item.productId);

            order.addItem(
                product.name,
                item.quantity,
                product.price,
                product.description,
                !!product.fare,
                product.fare
            );
        }

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
