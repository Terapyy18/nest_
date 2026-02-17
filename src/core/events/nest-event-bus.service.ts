import { Injectable } from "@nestjs/common";
import { EventBusPort } from "./event-bus.port";
import { EventEmitter2 } from "@nestjs/event-emitter"

@Injectable()
export class NestEventBusService implements EventBusPort {
    
    constructor(private eventEmitter: EventEmitter2) { }

    async publish(event: any): Promise<void>{
        this.eventEmitter.emitAsync(event.name, event.payload)
    }
}