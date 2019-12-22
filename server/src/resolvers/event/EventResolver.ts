import { Arg, Args, Int, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Event } from '../../entities/Event';
import { CreateEventInput, DeleteIventInput, GetEventsArgs } from './EventInput';
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

    @Query(returns => [Event], { nullable: true })
    async events(@Root() @Args() { skip, take }: GetEventsArgs) {
        return this.eventRepository
            .createQueryBuilder()
            .skip(skip)
            .take(take)
            .orderBy('dateTo', 'ASC')
            .getMany();
    }

    @Query(() => Event)
    async eventById(@Arg('id', () => Int, { nullable: false }) id: Event['id']) {
        return await this.eventRepository.findOne({ where: { id }, cache: 1000 });
    }

    @Mutation(() => Event)
    async createEvent(
        @Arg('data') { location, dateFrom, description, image, title, dateTo, password }: CreateEventInput
    ) {
        // TODO: hash password
        return await this.eventRepository.save({
            title,
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
        const event = await this.eventRepository.findOneOrFail({ where: { id }, cache: 1000 });

        // TODO: hash compare
        if (event.password === password) {
            await this.eventRepository.delete(event);
            return true;
        }
        return false;
    }
}
