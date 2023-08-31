import { Clock } from "../interfaces/Clock";
import { CarRepository } from "../repository/CarRepository";
import { RentRepository } from "../repository/RentRepository";
import { GetRentalOutput, RentInput } from "./CarServiceTypes";

export class RentalService {
    constructor(
        readonly clock: Clock,
        readonly rentRepository: RentRepository,
        readonly carRepository: CarRepository
    ) {}

    async rent(input: RentInput) {
        const currentDate = this.clock.getCurrentTime();
        const car = await this.carRepository.get(input.plate);

        if (input.return_rental_date.getTime() < currentDate.getTime()) {
            throw new Error("Invalid Rental Date!");
        }
        if (car.status === "ranted") throw new Error("Car already ranted!");

        const rentalPeriodInHors = ((input.return_rental_date.getTime() - currentDate.getTime()) / 1000) * 60 * 60;
        console.log(rentalPeriodInHors);

        const minRentalHors = 24;

        if (rentalPeriodInHors < minRentalHors) {
            throw new Error("Rental Is required to be greater than 24 hors.");
        }
    }

    async getRental(client_id: string): Promise<GetRentalOutput> {
        return {
            car_plate: "",
            rental_date_end: undefined,
            rental_date_start: new Date("2023-06-23T10:00:00"),
            status: "",
        };
    }
}
