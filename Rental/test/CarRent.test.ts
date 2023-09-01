import { RentalService } from "@/application/services/RentalService";
import { FakeClock } from "@/domain/FakeClock";
import { CarRepositoryMemory } from "@/infra/repository/CarRepositoryMemory.ts";
import { RentRepositoryMemory } from "@/infra/repository/RentRepositoryMemory";

test("Deve ser possível alugar um carro", async function () {
    const clock = new FakeClock(new Date("2023-05-23T10:00:00"));
    clock.setDate()
    const rentRepository = new RentRepositoryMemory();
    const carRepository = new CarRepositoryMemory();
    const carRent = new RentalService(clock, rentRepository, carRepository);
    const input = {
        client_id: "111222333",
        plate: "AAA-3344",
        return_rental_date: new Date("2023-06-23T10:00:00"),
    };
    await carRent.rent(input);

    const output = await carRent.getRental("111222333");

    expect(output.status).toBe("open");
    expect(output.car_plate).toBe("AAA-3344");
    expect(output.rental_date_end).toBeUndefined();
    expect(output.rental_date_start).toBe(new Date("2023-06-23T10:00:00"));
});
