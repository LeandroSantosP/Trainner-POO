import dot from "dotenv";

import { MailerService } from "./application/services/MailerService";
import { MessageRepositoryMemory } from "@/infra/repository/MessageRepositoryMemory";
import { QueueController } from "./infra/queue/QueueController";
import { RabbitMqAdapter } from "@/infra/queue/RabbitMqAdapter";
import { BullMqBackgroundJob } from "./infra/backgroundJobs/BullMqBackgroundJob";
import { RedisConnection } from "./infra/backgroundJobs/RedisConnection";
import { NodeMailerAdapter } from "./infra/gateways/NodeMailerAdapter";
import { MailerGatewayJobHandler } from "./application/jobsHandlers/MailerGatewayJobHandler";
dot.config();

async function init() {
    const queue = new RabbitMqAdapter();
    await queue.connect();
    const jobQueue = new BullMqBackgroundJob(
        new RedisConnection("127.0.0.1", 6379, "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81")
    );

    const messageRepository = MessageRepositoryMemory.getInstance();
    const mailerGateway = new NodeMailerAdapter();
    const mailerHandler = new MailerGatewayJobHandler(mailerGateway, messageRepository, queue);
    jobQueue.addJobs(mailerHandler);
    const mailerService = new MailerService(jobQueue, messageRepository);

    new QueueController(queue, mailerService);
    console.log("Mailer On");
}
init();
