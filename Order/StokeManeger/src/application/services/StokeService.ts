import { StokeEntryCalculator } from "@/domain/StokeEntryCalculator";
import { StokeEntryRepository } from "../repository/StokeEntryRepository";
import { StokeEntry } from "@/domain/entity/StokeEntry";
import { Stoke } from "@/domain/entity/Stoke";

export class StokeService {
    constructor(private readonly stokeRepository: StokeEntryRepository) {}

    async calculateStoke(productId: string): Promise<CalculateStokeOutput> {
        const stokeEntries = await this.stokeRepository.getAllByProductId(productId);
        const total = StokeEntryCalculator.execute(stokeEntries);
        return {
            total,
        };
    }

    async increaseStoke(input: EntriesInput): Promise<void> {
        for (const entry of input.items) {
            await this.stokeRepository.save(new StokeEntry(entry.productId, "in", entry.quantity));
        }
    }
    async decreaseStoke(input: EntriesInput) {
        for (const entry of input.items) {
            await this.stokeRepository.save(new StokeEntry(entry.productId, "out", entry.quantity));
            const stokeEntries = await this.stokeRepository.getAllByProductId(entry.productId);
            const stoke = new Stoke();
            for (const stokeEntry of stokeEntries) {
                stoke.addStokeEntry(new StokeEntry(stokeEntry.productId, stokeEntry.operation, stokeEntry.quantity));
            }
            // stoke.getQuantity();
        }
    }
}

type CalculateStokeOutput = {
    total: number;
};

type EntriesInput = {
    items: Array<{ productId: string; quantity: number }>;
};
