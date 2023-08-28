import { Handler } from "@/application/interfaces/Handler";
import { Queue } from "../../application/interfaces/Queue";
import { ApplicationEvent } from "@/application/interfaces/ApplicationEvent";

export class MediatorQueue implements Queue {
    static instance?: MediatorQueue;
    handlers: Map<string, Handler> = new Map();

    constructor() {}

    static getInstance(): MediatorQueue {
        if (!MediatorQueue.instance) {
            MediatorQueue.instance = new MediatorQueue();
        }
        return MediatorQueue.instance;
    }

    register(handlerName: string, handler: Handler): void {
        this.handlers.set(handlerName, handler);
    }
    async publisher(eventName: string, applicationEvent: ApplicationEvent): Promise<void> {
        const handler = this.handlers.get(eventName);
        if (!handler) return;
        if (handler.eventName === applicationEvent.applicationEvent) {
            await handler.handle(applicationEvent);
        }
    }
}
