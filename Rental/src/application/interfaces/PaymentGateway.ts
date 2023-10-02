export interface PaymentGateway {
    pay(input: { amount: number; token: string }): Promise<Output>;
}

type Output = {
    status: string;
    tid: string;
};
