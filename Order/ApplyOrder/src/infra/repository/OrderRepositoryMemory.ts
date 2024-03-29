import { OrderRepository } from "@/application/repository/OrderRepository";
import { AppError } from "@/domain/entity/AppError";
import { Order } from "@/domain/entity/Order";

export class OrderRepositoryMemory implements OrderRepository {
    orders: Map<string, Order> = new Map();

    static instance: OrderRepositoryMemory;

    static getInstance() {
        if (!OrderRepositoryMemory.instance) {
            OrderRepositoryMemory.instance = new OrderRepositoryMemory();
        }
        return OrderRepositoryMemory.instance;
    }

    async persiste(order: Order): Promise<void> {
        this.orders.set(order.document, order);
    }
    async get(document: string): Promise<Order> {
        if (!this.orders.has(document)) throw new AppError("Order not found");
        const order = this.orders.get(document);
        return order!;
    }
    async getSequence(): Promise<number> {
        return this.orders.size;
    }
    async close(): Promise<void> {}
}
