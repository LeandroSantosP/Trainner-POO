import { Clock } from "@/application/interfaces/Clock";

export class FakeClock implements Clock {
    date: Date = new Date();
    constructor() {}
    getCurrentTime(): Date {
        return this.date;
    }

    setCurrentDate(date: Date) {
        this.date = date;
    }
}
