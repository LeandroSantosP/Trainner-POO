export class FreightCalculator {
    static execute(products: Input): Output {
        let freight = 0;
        for (const item of products) {
            freight = 1000 * item.volume * (item.density / 100);
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
