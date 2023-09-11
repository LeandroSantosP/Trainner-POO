import { Dimensions } from "@/domain/entity/Dimensions";

test("Deve ser possível criar uma nova dimensão", function () {
    const dim = new Dimensions(100, 70, 50, 10);
    expect(dim).toBeDefined();
});

test("Deve ser possível calcular a densidade e o volume baseado nas dimensões", function () {
    const dim = new Dimensions(100, 70, 50, 10);
    expect(dim.getVolume()).toBe(0.35);
    expect(dim.getDensity()).toBe(28.57);
});

const invalidInputs = [
    [
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
    ],
];
test.each(invalidInputs)("Deve nao deve ser possível criar com dimensões com valores negativos", function (input) {
    expect(() => new Dimensions(input.width, input.height, input.length, input.weight)).toThrowError(
        "Invalid Dimension, must not be negative"
    );
});
