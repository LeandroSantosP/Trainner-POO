export class Price {
    private value: number;
    status: string;
    constructor(value: number) {
        this.value = value;
        this.status = "predicted";
    }

    setStatus(status: string) {
        this.status = status;
    }
    getValue() {
        return this.value;
    }
}
