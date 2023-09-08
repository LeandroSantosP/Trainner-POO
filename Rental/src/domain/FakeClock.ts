import { Clock } from "@/application/interfaces/Clock";

export class FakeClock implements Clock {
<<<<<<< HEAD:Node-Template/src/domain/FakeClock.ts
    date: Date = new Date();
=======
    private date: Date = new Date();
>>>>>>> f0c9cf62915a9f0dfe7d3b9bec03f0edd8699a3b:Rental/src/domain/FakeClock.ts
    constructor() {}
    getCurrentTime(): Date {
        return this.date;
    }

<<<<<<< HEAD:Node-Template/src/domain/FakeClock.ts
    setCurrentDate(date: Date) {
=======
    setCurrentTime(date: Date) {
>>>>>>> f0c9cf62915a9f0dfe7d3b9bec03f0edd8699a3b:Rental/src/domain/FakeClock.ts
        this.date = date;
    }
}
