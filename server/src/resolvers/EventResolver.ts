import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Arg, Args, ArgsType, Field, FieldResolver, Int, Query, Resolver, Root } from 'type-graphql';
import { Event } from '../entities/Event';
import { User } from '../entities/User';

@ArgsType()
class GetEventsArgs {
    @Field(type => Int, { nullable: true, defaultValue: 0 })
    skip?: number;

    @Field(type => Int, { nullable: true, defaultValue: 20 })
    take?: number;
}

@Resolver(of => Event)
export class EventResolver {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    @Query(returns => Event, { nullable: true })
    async eventById(@Arg('eventId', type => Int, { nullable: false }) eventId: Event['id']) {
        return await this.eventRepository.findOne({ where: { id: eventId }, cache: 1000 });
    }

    @Query(returns => [Event])
    futureEvents(@Root() @Args() { skip, take }: GetEventsArgs) {
        return this.eventRepository
            .createQueryBuilder()
            .where('date_to >= :now', { now: new Date() })
            .skip(skip)
            .take(take)
            .orderBy('date_to', 'ASC')
            .getMany();
    }

    @FieldResolver(returns => User)
    async organizer(@Root() event: Event) {
        return await this.userRepository.findOne({ where: { id: event.organizerId }, cache: 1000 });
    }
}
