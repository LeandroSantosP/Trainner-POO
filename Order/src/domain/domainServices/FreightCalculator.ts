export class FreightCalculator {
    static execute(products: Input): Output {
        let freight = 0;
        for (const item of products) {
            const volume = (item.width / 100) * (item.height / 100) * (item.length / 100);
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
