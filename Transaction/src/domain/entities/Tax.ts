export abstract class Tax {
    taxs: { name: string; fix: number; percentage: number }[] = [];
    constructor(readonly taxName: string) {}
    add(fix: number, percentage: number) {
        this.taxs.push({ name: this.taxName, fix, percentage });
    }

    abstract calculatePercentage(taxIndex: number, amountForCalculate: number): number;
}
