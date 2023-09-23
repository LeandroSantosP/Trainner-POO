import { Queue } from "./Queue";
import { MailerService } from "@/application/services/MailerService";

export class QueueController {
    constructor(queue: Queue, mailerService: MailerService) {
        queue.on("OrderApplied", async function (input: any) {
            mailerService.send(input);
        });
    }
}
