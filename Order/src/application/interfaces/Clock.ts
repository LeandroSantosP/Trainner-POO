export interface Clock {
    getCurrentDate(): Date;
    setCurrentDate(date: Date): void;
}
