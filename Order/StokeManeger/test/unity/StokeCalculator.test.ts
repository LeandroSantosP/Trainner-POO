import { StokeEntryCalculator } from "@/domain/StokeEntryCalculator";
import { StokeEntry } from "@/domain/entity/StokeEntry";

test("Deve ser possível calcular o total do stoke com base nas entradas e saídas (stokeEntry)", function () {
    const total = StokeEntryCalculator.execute([
        new StokeEntry("123", "in", 10),
        new StokeEntry("123", "in", 10),
        new StokeEntry("123", "out", 20),
    ]);
    expect(total).toBe(0);
});
