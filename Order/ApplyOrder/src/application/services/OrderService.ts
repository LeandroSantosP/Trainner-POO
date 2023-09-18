import { Order } from "@/domain/entity/Order";
import { OrderRepository } from "../repository/OrderRepository";
import { Clock } from "../interfaces/Clock";
import { CouponRepository } from "../repository/CouponRepository";
import { FreightCalculator } from "@/domain/domainServices/FreightCalculator";
import { OrderServiceFactory } from "../factory/OrderServiceFactory";
import { AddressRepository } from "../repository/AddressRepository";
import { DistanceCalculator } from "@/domain/entity/DistanceCalculator";
import { ProductGateway } from "@/infra/gateways/ProductGateWay";
import { AppError } from "@/domain/entity/AppError";
import { Queue } from "@/infra/queue/Queue";
import { OrderApplied } from "@/infra/events/OrderApplied";
import { MailerGateway } from "../interfaces/MailerGateway";
import { MessageRepository } from "../repository/MessageRepository";
import { Message } from "@/domain/entity/Message";

export class OrderService {
    readonly orderRepository: OrderRepository;
    readonly couponRepository: CouponRepository;
    readonly addressRepository: AddressRepository;
    readonly messageRepository: MessageRepository;

    constructor(
        orderServiceFactory: OrderServiceFactory,
        readonly productGateway: ProductGateway,
        readonly clock: Clock,
        readonly queue: Queue,
        readonly mailerGateway: MailerGateway
    ) {
        this.messageRepository = orderServiceFactory.messageRepository();
        this.addressRepository = orderServiceFactory.addressRepository();
        this.orderRepository = orderServiceFactory.orderRepository();
        this.couponRepository = orderServiceFactory.couponRepository();
    }

    async applyOrder({ clientEmail = "test@gmail.com", ...input }: ApplyOrderInput): Promise<void> {
        const currentDate = this.clock.getCurrentDate();
        const sequence = await this.orderRepository.getSequence();
        const order = new Order(input.documentTo, currentDate, sequence);
        const coupon = input.coupon ? await this.couponRepository.getByCode(input.coupon) : null;
        if (coupon) {
            order.addCoupon(coupon.getCode(), coupon.percentage, coupon.expire_date);
        }
        const productIds = input.items.map((item) => item.productId);
        const products = await this.productGateway.getProducts(productIds);

        const productDimensions = products.map((product) => ({
            density: product.density,
            volume: product.volume,
            weight: product.weight,
        }));
        for (const item of input.items) {
            const product = products.find((product) => product.productId === item.productId);
            if (!product) throw new AppError("Product not found");
            order.addLine({
                id: item.productId,
                quantity: item.quantity,
                price: product.price,
                hasFare: !!product.fare,
                fare: product.fare,
            });
        }
        const addressTo = await this.addressRepository.getByDocument(input.documentTo);
        const addressFrom = await this.addressRepository.getByDocument(input.documentFrom);
        const distance = DistanceCalculator.execute(addressTo.cord, addressFrom.cord);
        const { freight } = FreightCalculator.execute(productDimensions, distance);
        order.setFreight(freight);
        const message = new Message(
            "1235",
            "companyName@email.com",
            clientEmail,
            "Pedido Aplicado",
            "Seu Pedido foi aplicado com sucesso!"
        );
        const output = await this.mailerGateway.send({
            body: message.body,
            from: message.from,
            to: message.to,
            subject: message.subject,
        });
        if (output.status === "sended") {
            await this.messageRepository.save(message);
        }
        await this.orderRepository.persiste(order);
        await this.queue.publisher("OrderApplied", new OrderApplied(input.items));
        // Order required
    }

    async getOrder(document: string): Promise<GetOrderOutPut> {
        const order = await this.orderRepository.get(document);
        const { ...infos } = order.getCompleteInfos();
        const output: GetOrderOutPut = {
            ...infos,
            document: order.document,
            orderDate: order.date,
            orderCode: order.getCode(),
            orderStatus: order.getStatus(),
        };
        return output;
    }
}

type GetOrderOutPut = {
    document: string;
    orderCode: string;
    taxes: number;
    totalPrice: number;
    discount: number;
    orderStatus: string;
    orderDate: Date;
};

type ApplyOrderInput = {
    documentTo: string;
    documentFrom: string;
    clientEmail?: string;
    coupon?: string;
    items: Array<{ productId: string; quantity: number }>;
};
