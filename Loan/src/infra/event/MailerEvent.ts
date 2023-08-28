import { ApplicationEvent } from "@/application/interfaces/ApplicationEvent";

export class MailerEvent implements ApplicationEvent {
    applicationEvent = "mailerEvent";
    constructor(
        readonly requestEmail: string,
        readonly loanId: string,
        readonly subject: string,
        readonly message: string
    ) {}
}
