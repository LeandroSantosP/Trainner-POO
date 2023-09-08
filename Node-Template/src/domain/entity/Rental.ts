import { Clock } from "@/application/interfaces/Clock";
import { randomUUID } from "crypto";

type RentalInput = {
    id?: string;
    carPlate: string;
    return_date: Date;
    end_date: Date;
    clock: Clock;
    car_status: string;
};

export class Rental {
    private Min_Rental_Hors = 24;
    private status: string;

    private constructor(
        private id: string,
        private carPlate: string,
        private return_date: Date,
        private clock: Clock,
        private car_status: string
    ) {
        this.status = "open";

        const currentDate = clock.getCurrentTime();

        if (return_date.getTime() < currentDate.getTime()) {
            throw new Error("Invalid Rental Date!");
        }
        if (car_status === "ranted") throw new Error("Car already ranted!");
        const rentalPeriodInHors = ((return_date.getTime() - currentDate.getTime()) / 1000) * 60 * 60;

        if (rentalPeriodInHors < this.Min_Rental_Hors) {
            throw new Error("Rental Is required to be greater than 24 hors.");
        }
    }

    static create(input: RentalInput) {
        return new Rental(input.id ?? randomUUID(), input.carPlate, input.return_date, input.clock, input.car_status);
    }

    getStatus() {
        return this.status;
    }
}
