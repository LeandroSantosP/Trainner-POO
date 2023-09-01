import { Clock } from "@/application/interfaces/Clock";

export class FakeClock implements Clock {
    private date: Date = new Date();
    constructor() {}
    getCurrentTime(): Date {
        return this.date;
    }

    setCurrentTime(date: Date) {
        this.date = date;
    }
}
