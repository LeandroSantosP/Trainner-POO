export interface RentRepository {
    persiste(rent: any): Promise<void>;
    get(rent_id: string): Promise<any>;
}
