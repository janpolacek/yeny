import { Arg, Args, Int, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Event } from '../../entities/Event';
import { CreateEventInput, DeleteIventInput, GetEventsArgs } from './EventInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import uuid from 'uuid/v4';
import { Organizer } from '../../entities/Organizer';
import { Location } from '../../entities/Location';

@Resolver()
export class EventResolver {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
        @InjectRepository(Organizer)
        private readonly organizerRepository: Repository<Organizer>,
        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>
    ) {}

    @Query(returns => [Event], { nullable: true })
    async events(@Root() @Args() { skip, take }: GetEventsArgs) {
        const events = await this.eventRepository
            .createQueryBuilder('Event')
            .where('Event.dateTo >= :now', { now: new Date() })
            .where('Event.published = true')
            .orderBy('Event.dateFrom', 'ASC')
            .skip(skip)
            .take(take)
            .getMany();

        // todo: join
        return events.map(async event => {
            event.organizer = await this.organizerRepository.findOneOrFail({ where: { id: event.organizerId } });
            event.location = await this.locationRepository.findOne({ where: { id: event.locationId } });
            return event;
        });
    }

    @Query(() => Event, { nullable: true })
    async eventByUrl(@Arg('url', () => String, { nullable: false }) url: Event['url']) {
        return await this.eventRepository.findOne({ where: { url, published: true }, cache: 1000 });
    }

    @Mutation(() => Event)
    async createEvent(
        @Arg('data') { location, dateFrom, description, image, title, dateTo, password }: CreateEventInput
    ) {
        const url = title + uuid().slice(0, 10);
        return await this.eventRepository.save({
            title: title,
            url,
            description,
            dateFrom,
            dateTo,
            image,
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
