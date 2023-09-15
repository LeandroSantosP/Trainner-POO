import { ApplicationEvent } from "@/application/interfaces/ApplicationEvent";

export interface Queue {
    connect(): Promise<void>;
    publisher(queueName: string, data: ApplicationEvent): Promise<void>;
    on(queueName: string, callback: Function): Promise<void>;
}
