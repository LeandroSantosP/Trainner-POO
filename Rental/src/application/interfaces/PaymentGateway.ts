export interface PaymentGateway {
    pay(amount: number): Promise<Output>;
}

type Output = {
    status: string;
    tid: string;
};
