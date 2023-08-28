import { ApplicationEvent } from "@/application/interfaces/ApplicationEvent";

export class MailerEvent implements ApplicationEvent {
    applicationEvent = "mailerEvent";
    constructor(
        readonly loanCode: string,
        readonly from: string,
        readonly to: string,
        readonly subject: string,
        readonly message: string
    ) {}
}
