import { OrderService } from "@/application";
import { Queue } from "./Queue";

export class QueueController {
    constructor(queue: Queue, orderService: OrderService) {
        queue.on("OrderApply", async function (input: any) {
            await orderService.applyOrder(input);
        });
    }
}
