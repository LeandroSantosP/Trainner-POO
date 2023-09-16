import { AppError } from "@/domain/entity/AppError";
import { StokeEntry } from "@/domain/entity/StokeEntry";

test("Deve ser possível criar um entrada no stoke", function () {
    const stokeEntry = new StokeEntry("123", "in", 10);
    expect(stokeEntry).toBeDefined();
});

test("Deve ser possível criar um entrada e uma Saida no stoke", function () {
    const stokeEntryIn = new StokeEntry("123", "in", 10);
    const stokeEntryOut = new StokeEntry("123", "out", 10);
    expect(stokeEntryIn).toBeDefined();
    expect(stokeEntryOut).toBeDefined();
});

test("Não Deve ser possível criar um entrada no stoke com quantia negativa", function () {
    expect(() => new StokeEntry("123", "in", -10)).toThrow(new AppError("Invalid quantity"));
});
