import { Clock } from "@/application/interfaces/Clock";

export class FakeClock implements Clock {
    constructor(readonly date: Date) {}
    getCurrentTime(): Date {
        return this.date;
    }
}
