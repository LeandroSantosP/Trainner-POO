import { AppError } from "./entity/AppError";
import { StokeEntry } from "./entity/StokeEntry";

export class StokeEntryCalculator {
    static execute(products: StokeEntry[]) {
        let quantity = 0;

        for (const product of products) {
            if (product.operation === "in") {
                quantity += product.quantity;
            }
            if (product.operation === "out") {
                quantity -= product.quantity;
            }
        }
        if (quantity < 0) throw new AppError("It's not possible decrease a negative quantity of stoke.");
        return quantity;
    }
}
