import { ApplicationEvent } from "@/application/interfaces/ApplicationEvent";

export class OrderApplied implements ApplicationEvent {
    eventName = "OrderApplied";

    constructor(readonly items: { productId: string; quantity: number }[]) {}
}
