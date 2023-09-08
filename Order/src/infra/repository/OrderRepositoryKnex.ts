import { OrderRepository } from "@/application/repository/OrderRepository";
import { Order } from "@/domain/entity/Order";

export class OrderRepositoryKnex implements OrderRepository {
    async persiste(order: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async get(document: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }
}
