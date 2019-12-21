import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Event } from '../../entities/Event';
import { EventInput } from './EventInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { User } from '../../entities/User';

@Resolver()
export class EventResolver {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    @Query(() => Event, { nullable: true })
    async eventById(@Arg('eventId', () => Int, { nullable: false }) eventId: Event['id']) {
        return await Event.findOne({ where: { id: eventId }, cache: 1000 });
    }

    @Mutation(() => Event)
    async createEvent(@Arg('data') { location, date_from, description, image, title, date_to }: EventInput) {
        return await this.eventRepository.save({
            title,
            description,
            date_from,
            date_to,
            image,
            location: {
                latitude: location.latitude,
                longitude: location.longitude,
                name: location.name
            }
        });
    }

    @Mutation(() => Boolean)
    async deleteEvent(@Arg('eventId', () => Int, { nullable: false }) eventId: Event['id']) {
        const deleteResult = await this.eventRepository.delete(eventId);
        return (deleteResult.affected ?? 0) > 0;
    }
}
