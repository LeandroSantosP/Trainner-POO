import { RentalService } from "@/application/services/RentalService";
import { Car } from "@/domain/Car";
import { FakeClock } from "@/domain/FakeClock";
import { CarRepositoryMemory } from "@/infra/repository/CarRepositoryMemory.ts";
import { CarRentRepositoryMemory } from "@/infra/repository/RentRepositoryMemory";

test("Deve ser possível alugar um carro", async function () {
    const clock = new FakeClock();
<<<<<<< HEAD:Node-Template/test/CarRent.test.ts
    clock.setCurrentDate(new Date("2023-05-23T10:00:00"));
    const rentRepository = new RentRepositoryMemory();
=======
    clock.setCurrentTime(new Date("2023-05-23T10:00:00"));
    const rentRepository = new CarRentRepositoryMemory();
>>>>>>> f0c9cf62915a9f0dfe7d3b9bec03f0edd8699a3b:Rental/test/integration/CarRent.test.ts
    const carRepository = new CarRepositoryMemory();
    await carRepository.save(new Car("AAA-3344", "available"));
    const carRent = new RentalService(clock, rentRepository, carRepository);
    const input = {
        client_id: "111222333",
        plate: "AAA-3344",
        return_rental_date: new Date("2023-06-21T10:00:00"),
    };
    await carRent.rent(input);

    const output = await carRent.getRental("111222333");

    expect(output.status).toBe("open");
    expect(output.car_plate).toBe("AAA-3344");
    expect(output.rental_date_end).toBeUndefined();
    expect(output.rental_return_date).toEqual(new Date("2023-06-21T10:00:00"));
    expect(output.rentalPeriod).toBe(29);
    expect(output.currentPrice).toBe(6960);
});
