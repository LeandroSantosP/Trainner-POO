import { Loan } from "../entities/Loan";
import { LoanPrice } from "../entities/LoanPrice";
import { LoanSac } from "../entities/LoanSac";

export class LoanFactory {
    static createLoan(params: LoanFactoryInput): Loan {
        const price = LoanPrice.create(params);
        const sac = LoanSac.create(params);
        const loan = {
            price,
            sac,
        } as { [key: string]: Loan };
        if (!loan[params.tableType]) throw new Error("Invalid loan table!");
        return loan[params.tableType];
    }
}

type LoanFactoryInput = {
    code: string;
    purchaseTotalPrice: number;
    downPayment: number;
    salary: number;
    period: number;
    tableType: string;
};
