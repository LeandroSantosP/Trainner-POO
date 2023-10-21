import { PaymentGateway } from "@/application/interfaces/PaymentGateway";

export class PaymentGatewayFake implements PaymentGateway {
    async pay(input: { amount: number; token: string }): Promise<{ status: string; tid: string }> {
        return {
            status: "paid",
            tid: "123456789",
        };
    }
}
