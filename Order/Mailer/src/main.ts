import dot from "dotenv";

import { MailerService } from "./application/services/MailerService";
import { QueueController } from "./infra/queue/QueueController";
import { RabbitMqAdapter } from "@/infra/queue/RabbitMqAdapter";
import { BullMqBackgroundJob } from "./infra/backgroundJobs/BullMqBackgroundJob";
import { RedisConnection } from "./infra/backgroundJobs/RedisConnection";
import { NodeMailerAdapter } from "./infra/gateways/NodeMailerAdapter";
import { MailerGatewayJobHandler } from "./application/jobsHandlers/MailerGatewayJobHandler";
import { JobsOptions } from "bullmq";
import { MessageRepositoryKnex } from "./infra/repository/MessageRepositoryKnex";
dot.config();

async function init() {
    const queue = new RabbitMqAdapter();
    await queue.connect();
    const jobQueue = new BullMqBackgroundJob(
        new RedisConnection("127.0.0.1", 6379, "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81")
    );

    const messageRepository = new MessageRepositoryKnex();
    const mailerGateway = new NodeMailerAdapter();
    const mailerHandler = new MailerGatewayJobHandler<JobsOptions>(mailerGateway, messageRepository, queue);
    jobQueue.addJobs(mailerHandler);
    const mailerService = new MailerService(jobQueue, messageRepository);

    new QueueController(queue, mailerService);
    jobQueue.process();
    console.log("Mailer On");
}
init();
