import { InstallmentRepository } from "@/application/repository/InstallmentRepository";
import { Installment } from "@/domain/entities/Installment";

export class InstallmentRepositoryMemory implements InstallmentRepository {
    installments: Installment[];
    constructor() {
        this.installments = [];
    }
    async save(installment: Installment): Promise<void> {
        this.installments.push(installment);
    }
    async getById(id: string): Promise<Installment> {
        const installment = this.installments.find((instalment) => instalment.id === id);
        if (!installment) throw new Error("Installment not found");
        return installment;
    }
}
