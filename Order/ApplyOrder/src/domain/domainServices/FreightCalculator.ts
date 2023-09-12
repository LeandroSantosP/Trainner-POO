export class FreightCalculator {
    static execute(input: Input, distance: number = 1000): Output {
        let freight = 0;
        for (const item of input) {
            freight = distance * item.volume * (item.density / 100);
        }
        return {
            freight: Math.round(freight),
        };
    }
}

type Input = {
    weight: number;
    density: number;
    volume: number;
}[];

type Output = {
    freight: number;
};
