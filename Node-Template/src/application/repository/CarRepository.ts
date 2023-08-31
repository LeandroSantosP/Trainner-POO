export interface CarRepository {
    save(car: any): Promise<any>;
    get(plate: string): Promise<any>;
}
