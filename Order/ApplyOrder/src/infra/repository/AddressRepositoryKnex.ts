import { AddressRepository } from "@/application/repository/AddressRepository";
import { Address } from "@/domain/entity/Address";
import { Knex } from "knex";
import knexConnection from "../database/knexfile";
import { AppError } from "@/domain/entity/AppError";

export class AddressRepositoryKnex implements AddressRepository {
    app: Knex;
    constructor() {
        this.app = knexConnection;
    }
    async getByDocument(document: string): Promise<Address> {
        const [addressData] = await this.app("address").where({ document });
        if (!addressData) throw new AppError("Address not found");
        return new Address(
            addressData.document,
            addressData.street,
            addressData.city,
            addressData.neighborhood,
            addressData.latitude,
            addressData.longitude
        );
    }
    async save(address: Address): Promise<void> {
        await this.app("address").insert({
            document: address.document,
            street: address.street,
            city: address.city,
            neighborhood: address.neighborhood,
            latitude: address.cord.lat,
            longitude: address.cord.long,
        });
    }
}
