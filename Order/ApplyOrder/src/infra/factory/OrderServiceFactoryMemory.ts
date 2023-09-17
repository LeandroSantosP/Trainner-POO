import { OrderServiceFactory } from "@/application/factory/OrderServiceFactory";
import { CouponRepository } from "@/application/repository/CouponRepository";
import { OrderRepository } from "@/application/repository/OrderRepository";
import { OrderRepositoryMemory } from "../repository/OrderRepositoryMemory";
import { CouponRepositoryMemory } from "../repository/CouponRepositoryMemory";
import { AddressRepository } from "@/application/repository/AddressRepository";
import { AddressRepositoryMemory } from "../repository/AddressRepositoryMemory";

export class OrderServiceFactoryMemory implements OrderServiceFactory {
    orderRepository(): OrderRepository {
        return OrderRepositoryMemory.getInstance();
    }
    couponRepository(): CouponRepository {
        return CouponRepositoryMemory.getInstance();
    }
    addressRepository(): AddressRepository {
        return AddressRepositoryMemory.getInstance();
    }
}
