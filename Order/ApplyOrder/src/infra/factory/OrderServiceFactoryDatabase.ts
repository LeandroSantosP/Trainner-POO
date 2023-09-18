import { OrderServiceFactory } from "@/application/factory/OrderServiceFactory";
import { CouponRepository } from "@/application/repository/CouponRepository";
import { OrderRepository } from "@/application/repository/OrderRepository";
import { CouponRepositoryKnex } from "../repository/CouponRepositoryKnex";
import { OrderRepositoryKnex } from "../repository/OrderRepositoryKnex";
import { AddressRepository } from "@/application/repository/AddressRepository";
import { AddressRepositoryKnex } from "../repository/AddressRepositoryKnex";
import { MessageRepository } from "@/application/repository/MessageRepository";
import { MessageRepositoryMemory } from "../repository/MailerRepositoryMemory";

export class OrderServiceFactoryDatabase implements OrderServiceFactory {
    messageRepository(): MessageRepository {
        return MessageRepositoryMemory.getInstance();
    }
    orderRepository(): OrderRepository {
        return new OrderRepositoryKnex();
    }
    couponRepository(): CouponRepository {
        return new CouponRepositoryKnex();
    }
    addressRepository(): AddressRepository {
        return new AddressRepositoryKnex();
    }
}
