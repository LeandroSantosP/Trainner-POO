import { CarRepository } from "@/application/repository/CarRepository";

export class CarRepositoryMemory implements CarRepository {
    cars: any[] = [];

    async save(rent: any): Promise<void> {
        this.cars.push(rent);
    }
    async get(car_plate: string): Promise<any> {
        const Car = this.cars.find((Car) => Car.getPlate() === car_plate);
        if (!Car) throw new Error("Car not found");
        return Car;
    }
}
