import { PaymentGateway } from "@/application/interfaces/PaymentGateway";
import { CarRentRepository } from "@/application/repository/CarRentRepository";
import { CarRepository } from "@/application/repository/CarRepository";
import { RentalService } from "@/application/services/RentalService";
import { TransactionService } from "@/application/services/TransactionService";
import { Car } from "@/domain/Car";
import { FakeClock } from "@/domain/FakeClock";
import { Transaction } from "@/domain/Transition";
import { CarRepositoryMemory } from "@/infra/repository/CarRepositoryMemory.ts";
import { CarRentRepositoryMemory } from "@/infra/repository/RentRepositoryMemory";

let clock: FakeClock;
let carRentRepository: CarRentRepository;
let carRepository: CarRepository;
let rentalCar: RentalService;
let transactionService: TransactionService;

const paymentGateway: PaymentGateway = {
    async pay(input: { amount: number; token: string }): Promise<{ status: string; tid: string }> {
        return {
            status: "paid",
            tid: "123456789",
        };
    },
};

const transactionRepository = {
    transactions: [] as Transaction[],
    async persiste(transaction: Transaction): Promise<void> {
        this.transactions.push(transaction);
    },
    async get(transactionId: string): Promise<Transaction> {
        throw new Error("Function not implemented.");
    },
};

beforeEach(async () => {
    clock = new FakeClock();
    clock.setCurrentTime(new Date("2023-05-23T10:00:00"));
    carRentRepository = new CarRentRepositoryMemory();
    carRepository = new CarRepositoryMemory();

    transactionService = new TransactionService(transactionRepository);
    rentalCar = new RentalService(paymentGateway, clock, carRentRepository, carRepository, transactionService);
});
test("Deve ser possível alugar um carro", async function () {
    clock.setCurrentTime(new Date("2023-05-23T10:00:00"));
    await carRepository.save(new Car("AAA-3344", "available"));
    const input = {
        client_id: "111222333",
        plate: "AAA-3344",
        return_rental_date: new Date("2023-06-21T10:00:00"),
    };

    await rentalCar.rent(input);

    const output = await rentalCar.getRental("111222333");

    expect(output.status).toBe("waiting_payment");
    expect(output.car_plate).toBe("AAA-3344");
    expect(output.rental_date_end).toBeUndefined();
    expect(output.rental_return_date).toEqual(new Date("2023-06-21T10:00:00"));
    expect(output.rentalPeriod).toBe(29);
    expect(output.currentPrice).toBe(6960);
});

test("Deve ser possível alugar um carro e confirmar um pedido.", async function () {
    clock.setCurrentTime(new Date("2023-05-23T10:00:00"));
    await carRepository.save(new Car("AAA-3344", "available"));
    const input = {
        client_id: "111222333",
        plate: "AAA-3344",
        return_rental_date: new Date("2023-06-21T10:00:00"),
    };

    await rentalCar.rent(input);

    const paymentRentalCar = {
        paymentToken: "123456789",
        carPlate: "AAA-3344",
    };

    await rentalCar.paymentRental(paymentRentalCar);
    const output = await rentalCar.getRental("111222333");
    expect(output.status).toBe("payment_aprove");
});

test("Deve Lançar um erro casso o carro nao esteja disponível", async () => {
    const clock = new FakeClock();
    clock.setCurrentTime(new Date("2023-05-23T10:00:00"));
    await carRepository.save(new Car("AAA-3341", "unavailable"));
    const input = {
        client_id: "111222333",
        plate: "AAA-3341",
        return_rental_date: new Date("2023-06-21T10:00:00"),
    };

    await expect(rentalCar.rent(input)).rejects.toThrow(new Error("Car is not available"));
});
