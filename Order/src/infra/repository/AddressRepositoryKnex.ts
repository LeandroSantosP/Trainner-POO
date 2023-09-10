import { AddressRepository } from "@/application/repository/AddressRepository";
import { Address } from "@/domain/entity/Address";
import { Knex } from "knex";
import knexConnection from "../database/knexfile";

export class AddressRepositoryKnex implements AddressRepository {
    app: Knex;
    constructor() {
        this.app = knexConnection;
    }
    async getByDocument(document: string): Promise<Address> {
        throw new Error("Method not implemented.");
    }
    async save(address: Address): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
