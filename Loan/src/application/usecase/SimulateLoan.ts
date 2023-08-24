import currency from "currency.js";

export class SimulateLoan {
    constructor() {}
    async execute(input: Input): Promise<Output> {
        const loanRate = 1;
        const loanAmount = input.purchaseTotalPrice - input.downPayment;
        let rate = loanRate / 100;
        let balance = currency(loanAmount);
        let installmentNumber = 1;

        const output: Output = {
            installments: [],
        };

        let installments = [];

        if (input.tableType === "price") {
            let formula = Math.pow(1 + rate, input.period);
            let amount = balance.multiply((formula * rate) / (formula - 1));
            while (balance.value > 0) {
                let interest = balance.multiply(rate);
                let amortization = amount.subtract(interest);
                balance = balance.subtract(amortization);
                if (balance.value <= 0.05) balance = currency(0);

                installments.push({
                    installmentNumber,
                    amount: amount.value,
                    interest: interest.value,
                    amortization: amortization.value,
                    balance: balance.value,
                });
                installmentNumber++;
            }
        }
        if (input.tableType === "sac") {
            let amortization = currency(balance.value / input.period);
            while (balance.value > 0) {
                let saldoInicial = currency(balance.value);
                let interest = currency(saldoInicial.value * rate);
                let updatedBalance = currency(saldoInicial.value + interest.value);
                let amount = currency(interest.value + amortization.value);
                balance = currency(updatedBalance.value - amount.value);
                if (balance.value <= 0.05) balance = currency(0);
                installments.push({
                    installmentNumber,
                    amount: amount.value,
                    interest: interest.value,
                    amortization: amortization.value,
                    balance: balance.value,
                });
                installmentNumber++;
            }
        }

        output.installments = installments;

        return output;
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

type Output = {
    installments: {
        installmentNumber: number;
        amount: number;
        interest: number;
        amortization: number;
        balance: number;
    }[];
};
