import { AddressRepository } from "@/application/repository/AddressRepository";
import { Address } from "@/domain/entity/Address";
import { AppError } from "@/domain/entity/AppError";

export class AddressRepositoryMemory implements AddressRepository {
    address: Address[] = [];

    static instance: AddressRepositoryMemory;

    static getInstance() {
        if (!AddressRepositoryMemory.instance) {
            AddressRepositoryMemory.instance = new AddressRepositoryMemory();
        }
        return AddressRepositoryMemory.instance;
    }
    async getByDocument(document: string): Promise<Address> {
        const address = this.address.find((add) => add.document === document);
        if (!address) throw new AppError("Address not found");
        return address;
    }
    async save(address: Address): Promise<void> {
        this.address.push(address);
    }
}
