import { Arg, Args, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Event } from '../../entities/Event';
import { CreateEventInput, DeleteIventInput, GetEventsArgs } from './EventInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Organizer } from '../../entities/Organizer';
import { Location } from '../../entities/Location';
import { uniqueSpeakingUrl } from '../../utils';

const DEV_ENV = true;

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

    @Query(() => [Event], { nullable: true })
    async getEvents(@Root() @Args() { skip, take }: GetEventsArgs) {
        return await this.eventRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.organizer', 'organizer')
            .leftJoinAndSelect('event.location', 'location')
            .where('event.dateTo >= :now', { now: new Date() })
            .where('event.published = true')
            .orderBy('event.dateFrom', 'ASC')
            .skip(skip)
            .take(take)
            .cache('eventsCache', DEV_ENV ? 0 : 2 * 60 * 1000)
            .getMany();
    }

    @Query(() => Event, { nullable: true })
    async getEvent(@Arg('url', () => String, { nullable: false }) url: Event['url']) {
        return await this.eventRepository.findOne({
            where: { url, published: true },
            cache: DEV_ENV ? 0 : 10 * 60 * 1000,
        });
    }

    @Query(() => [Event], { nullable: true })
    async fullSearch(@Arg('query', () => String, { nullable: false }) query: string) {
        const { raw, entities } = await this.eventRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.organizer', 'organizer')
            .leftJoinAndSelect('event.location', 'location')
            .addSelect(
                `ts_rank_cd(
                    to_tsvector(
                        coalesce(event.title,'') || ' ' ||
                        coalesce(event.description,'') || ' ' || 
                        coalesce(location.name,'') || ' ' || 
                        coalesce(organizer.name,'')
                    ),
                    plainto_tsquery(:query))
                `,
                'rank'
            )
            .orderBy('rank', 'DESC')
            .setParameters({ query })
            .getRawAndEntities();

        return entities.filter((e, index) => {
            return raw[index].rank > 0;
        });
    }

    @Mutation(() => Event)
    async createEvent(
        @Arg('data')
        { location, organizer, dateFrom, description, image, title, dateTo, password, price }: CreateEventInput
    ) {
        const url = uniqueSpeakingUrl(title);
        image = image ? image : undefined;
        return await this.eventRepository.save({
            title,
            url,
            description,
            dateFrom,
            dateTo,
            image,
            location,
            password,
            organizer,
            price,
            published: true,
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
