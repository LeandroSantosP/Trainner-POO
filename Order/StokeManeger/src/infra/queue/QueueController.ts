import { StokeService } from "@/application/services/StokeService";
import { Queue } from "./Queue";

export class QueueController {
    constructor(queue: Queue, stokeService: StokeService) {
        queue.on("OrderApplied", async function (input: any) {
            await stokeService.decreaseStoke(input);
        });
    }
}
