import { ApplicationEvent } from "../interfaces/ApplicationEvent";
import { Handler } from "../interfaces/Handler";

export class MailerEventHandler implements Handler {
    handlerName = "mailerEvent";
    async handle(applicationEvent: ApplicationEvent): Promise<any> {
        console.log(applicationEvent);
    }
}
