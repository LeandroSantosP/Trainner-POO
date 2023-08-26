import { randomUUID } from "crypto";
import { Installment } from "./Installment";
import { Tax } from "./Tax";
import { TransactionCode } from "./TransactionCode";

type TransactionProps = {
    email: string;
    paymentMethod: string;
    installmentsNumber: number;
    amount: number;
    tax: Tax;
    status: string;
    id?: string;
    sequence?: number;
    transaction_date?: Date;
};

export class Transaction {
    private id: string;
    private status: string;
    readonly email: string;
    readonly paymentMethod: string;
    private amount: number;
    private tax: Tax;
    code: TransactionCode;
    installments: Installment[] = [];
    installmentsNumber: number;

    private constructor(props: Required<TransactionProps>) {
        this.id = props.id;
        this.tax = props.tax;
        this.amount = props.amount;
        this.status = props.status;
        this.email = props.email;
        this.paymentMethod = props.paymentMethod;
        this.installmentsNumber = props.installmentsNumber;
        this.code = new TransactionCode(props.email, props.sequence, props.transaction_date);

        if (this.paymentMethod === "boleto" && props.installmentsNumber !== 1) {
            throw new Error("Boleto must be only one instalment!");
        }

        this.generatorInstallments();
    }

    static create(props: Omit<TransactionProps, "status">) {
        const initialStatus = "open";

        return new Transaction({
            ...props,
            status: initialStatus,
            id: props.id ?? randomUUID(),
            sequence: props.sequence ?? 1,
            transaction_date: props.transaction_date ?? new Date(),
        });
    }

    private generatorInstallments() {
        let initialInstallmentNumber = 1;
        const installmentAmount = Math.round((this.amount / this.installmentsNumber) * 100) / 100;

        while (initialInstallmentNumber <= this.installmentsNumber) {
            const installment = new Installment(
                installmentAmount,
                this.paymentMethod,
                initialInstallmentNumber++,
                this.tax
            );
            this.installments.push(installment);
        }
    }

    private installmentAlreadyPaidException(status: string, instalmentNumber: number) {
        if (status === "paid") {
            throw new Error(`Instalment ${instalmentNumber} already paid`);
        }
    }

    pay(instalmentForPay?: number): void {
        if (!instalmentForPay) {
            return this.installments.forEach((instalment) => {
                this.installmentAlreadyPaidException(instalment.status, instalment.instalmentNumber);
                instalment.changeStatus("paid");
                if (this.getBalances().balance === 0) this.status = "closed";
            });
        }

        const instalment = this.installments.find((instalment) => instalment.instalmentNumber === instalmentForPay);
        if (!instalment) throw new Error("Instalment not found");
        this.installmentAlreadyPaidException(instalment.status, instalment.instalmentNumber);
        instalment.changeStatus("paid");
        if (this.getBalances().balance === 0) this.status = "closed";
    }

    getBalances() {
        let balance = this.amount;
        for (const instalment of this.installments) {
            const instalmentMdr = instalment.mdr;
            balance += instalmentMdr;
            if (instalment.status === "paid") {
                balance -= instalment.amount;
                balance -= instalmentMdr;
            }
        }
        return {
            balance,
            amount: this.amount,
        };
    }

    getStatus() {
        return this.status;
    }
}
