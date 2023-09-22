import { MailerGatewayJobHandler } from "@/application/jobsHandlers/MailerGatewayJobHandler";
import { MailerService } from "@/application/services/MailerService";
import { BullMqBackgroundJob } from "@/infra/backgroundJobs/BullMqBackgroundJob";
import { RedisConnection } from "@/infra/backgroundJobs/RedisConnection";
import { NodeMailerAdapter } from "@/infra/gateways/NodeMailerAdapter";
import { MessageRepositoryMemory } from "@/infra/repository/MessageRepositoryMemory";
const messageRepository = MessageRepositoryMemory.getInstance();

const jobQueue = new BullMqBackgroundJob(new RedisConnection("127.0.0.1", 6379, "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81"));
const mailerGateway = new NodeMailerAdapter();
const mailerHandler = new MailerGatewayJobHandler(mailerGateway, messageRepository);
jobQueue.addJobs(mailerHandler);
const mailerService = new MailerService(jobQueue, messageRepository);

async function sleep(timeout: number = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });
}
jobQueue.process();

test("Deve disparar uma message", async function () {
    await mailerService.send({
        body: "Test",
        from: "john.doe@gmail.com",
        to: "test@test.com",
        subject: "Test",
    });
    await sleep(4000);
    const output = await mailerService.getMessagesByEmail("test@test.com");
    expect(output.length).toBe(1);
    expect(output[0].from).toBe("john.doe@gmail.com");
    expect(output[0].to).toBe("test@test.com");
    expect(output[0].body).toBe("Test");
    expect(output[0].subject).toBe("Test");
});
