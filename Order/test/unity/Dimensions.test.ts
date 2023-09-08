import { Dimensions } from "@/domain/entity/Dimensions";

test("Deve ser possível criar uma nova dimensão", function () {
    const dim = new Dimensions(100, 70, 50, 10);
    expect(dim).toBeDefined();
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
