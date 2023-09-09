import { OrderRepository } from "@/application/repository/OrderRepository";
import { AddLineProps, Order } from "../../domain/entity/Order";
import { Knex } from "knex";
import knexConnection from "../database/knexfile";
import { randomUUID } from "crypto";
import { OrderLineWithFare } from "../../domain/entity/ProductWithFare";

export class OrderRepositoryKnex implements OrderRepository {
    app: Knex;
    constructor() {
        this.app = knexConnection;
    }
    async persiste(order: Order): Promise<void> {
        const total = order.getTotalPrice();
        const { discount, freight } = order.getCompleteInfos();

        await this.app("order").insert({
            id: order.id,
            sequence: order.sequence,
            client_document: order.document,
            status: order.getStatus(),
            code: order.getCode(),
            taxes: order.getTaxes(),
            order_date: order.date,
            total,
            discount,
            freight,
        });

        for (const line of order.products) {
            let data = {
                id: randomUUID(),
                product_id: line.id,
                quantity: line.quantity,
                total: line.getTotal(),
                order_id: order.id,
            } as { [key: string]: any };
            if (line instanceof OrderLineWithFare) {
                data.fare = line.fare;
                data.min_fare = line.MIN_FARE;
            }
            await this.app("order_line").insert(data);
        }
    }
    async get(document: string): Promise<Order> {
        const [orderData] = await this.app("order").where("order.client_document", document);
        const order = Order.restore({
            id: orderData.id,
            code: orderData.code,
            document: orderData.client_document,
            discount: parseFloat(orderData.discount),
            taxes: parseFloat(orderData.taxes),
            freight: parseFloat(orderData.freight),
            price: parseFloat(orderData.total),
            orderDate: orderData.order_date,
            status: orderData.status,
        });
        const orderLinesData = await this.app("order_line").where("order_line.order_id", order.id);
        for (const line of orderLinesData) {
            let data = {
                id: line.product_id,
                price: parseFloat(line.total),
                quantity: line.quantity,
            } as AddLineProps;
            if (line.fare) {
                data.hasFare = true;
                data.fare = parseFloat(line.fare);
            }
            order.addLine(data);
        }
        return order;
    }
    async close() {
        await this.app.destroy();
    }
}

// testing insert in database

// const KX = new OrderRepositoryKnex();
// const order = new Order("202300000001", new Date("2023-06-23"));

// order.addCoupon("VALE20", 20, new Date("2023-07-23"));
// order.addLine({ price: 1000, quantity: 2, fare: 10, hasFare: true });
// order.addLine({ price: 200, quantity: 2 });
// order.addLine({ price: 11, quantity: 23 });
// order.setFreight(1000);

// async function SAVE() {
//     try {
//         await KX.persiste(order);
//         const item = await KX.get(order.document);
//         console.log(item);
//     } catch (error) {
//         console.log(error);
//     } finally {
//         await KX.close();
//     }
// }

// SAVE();
