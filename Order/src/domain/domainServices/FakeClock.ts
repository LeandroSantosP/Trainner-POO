import { Clock } from "@/application/interfaces/Clock";

export class FakeClock implements Clock {
    private date: Date = new Date();
    getCurrentDate(): Date {
        return this.date;
    }
    setCurrentDate(date: Date): void {
        this.date = date;
    }
}
