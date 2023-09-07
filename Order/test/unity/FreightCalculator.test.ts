import { FreightCalculator } from "@/domain/domainServices/FreightCalculator";

test("Deve ser possível calculara o frete", function () {
    const input = [
        {
            width: 30,
            height: 20,
            length: 20,
            weight: 3,
        },
    ];
    const output = FreightCalculator.execute(input);

    expect(output.freight).toBe(30);
});
