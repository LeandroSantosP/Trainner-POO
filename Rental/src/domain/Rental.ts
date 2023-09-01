import { Clock } from "@/application/interfaces/Clock";
import { Period } from "./Period";

export abstract class Rental {
    private status: string;
    readonly period: Period;
    abstract minRentalHors: number;
    constructor(private readonly id: string, readonly rentalReturnDate: Date, private readonly clock: Clock) {
        const currentDate = clock.getCurrentTime();
        if (rentalReturnDate.getTime() < currentDate.getTime()) {
            throw new Error("Invalid Rental Date!");
        }
        this.period = new Period(rentalReturnDate, currentDate);

        this.status = "open";
    }

    getStatus() {
        return this.status;
    }
}
