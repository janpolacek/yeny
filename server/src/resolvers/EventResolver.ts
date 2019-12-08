import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Event } from "../entities/Event";
import {FieldResolver, Resolver, Root} from "type-graphql";

@Resolver(_of => Event)
export class EventResolver {
    constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>) {}

    @FieldResolver()
    async user(@Root() id: Event['id']): Promise<Event> {
        return (await this.eventRepository.findOne(id, { cache: 1000 }))!;
    }
}