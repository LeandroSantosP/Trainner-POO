import { SubmitLoan } from "@/application";
import { GetLoan } from "@/application/usecase/GetLoan";
import { InstallmentRepositoryMemory } from "@/infra/repository/InstallmentRepositoryMemory";
import { LoanRepositoryMemory } from "@/infra/repository/LoanRepositoryMemory";

const loadRepository = new LoanRepositoryMemory();
const installmentRepository = new InstallmentRepositoryMemory();
test("Deve ser possível Submeter uma financiamento com a tabela price", async function () {
    const submitLoan = new SubmitLoan(loadRepository, installmentRepository);
    const submitLoanInput = {
        code: "12345",
        purchaseTotalPrice: 540500,
        salary: 230000,
        downPayment: 150000,
        period: 7,
        tableType: "price",
    };
    await submitLoan.execute(submitLoanInput);

    const getLoan = new GetLoan(loadRepository);
    const getLoanInput = {
        code: "12345",
    };
    const output = await getLoan.execute(getLoanInput);
    expect(output.status).toBe("approved");
    expect(output.installments.at(0)?.balance).toBe(336365.66);
    expect(output.installments.at(output.installments.length - 2)?.balance).toBe(57464.73);
    expect(output.installments.at(output.installments.length - 1)?.balance).toBe(0);
});

test("Deve ser possível Submeter uma financiamento com a tabela sac", async function () {
    const submitLoan = new SubmitLoan(loadRepository, installmentRepository);
    const submitLoanInput = {
        code: "123456",
        purchaseTotalPrice: 540500,
        salary: 230000,
        downPayment: 150000,
        period: 7,
        tableType: "sac",
    };
    await submitLoan.execute(submitLoanInput);

    const getLoan = new GetLoan(loadRepository);
    const getLoanInput = {
        code: "123456",
    };
    const output = await getLoan.execute(getLoanInput);
    expect(output.status).toBe("approved");
    expect(output.installments.at(0)?.balance).toBe(334714.29);
    expect(output.installments.at(output.installments.length - 2)?.balance).toBe(55785.74);
    expect(output.installments.at(output.installments.length - 1)?.balance).toBe(0);
});
