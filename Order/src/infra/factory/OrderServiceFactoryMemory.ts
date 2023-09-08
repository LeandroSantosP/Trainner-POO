import { OrderServiceFactory } from "@/application/factory/OrderServiceFactory";
import { CouponRepository } from "@/application/repository/CouponRepository";
import { OrderRepository } from "@/application/repository/OrderRepository";
import { ProductRepository } from "@/application/repository/ProductRepository";
import { OrderRepositoryMemory } from "../repository/OrderRepositoryMemory";
import { CouponRepositoryMemory } from "../repository/CouponRepositoryMemory";
import { ProductRepositoryMemory } from "../repository/ProductRepositoryMemory";
import { CouponRepositoryKnex } from "../repository/CouponRepositoryKnex";
import { OrderRepositoryKnex } from "../repository/OrderRepositoryKnex";

export class OrderServiceFactoryMemory implements OrderServiceFactory {
    orderRepository(): OrderRepository {
        return new OrderRepositoryKnex();
    }
    couponRepository(): CouponRepository {
        return new CouponRepositoryKnex();
    }
    productRepository(): ProductRepository {
        return ProductRepositoryMemory.getInstance();
    }
}
