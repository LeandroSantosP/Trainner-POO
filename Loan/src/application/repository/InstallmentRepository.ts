import { Installment } from "@/domain/entities/Installment";

export interface InstallmentRepository {
    save(installment: Installment): Promise<void>;
    getById(id: string): Promise<Installment>;
}
