import { OrderService } from "@/application";
import { httpServer } from "../http/httpServer";
import { Queue } from "../queue/Queue";

export class RestController {
    constructor(httpServer: httpServer, orderService: OrderService, queue: Queue) {
        httpServer.on("post", "/applyOrder", async (body: any, params: any, query: any) => {
            await queue.publisher("OrderApply", body);
        });

        httpServer.on("get", "/getOrder/:document", async (body: any, params: any, query: any) => {
            const input = params.document;
            const output = await orderService.getOrder(input);
            return output;
        });
    }
}
