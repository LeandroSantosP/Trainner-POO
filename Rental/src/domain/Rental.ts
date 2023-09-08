import { Clock } from "@/application/interfaces/Clock";
import { Period } from "./Period";
import { Price } from "./Price";

export abstract class Rental {
    private status: string;
    readonly period: Period;
    abstract fereRentalInHors: number;

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
