import { Arg, Args, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Event } from '../../entities/Event';
import { Calendar, CreateEventInput, DeleteIventInput, GetByDateArgs } from './EventInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Organizer } from '../../entities/Organizer';
import { Location } from '../../entities/Location';
import { isDevEnv, uniqueSpeakingUrl } from '../../utils';
import { format, parse } from 'date-fns';

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

    async getPublishedEventsQuery() {
        return this.eventRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.organizer', 'organizer')
            .leftJoinAndSelect('event.location', 'location')
            .where('event.published = true');
    }

    @Query(() => [Event], { nullable: true })
    async events(@Root() @Args() { skip, take, date }: GetByDateArgs) {
        let publishedEvents = await this.getPublishedEventsQuery();

        if (!date) {
            // vsetky ktore neskoncili
            publishedEvents = publishedEvents.where('event.dateTo >= :date', { date: new Date() });
        } else {
            // zaciatok ohraniceny dnom
            publishedEvents = publishedEvents.where(`to_char(event.dateFrom, 'YYYY-MM-DD') = :date `, {
                date: format(date, 'yyyy-MM-dd'),
            });
        }

        return publishedEvents
            .orderBy('event.dateFrom', 'ASC')
            .skip(skip)
            .take(take)
            .cache('eventsCache', isDevEnv() ? 0 : 2 * 60 * 1000)
            .getMany();
    }

    @Query(() => Event, { nullable: true })
    async getEvent(@Arg('url', () => String, { nullable: false }) url: Event['url']) {
        return await this.eventRepository.findOne({
            where: { url, published: true },
            cache: isDevEnv() ? 0 : 10 * 60 * 1000,
        });
    }

    @Query(() => [Event], { nullable: true })
    async fullSearch(@Arg('query', () => String, { nullable: false }) query: string) {
        const publishedEventsQuery = await this.getPublishedEventsQuery();
        const { raw, entities } = await publishedEventsQuery
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

    @Query(() => Calendar, { nullable: true })
    async calendar() {
        const { raw, entities } = await this.eventRepository
            .createQueryBuilder('event')
            .select(`to_char(event.dateFrom, 'YYYY-MM-DD') as date`)
            .where('event.published = true')
            .groupBy('date')
            .orderBy('date', 'ASC')
            .getRawAndEntities();

        return { days: raw.map(({ date }) => date) } as Calendar;
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
