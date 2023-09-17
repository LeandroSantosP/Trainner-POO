import { AppError } from "./AppError";

export class StokeEntry {
    constructor(readonly productId: string, readonly operation: "in" | "out", readonly quantity: number) {
        if (quantity < 0) throw new AppError("Invalid quantity");
    }
}
