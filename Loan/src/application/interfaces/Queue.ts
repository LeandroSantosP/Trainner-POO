import { ApplicationEvent } from "@/application/interfaces/ApplicationEvent";
import { Handler } from "@/application/interfaces/Handler";

export interface Queue {
    register(handlerName: string, handler: Handler): void;
    publisher(eventName: string, applicationEvent: ApplicationEvent): Promise<void>;
}
