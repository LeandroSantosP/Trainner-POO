import { OrderRepository } from "@/application/repository/OrderRepository";
import { Order } from "@/domain/entity/Order";

export class OrderRepositoryMemory implements OrderRepository {
    orders: Map<string, Order> = new Map();

    async persiste(order: Order): Promise<void> {
        this.orders.set(order.document, order);
    }
    async get(document: string): Promise<Order> {
        if (!this.orders.has(document)) throw new Error("Order not found");
        const order = this.orders.get(document);
        return order!;
    }
}
