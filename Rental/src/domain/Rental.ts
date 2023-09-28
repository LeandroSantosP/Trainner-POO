import { Clock } from "@/application/interfaces/Clock";
import { Period } from "./Period";
import { Status } from "./Status";

export abstract class Rental {
    readonly period: Period;
    abstract fereRentalInHors: number;
    abstract status: Status;

    constructor(private readonly id: string, readonly rentalReturnDate: Date, protected readonly clock: Clock) {
        const currentDate = clock.getCurrentTime();
        if (rentalReturnDate.getTime() < currentDate.getTime()) {
            throw new Error("Invalid Rental Date!");
        }
        this.period = this.calculatePeriod(rentalReturnDate, currentDate);
    }

    protected calculatePeriod(start: Date, end: Date) {
        return new Period(start, end);
    }

    getStatus() {
        return this.status.getValue();
    }
}
