export class SimulateLoan {
    constructor() {}
    async execute(input: Input): Promise<any> {
        const loanAmount = input.purchaseTotalPrice - input.downPayment;
        const loanRate = 1;
    }
}

type Input = {
    code: string;
    purchaseTotalPrice: number;
    downPayment: number;
    salary: number;
    period: number;
    tableType: string;
};
