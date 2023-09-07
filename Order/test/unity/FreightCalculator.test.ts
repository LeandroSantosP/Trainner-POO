import { FreightCalculator } from "@/domain/domainServices/FreightCalculator";

test("Deve ser possível calculara o frete", function () {
    const input = {
        width: 30,
        height: 20,
        length: 20,
        weight: 3,
    };
    const output = FreightCalculator.execute(input);

    expect(output.freight).toBe(30);
});

const invalidInputs = [
    {
        width: -30,
        height: 20,
        length: 20,
        weight: 3,
    },
    {
        width: 30,
        height: -20,
        length: 20,
        weight: 3,
    },
    {
        width: 30,
        height: 20,
        length: -20,
        weight: 3,
    },
    {
        width: 30,
        height: 20,
        length: 20,
        weight: -3,
    },
];

test.each(invalidInputs)("Nao deve ser possível calcular um frete com valores negativos : %2", function (input) {
    expect(() => FreightCalculator.execute(input)).toThrowError();
});
