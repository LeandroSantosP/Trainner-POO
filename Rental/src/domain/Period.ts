export class Period {
    private startDate: Date;
    private endDate: Date;
    constructor(startDate: Date, endDate: Date) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    getInHors() {
        const milissegundos = this.startDate.getTime() - this.endDate.getTime();
        return Math.floor(milissegundos / (1000 * 60 * 60));
    }

    getInDays() {
        return Math.floor(this.getInHors() / 24);
    }
}
