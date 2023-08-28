import { ApplicationEvent } from "./ApplicationEvent";

export interface Handler {
    handlerName: string;
    handle(applicationEvent: ApplicationEvent): Promise<any>;
}
