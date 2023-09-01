import { RentRepository } from "@/application/repository/RentRepository";

export class RentRepositoryMemory implements RentRepository {
    rentals: any[] = [];

    async persiste(rent: any): Promise<void> {
        this.rentals.push(rent);
    }
    async get(car_plate: string): Promise<any> {
        const rental = this.rentals.find((rental) => rental.getPlate() === car_plate);
        if (!rental) throw new Error("Rental not found");
        return rental;
    }
}
