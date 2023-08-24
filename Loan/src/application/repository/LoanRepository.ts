import { Loan } from "@/domain/entities/Loan";

export interface LoanRepository {
    save(loan: Loan): Promise<void>;
    getByCode(code: string): Promise<Loan>;
}
