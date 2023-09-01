export class Period {
    private startDate: Date;
    private endDate: Date;
    constructor(startDate: Date, endDate: Date) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    getInHors() {
        return ((this.startDate.getTime() - this.endDate.getTime()) / 1000) * 60 * 60;
    }
}
