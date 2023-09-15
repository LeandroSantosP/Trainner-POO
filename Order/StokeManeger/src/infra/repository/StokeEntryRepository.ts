import { StokeEntryRepository } from "@/application/repository/StokeEntryRepository";
import knexConnection from "../database/knexfile";
import { Knex } from "knex";
import { StokeEntry } from "@/domain/entity/StokeEntry";
import { randomUUID } from "crypto";
export class StokeEntryRepositoryKnex implements StokeEntryRepository {
    private connection: Knex;
    constructor() {
        this.connection = knexConnection;
    }

    async save(stokeEntry: StokeEntry): Promise<void> {
        await this.connection("stokeEntry").insert({
            id: randomUUID(),
            productId: stokeEntry.productId,
            operation: stokeEntry.operation,
            quantity: stokeEntry.quantity,
        });
    }

    async getAllByProductId(productId: string): Promise<StokeEntry[]> {
        const stokeEntriesData = await this.connection("stokeEntry").where("productId", productId);
        const stokeEntries: StokeEntry[] = [];
        for (const stokeEntryData of stokeEntriesData) {
            stokeEntries.push(
                new StokeEntry(stokeEntryData.productId, stokeEntryData.operation, stokeEntryData.quantity)
            );
        }
        return stokeEntries;
    }
    async clean(): Promise<void> {
        await this.connection("stokeEntry").delete();
    }
}
