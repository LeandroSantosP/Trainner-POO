import { Status } from "./Status";

export class CarStatus extends Status {
    constructor() {
        super("waiting_payment");
    }
    paymentReject() {
        this.value = "payment_reject";
    }
    paymentAprove() {
        this.value = "payment_aprove";
    }
}
