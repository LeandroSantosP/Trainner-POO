import { StokeEntryCalculator } from "../StokeEntryCalculator";
import { AppError } from "./AppError";
import { StokeEntry } from "./StokeEntry";

export class Stoke {
    stokeEntries: StokeEntry[];
    constructor() {
        this.stokeEntries = [];
    }

    addStokeEntry(stokeEntry: StokeEntry) {
        if (!this.stokeEntries.every((i) => i.productId === stokeEntry.productId)) {
            throw new Error("Invalid StokeEntry");
        }
        this.stokeEntries.push(stokeEntry);
    }

    getQuantity() {
        return StokeEntryCalculator.execute(this.stokeEntries);
    }
}
