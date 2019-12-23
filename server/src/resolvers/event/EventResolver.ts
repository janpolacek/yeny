import { Arg, Args, Int, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Event } from '../../entities/Event';
import { CreateEventInput, DeleteIventInput, GetEventsArgs } from './EventInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import uuid from 'uuid/v4';
import { Organizer } from '../../entities/Organizer';

@Resolver()
export class EventResolver {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
        @InjectRepository(Organizer)
        private readonly organizerRepository: Repository<Organizer>
    ) {}

    @Query(returns => [Event], { nullable: true })
    async events(@Root() @Args() { skip, take }: GetEventsArgs) {
        const events = await this.eventRepository
            .createQueryBuilder('Event')
            .orderBy('Event.dateTo', 'ASC')
            .skip(skip)
            .take(take)
            .getMany();

        return events.map(async event => {
            event.organizer = await this.organizerRepository.findOneOrFail({ where: { id: event.organizerId } });
            return event;
        });
    }

    @Query(() => Event)
    async eventById(@Arg('id', () => Int, { nullable: false }) id: Event['id']) {
        return await this.eventRepository.findOne({ where: { id }, cache: 1000 });
    }

    @Query(() => Event)
    async eventByUrl(@Arg('url', () => String, { nullable: false }) url: Event['url']) {
        return await this.eventRepository.findOne({ where: { url }, cache: 1000 });
    }

    @Mutation(() => Event)
    async createEvent(
        @Arg('data') { location, dateFrom, description, image, title, dateTo, password }: CreateEventInput
    ) {
        const url = title + uuid().slice(0, 10);
        // TODO: hash password
        return await this.eventRepository.save({
            title,
            url,
            description,
            dateFrom,
            dateTo,
            image,
            password,
            location: {
                latitude: location.latitude,
                longitude: location.longitude,
                name: location.name
            }
        });
    }

    @Mutation(() => Boolean)
    async deleteEvent(@Arg('data') { id, password }: DeleteIventInput) {
        const event = await this.eventRepository.findOneOrFail({ where: { id } });

        // TODO: hash compare
        if (event.password === password) {
            await this.eventRepository.delete(event);

            return true;
        }
        return false;
    }
}
