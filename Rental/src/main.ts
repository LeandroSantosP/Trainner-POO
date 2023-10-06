import { Elysia } from "elysia";
import { RentalService } from "./application/services/RentalService";
import { PaymentGatewayFake } from "./infra/gateway/PaymentGatewayFake";
import { FakeClock } from "./domain/FakeClock";
import { CarRentRepositoryMemory } from "./infra/repository/RentRepositoryMemory";
import { CarRepositoryMemory } from "./infra/repository/CarRepositoryMemory.ts";
import { TransactionService } from "./application/services/TransactionService";
import { TransactionRepositoryMemory } from "./infra/repository/TransactionRepositoryMemory";

const app = new Elysia();

const paymentGateway = new PaymentGatewayFake();
const clock = new FakeClock();
const rentalRepository = new CarRentRepositoryMemory();
const carRepository = new CarRepositoryMemory();
const transactionRepository = new TransactionRepositoryMemory();
const transactionService = new TransactionService(transactionRepository);

const rentalCarService = new RentalService(paymentGateway, clock, rentalRepository, carRepository, transactionService);

async function main() {
    app.post("/rentals", async (cpx) => {
        try {
            await rentalCarService.rent(cpx.body as any);
            cpx.set.status = 201;
            return;
        } catch (error: any) {
            cpx.set.status = 500;
            console.log(error);
            return {
                message: "Internal server error.",
                error: error.message,
            };
        }
    });
    app.get("/rental/:id", async (cpx) => {
        try {
            const output = await rentalCarService.getRental(cpx.params.id);
            cpx.set.status = 201;
            return output;
        } catch (error: any) {
            cpx.set.status = 500;
            console.log(error);
            return {
                message: "Internal server error.",
                error: error.message,
            };
        }
    });
    app.listen(3000, ({ hostname, port }) => {
        console.log(`Running at http://${hostname}:${port}`);
    });
}

main();
