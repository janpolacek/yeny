import { getRepository } from 'typeorm';
import { Event } from './entities/Event';
import * as faker from 'faker';
import { Organizer } from './entities/Organizer';
import { uniqueSpeakingUrl } from './utils';
import { addMinutes } from 'date-fns';

function fakeOrganizer(): Partial<Organizer> {
    return {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
    };
}

function randomPicsumImage() {
    return `https://picsum.photos/640/480/?random=${Math.floor(Math.random() * 1000)}`;
}

function genRand(min: number = 0, max: number = 10) {
    const rand = Math.random() * (max - min) + min;
    const power = Math.pow(10, 7);
    return Math.floor(rand * power) / power;
}

function fakeEvent(fakeOrganizer: Partial<Organizer>) {
    const title = faker.random.words();
    const dateFrom = genRand(0, 10) > 5 ? faker.date.future() : faker.date.past();
    const dateTo = addMinutes(dateFrom, Math.floor(genRand(100, 5 * 24 * 60)));
    return {
        title: title,
        url: uniqueSpeakingUrl(title),
        description: faker.lorem.paragraph(10),
        password: 'password',
        dateFrom: dateFrom,
        dateTo: dateTo,
        image: randomPicsumImage(),
        organizer: fakeOrganizer,
        price: Number(faker.commerce.price(0, 10)),
        location: {
            latitude: String(genRand(47, 49)),
            longitude: String(genRand(17, 22)),
            name: faker.address.city(),
        },
        published: true,
    };
}

export async function seedDatabase() {
    const eventRepository = getRepository(Event);

    const organizers = [];
    for (let i = 0; i < 15; i++) {
        organizers.push(fakeOrganizer());
    }
    const events = organizers
        .map(organizer => {
            const events = [];
            for (let j = 0; j < 15; j++) {
                events.push(fakeEvent(organizer));
            }

            return events;
        })
        .flat();
    await eventRepository.save(events);
}
