export class FreightCalculator {
    static execute(input: Input): Output {
        let freight = 0;
        for (const item of input) {
            const volume = (item.width / 100) * (item.height / 100) * (input.length / 100);
            const density = item.weight / volume;
            freight = 1000 * volume * (density / 100);
        }
        return {
            freight: Math.round(freight),
        };
    }
}

type Input = {
    width: number;
    height: number;
    length: number;
    weight: number;
}[];

type Output = {
    freight: number;
};
