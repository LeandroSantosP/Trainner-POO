export class Status {
    protected value: string;

    constructor(status: string) {
        this.value = status;
    }

    getValue() {
        return this.value;
    }
}
