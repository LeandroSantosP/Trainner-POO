import { Clock } from "@/application/interfaces/Clock";
import { Rental } from "./Rental";
import { randomUUID } from "crypto";
import { Price } from "./Price";
import { CarStatus } from "./CarStatus";

export class CarRental extends Rental {
    readonly status: CarStatus;
    private priceForHors = 10;
    private price: Price;

    private constructor(
        id: string,
        rentalReturnDate: Date,
        readonly clientId: string,
        private readonly carPlate: string,
        readonly fereRentalInHors: number,
        readonly carStatus: string,
        clock: Clock
    ) {
        super(id, rentalReturnDate, clock);
        const predictPrice = this.period.getInHors();
        this.status = new CarStatus();
        if (carStatus !== "available") throw new Error("Car is not available");
        const inicialPrice = this.priceForHors * predictPrice;
        this.price = new Price(inicialPrice);
    }

    static create(input: Input) {
        const id = input.id ?? randomUUID();
        const fereRentalInHors = input.fereRentalInHors ?? 10;
        return new CarRental(
            id,
            input.rentalReturnDate,
            input.clientId,
            input.carPlate,
            fereRentalInHors,
            input.carStatus,
            input.clock
        );
    }

    finishedRent(): { totalPrice: number; penaltyFare: number } {
        let totalPrice = 0;
        let PENALTY = 0;
        const periodRecived = this.calculatePeriod(this.clock.getCurrentTime(), this.rentalReturnDate);
        if (periodRecived.getInHors() <= 0) {
            totalPrice = this.price.getValue();
        }

        if (periodRecived.getInHors() > 0) {
            let PENALTY_FOR_HORS = 15;
            let subtotal_penalty = PENALTY_FOR_HORS * periodRecived.getInHors();
            totalPrice = this.price.getValue() + subtotal_penalty;
            PENALTY = subtotal_penalty;
        }

        return {
            totalPrice,
            penaltyFare: PENALTY,
        };
    }

    updateStatus(): Omit<CarStatus, "getValue"> {
        return this.status;
    }

    getPrice() {
        return this.price.getValue();
    }

    getPlate() {
        return this.carPlate;
    }
}

type Input = {
    id?: string;
    rentalReturnDate: Date;
    carStatus: string;
    clientId: string;
    carPlate: string;
    fereRentalInHors?: number;
    clock: Clock;
};
