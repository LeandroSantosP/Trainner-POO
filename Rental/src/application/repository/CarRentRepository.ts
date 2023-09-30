import { CarRental } from "@/domain/CarRental";

export interface CarRentRepository {
    persiste(rent: CarRental): Promise<void>;
    get(rent_id: string): Promise<CarRental>;
    getByClientId(client_id: string): Promise<CarRental>;
    update(carRent: CarRental): Promise<void>;
}
