export class GetLoan {
    constructor() {}
    async execute(input: Input): Promise<Output> {
        const output: Output = {
            installments: [],
        };

        return output;
    }
}

type Input = {
    code: string;
};

type Output = {
    installments: {
        installmentNumber: number;
        amount: number;
        interest: number;
        amortization: number;
        balance: number;
    }[];
};
