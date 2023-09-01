import { Car } from "@/domain/Car";

export interface CarRepository {
    save(car: Car): Promise<any>;
    get(plate: string): Promise<Car>;
}
