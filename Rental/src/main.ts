import { Elysia } from "elysia";
import { RentalService } from "./application/services/RentalService";
import { PaymentGatewayFake } from "./infra/gateway/PaymentGatewayFake";
import { FakeClock } from "./domain/FakeClock";
import { CarRentRepositoryMemory } from "./infra/repository/RentRepositoryMemory";
import { CarRepositoryMemory } from "./infra/repository/CarRepositoryMemory.ts";
import { TransactionService } from "./application/services/TransactionService";
import { TransactionRepositoryMemory } from "./infra/repository/TransactionRepositoryMemory";
import { RestController } from "./infra/controller/RestController";
import { ElysiaHttpServer } from "./infra/http/ElysiaHttpServer";

const app = new Elysia();

const paymentGateway = new PaymentGatewayFake();
const clock = new FakeClock();
const rentalRepository = new CarRentRepositoryMemory();
const carRepository = new CarRepositoryMemory();
const transactionRepository = new TransactionRepositoryMemory();
const transactionService = new TransactionService(transactionRepository);

const rentalCarService = new RentalService(paymentGateway, clock, rentalRepository, carRepository, transactionService);

async function main() {
    const httpServer = new ElysiaHttpServer();
    new RestController(httpServer, rentalCarService);
    httpServer.listen(3000, (message: string) => console.log(message));
}

main();
