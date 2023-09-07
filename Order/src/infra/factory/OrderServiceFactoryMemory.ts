import { OrderServiceFactory } from "@/application/factory/OrderServiceFactory";
import { CouponRepository } from "@/application/repository/CouponRepository";
import { OrderRepository } from "@/application/repository/OrderRepository";
import { ProductRepository } from "@/application/repository/ProductRepository";
import { OrderRepositoryMemory } from "../repository/OrderRepositoryMemory";
import { CouponRepositoryMemory } from "../repository/CouponRepositoryMemory";
import { ProductRepositoryMemory } from "../repository/ProductRepositoryMemory";

export class OrderServiceFactoryMemory implements OrderServiceFactory {
    orderRepository(): OrderRepository {
        return OrderRepositoryMemory.getInstance();
    }
    couponRepository(): CouponRepository {
        return CouponRepositoryMemory.getInstance();
    }
    productRepository(): ProductRepository {
        return ProductRepositoryMemory.getInstance();
    }
}
