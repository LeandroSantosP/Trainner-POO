import { CarRentRepository } from "@/application/repository/CarRentRepository";
import { CarRental } from "@/domain/CarRental";

export class CarRentRepositoryMemory implements CarRentRepository {
    rentals: CarRental[] = [];

    async persiste(rent: CarRental): Promise<void> {
        this.rentals.push(rent);
    }
    async get(car_plate: string): Promise<CarRental> {
        const rental = this.rentals.find((rental) => rental.getPlate() === car_plate);
        if (!rental) throw new Error("Rental not found");
        return rental;
    }
    async getByClientId(client_id: string): Promise<CarRental> {
        const rental = this.rentals.find((rental) => rental.clientId === client_id);
        if (!rental) throw new Error("Rental not found");
        return rental;
    }

    async update(carRentUpdate: CarRental): Promise<void> {
        const carRentalIndex = this.rentals.findIndex((rental) => rental.id === carRentUpdate.id);
        if (carRentalIndex === -1) throw new Error("CarRental not found");
        this.rentals.splice(carRentalIndex, 1, carRentUpdate);
    }
}
