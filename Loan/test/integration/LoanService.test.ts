import { LoanService } from "@/application";
import { MailerEventHandler } from "@/application/handles/MailerEventHandler";
import { RepositoryAndQueueFactoryMemory } from "@/infra/factory/RepositoryFactoryMemory";

const repositoryFactory = new RepositoryAndQueueFactoryMemory();
const mediatorQueue = repositoryFactory.queueController();
const mailerEventHandler = new MailerEventHandler(repositoryFactory);
mediatorQueue.register("mailerEvent", mailerEventHandler);
const loanService = new LoanService(repositoryFactory);
test("Deve ser possível criar um Financiamento e obter-lo através do serviço de Loan", async function () {
    const submitLoanInput = {
        code: "12345",
        purchaseTotalPrice: 540500,
        salary: 230000,
        downPayment: 150000,
        period: 7,
        tableType: "price",
    };
    await loanService.submitLoan(submitLoanInput);
    const getLoanInput = {
        code: "12345",
    };
    const output = await loanService.getLoan(getLoanInput);

    expect(output.status).toBe("approved");
    expect(output.installments.at(0)?.balance).toBe(336365.66);
    expect(output.installments.at(output.installments.length - 2)?.balance).toBe(57464.73);
    expect(output.installments.at(output.installments.length - 1)?.balance).toBe(0);
});

test("Deve ser possível simular um Financiamento através do serviço de Loan", async function () {
    const input = {
        code: "12345",
        purchaseTotalPrice: 540500,
        salary: 230000,
        downPayment: 150000,
        period: 7,
        tableType: "price",
    };
    const output = await loanService.simulateLoan(input);
    expect(output.installments.at(0)?.balance).toBe(336365.66);
    expect(output.installments.at(output.installments.length - 2)?.balance).toBe(57464.73);
    expect(output.installments.at(output.installments.length - 1)?.balance).toBe(0);
});
