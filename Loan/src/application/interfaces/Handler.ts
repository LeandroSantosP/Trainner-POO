import { ApplicationEvent } from "./ApplicationEvent";

export interface Handler {
    eventName: string;
    handle(applicationEvent: ApplicationEvent): Promise<any>;
}
