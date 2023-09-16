import dovEnv from "dotenv";
import { RabbitMqAdapter } from "./infra/queue/RabbitMqAdapter";
import { ExpressServerAdapter } from "./infra/http/ExpressServerAdapter";
import { RestController } from "./infra/controller/RestController";
import { OrderService } from "./application";
import { OrderServiceFactoryDatabase } from "./infra/factory/OrderServiceFactoryDatabase";
import { FakeClock } from "./domain/domainServices/FakeClock";
import { ProductGateway } from "./infra/gateways/ProductGateWay";
import { AxiosHttpClient } from "./infra/httpClient/AxiosHttpClient";
import { QueueController } from "./infra/queue/QueueController";

dovEnv.config();

async function main() {
    const queue = new RabbitMqAdapter();
    await queue.connect();
    const httpServer = new ExpressServerAdapter();
    const httpClient = new AxiosHttpClient();
    const clock = new FakeClock();
    const orderServiceFactory = new OrderServiceFactoryDatabase();
    const productGateway = new ProductGateway(httpClient);
    const orderService = new OrderService(orderServiceFactory, productGateway, clock, queue);
    new QueueController(queue, orderService);
    new RestController(httpServer, orderService, queue);
    await httpServer.listen(3002, console.log("Serve is running on port 3002"));
}

main();
