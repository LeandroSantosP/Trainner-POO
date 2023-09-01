import { Clock } from "@/application/interfaces/Clock";
import { Rental } from "./Rental";
import { randomUUID } from "crypto";

export class CarRental extends Rental {
    minRentalHors = 24;
    private constructor(
        id: string,
        rentalReturnDate: Date,
        clientId: string,
        private readonly carPlate: string,
        private readonly carStatus: string,
        clock: Clock
    ) {
        super(id, rentalReturnDate, clientId, clock);
        if (carStatus === "ranted") throw new Error("Car already ranted!");
        if (this.period.getInHors() < this.minRentalHors) {
            throw new Error("Rental Is required to be greater than 24 hors.");
        }
    }

    static create(input: Input) {
        const id = input.id ?? randomUUID();
        return new CarRental(id, input.rentalReturnDate, input.clientId, input.carPlate, input.carStatus, input.clock);
    }
}

type Input = {
    id?: string;
    rentalReturnDate: Date;
    clientId: string;
    carPlate: string;
    carStatus: string;
    clock: Clock;
};
