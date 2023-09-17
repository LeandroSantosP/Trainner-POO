import { OrderServiceFactory } from "@/application/factory/OrderServiceFactory";
import { CouponRepository } from "@/application/repository/CouponRepository";
import { OrderRepository } from "@/application/repository/OrderRepository";
import { CouponRepositoryKnex } from "../repository/CouponRepositoryKnex";
import { OrderRepositoryKnex } from "../repository/OrderRepositoryKnex";
import { AddressRepository } from "@/application/repository/AddressRepository";
import { AddressRepositoryMemory } from "../repository/AddressRepositoryMemory";
import { AddressRepositoryKnex } from "../repository/AddressRepositoryKnex";

export class OrderServiceFactoryDatabase implements OrderServiceFactory {
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
