import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Event } from '../entities/Event';
import { Arg, Args, ArgsType, Field, Int, Query, Resolver } from 'type-graphql';

@ArgsType()
class GetEventsArgs {
    @Field(_type => Int, { nullable: true, defaultValue: 0 })
    skip?: number;

    @Field(_type => Int, { nullable: true, defaultValue: 20 })
    take?: number;

    @Field(_type => Boolean, { nullable: true })
    past?: boolean;

    @Field(_type => Boolean, { nullable: true })
    future?: boolean;
}

@Resolver(_of => Event)
export class EventResolver {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>
    ) {}

    @Query(_returns => Event, { nullable: true })
    async eventById(@Arg('id', _type => Int, { nullable: false }) id: Event['id']): Promise<Event> {
        return (await this.eventRepository.findOne({ where: { id: id }, cache: 1000 }))!;
    }

    @Query(_returns => [Event])
    futureEvents(@Args() { skip, take }: GetEventsArgs): Promise<Event[]> {
        const qb = this.eventRepository.createQueryBuilder();
        return qb
            .where('date_to >= :now', { now: new Date() })
            .skip(skip)
            .take(take)
            .orderBy('date_to', 'ASC')
            .getMany();
    }
}
