import { TransactionCode } from "@/domain/entities/TransactionCode";

test("Deve ser possivel criar um codigo de uma transacao.", function () {
    const transactionCode = new TransactionCode("john.doe@gmail.com", 10, new Date("2023-01-21"));
    const code = transactionCode.getCode();
    expect(code).toBe("john.doe202300000010");
});
