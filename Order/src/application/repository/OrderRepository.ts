import { Order } from "@/domain/entity/Order";

export interface OrderRepository {
    persiste(order: Order): Promise<void>;
    get(document: string): Promise<Order>;
    close(): Promise<void>;
}
