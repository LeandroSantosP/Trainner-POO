import { CarRepository } from "@/application/repository/CarRepository";
import { Car } from "@/domain/Car";

export class CarRepositoryMemory implements CarRepository {
    cars: Car[] = [new Car("AAA-3344", "available")];

    async save(rent: Car): Promise<void> {
        this.cars.push(rent);
    }
    async get(car_plate: string): Promise<Car> {
        const Car = this.cars.find((Car) => Car.plate === car_plate);
        if (!Car) throw new Error("Car not found");
        return Car;
    }
}
