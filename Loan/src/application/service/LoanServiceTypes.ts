export type GetLoanInput = {
    code: string;
};

export type GetLoanOutput = {
    installments: {
        installmentNumber: number;
        amount: number;
        interest: number;
        amortization: number;
        balance: number;
    }[];
    status: string;
};

export type SubmitLoanInput = {
    code: string;
    purchaseTotalPrice: number;
    downPayment: number;
    salary: number;
    period: number;
    tableType: string;
};

export type SimulateLoanInput = {
    code: string;
    purchaseTotalPrice: number;
    downPayment: number;
    salary: number;
    period: number;
    tableType: string;
};

export type SimulateLoanOutput = {
    installments: {
        installmentNumber: number;
        amount: number;
        interest: number;
        amortization: number;
        balance: number;
    }[];
};
