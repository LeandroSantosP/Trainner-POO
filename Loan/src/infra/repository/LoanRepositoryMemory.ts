import { LoanRepository } from "@/application/repository/LoanRepository";
import { Loan } from "@/domain/entities/Loan";

export class LoanRepositoryMemory implements LoanRepository {
    loans: Loan[];
    constructor() {
        this.loans = [];
    }
    async save(loan: Loan): Promise<void> {
        this.loans.push(loan);
    }
    async getByCode(code: string): Promise<Loan> {
        const loan = this.loans.find((loan) => loan.getCode() === code);
        if (!loan) throw new Error("loan not found");
        return loan;
    }
}
