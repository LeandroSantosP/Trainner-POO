export class OrderCode {
    private code: string;
    constructor(date: Date, sequence: number) {
        const currentYear = date.getFullYear();
        this.code = `${currentYear}${sequence.toString().padStart(8, "0")}`;
    }

    getCode() {
        return this.code;
    }
}
