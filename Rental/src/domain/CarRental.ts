import { Clock } from "@/application/interfaces/Clock";
import { Rental } from "./Rental";
import { randomUUID } from "crypto";
import { Price } from "./Price";

export class CarRental extends Rental {
    private priceForHors = 10;
    private price: Price;
    private constructor(
        id: string,
        rentalReturnDate: Date,
        readonly clientId: string,
        private readonly carPlate: string,
        private readonly carStatus: string,
        readonly fereRentalInHors: number,
        clock: Clock
    ) {
        super(id, rentalReturnDate, clock);

        if (carStatus !== "available") throw new Error("Car not available!");
        const predictPrice = this.period.getInHors();
        if (predictPrice < fereRentalInHors) {
            throw new Error("Rental Is required to be greater than 24 hors.");
        }
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
            input.carStatus,
            fereRentalInHors,
            input.clock
        );
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
    clientId: string;
    carPlate: string;
    carStatus: string;
    fereRentalInHors?: number;
    clock: Clock;
};
