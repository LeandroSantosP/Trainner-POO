import { Queue } from "./Queue";
import amqp, { Connection } from "amqplib";

export class RabbitMqAdapter implements Queue {
    private connection!: Connection;

    async connect(): Promise<void> {
        this.connection = await amqp.connect("amqp://admin:1234@localhost:5672");
    }
    async publisher<T>(queueName: string, data: T): Promise<void> {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    }
    async on(queueName: string, callback: Function): Promise<void> {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });

        await channel.consume(queueName, async function (message) {
            if (!message) {
                console.log("Invalid params");
                return;
            }
            try {
                const input = await JSON.parse(message.content.toString());
                await callback(input);
                channel.ack(message);
            } catch (error) {
                console.log(error);
                console.log("Fail");
            }
        });
    }
    async close(): Promise<void> {
        await this.connection.close();
    }
}
