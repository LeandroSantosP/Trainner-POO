import { StokeEntry } from "@/domain/entity/StokeEntry";

export interface StokeEntryRepository {
    save(stokeEntry: StokeEntry): Promise<void>;
    getAllByProductId(productId: string): Promise<StokeEntry[]>;
    clean(): Promise<void>;
}
