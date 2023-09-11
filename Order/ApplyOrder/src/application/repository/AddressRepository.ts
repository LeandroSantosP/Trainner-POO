import { Address } from "@/domain/entity/Address";

export interface AddressRepository {
    getByDocument(document: string): Promise<Address>;
    save(address: Address): Promise<void>;
}
