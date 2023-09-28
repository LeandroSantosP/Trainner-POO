import { CarRental } from "@/domain/CarRental";
import { Clock } from "../interfaces/Clock";
import { CarRepository } from "../repository/CarRepository";
import { CarRentRepository } from "../repository/CarRentRepository";
import { GetRentalOutput, RentInput } from "./CarServiceTypes";

export class RentalService {
    constructor(
        readonly clock: Clock,
        readonly rentRepository: CarRentRepository,
        readonly carRepository: CarRepository
    ) {}

    async rent(input: RentInput) {
        const car = await this.carRepository.get(input.plate);

        const carRental = CarRental.create({
            carPlate: car.plate,
            clientId: input.client_id,
            clock: this.clock,
            carStatus: car.status,
            rentalReturnDate: input.return_rental_date,
        });
        // calculate payment

        await this.rentRepository.persiste(carRental);
    }

    async getRental(client_id: string): Promise<GetRentalOutput> {
        const rental = await this.rentRepository.getByClientId(client_id);
        return {
            car_plate: rental.getPlate(),
            rental_date_end: undefined,
            rental_return_date: rental.rentalReturnDate,
            status: rental.getStatus(),
            rentalPeriod: rental.period.getInDays(),
            currentPrice: rental.getPrice(),
        };
    }
}
