import dot from "dotenv";

import { StokeService } from "./application/services/StokeService";
import { StokeEntryRepositoryKnex } from "@/infra/repository/StokeEntryRepository";
import { QueueController } from "./infra/queue/QueueController";
import { RabbitMqAdapter } from "@/infra/queue/RabbitMqAdapter";
dot.config();

async function init() {
    const stokeEntryRepository = new StokeEntryRepositoryKnex();
    const stokeService = new StokeService(stokeEntryRepository);
    const queue = new RabbitMqAdapter();
    await queue.connect();
    new QueueController(queue, stokeService);
    console.log("Stoke On");
}
init();
