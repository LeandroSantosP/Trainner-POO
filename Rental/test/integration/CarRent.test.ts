import { Clock } from "@/application/interfaces/Clock";
import { CarRentRepository } from "@/application/repository/CarRentRepository";
import { CarRepository } from "@/application/repository/CarRepository";
import { RentalService } from "@/application/services/RentalService";
import { Car } from "@/domain/Car";
import { FakeClock } from "@/domain/FakeClock";
import { CarRepositoryMemory } from "@/infra/repository/CarRepositoryMemory.ts";
import { CarRentRepositoryMemory } from "@/infra/repository/RentRepositoryMemory";
import { log } from "util";

let clock: FakeClock;
let carRentRepository: CarRentRepository;
let carRepository: CarRepository;
let rentalCar: RentalService;
beforeEach(async () => {
    clock = new FakeClock();
    clock.setCurrentTime(new Date("2023-05-23T10:00:00"));
    carRentRepository = new CarRentRepositoryMemory();
    carRepository = new CarRepositoryMemory();
    rentalCar = new RentalService(clock, carRentRepository, carRepository);
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

    const output = await rentalCar.getRental("111222333");

    expect(output.status).toBe("waiting_payment");
});

test("Deve Lançar um erro casso o carro nao esteja disponível", async () => {
    const clock = new FakeClock();
    clock.setCurrentTime(new Date("2023-05-23T10:00:00"));

    await carRepository.save(new Car("AAA-3344", "unavailable"));
    const input = {
        client_id: "111222333",
        plate: "AAA-3344",
        return_rental_date: new Date("2023-06-21T10:00:00"),
    };

    await expect(rentalCar.rent(input)).rejects.toThrow(new Error("Car is not available"));
});
