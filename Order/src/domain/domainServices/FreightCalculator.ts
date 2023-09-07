export class FreightCalculator {
    static execute(input: Input): Output {
        Object.entries(input).some(([key, value]) => {
            if (value < 0) throw new Error(`'${key.toUpperCase()}' must be positive value`);
        });
        const volume = (input.width / 100) * (input.height / 100) * (input.length / 100);
        const density = input.weight / volume;
        const freight = 1000 * volume * (density / 100);
        return {
            freight,
        };
    }
}

type Input = {
    width: number;
    height: number;
    length: number;
    weight: number;
};

type Output = {
    freight: number;
};
