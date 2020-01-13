import { getRepository } from 'typeorm';
import { Event } from './entities/Event';
import * as faker from 'faker';
import { Organizer } from './entities/Organizer';
import { uniqueSpeakingUrl } from './utils';
import { addDays } from 'date-fns';
const DEV_ENV = true;
function fakeOrganizer(): Partial<Organizer> {
    return {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
    };
}

function randomPicsumImage() {
    return `https://picsum.photos/640/480/?random=${Math.floor(Math.random() * 1000)}`;
}

function genRand(min: number, max: number) {
    const rand = Math.random() * (max - min) + min;
    const power = Math.pow(10, 7);
    return Math.floor(rand * power) / power;
}

function fakeEvent(fakeOrganizer: Partial<Organizer>) {
    const title = faker.random.words();
    const dateFrom = faker.date.future();
    const dateTo = addDays(dateFrom, 5);

    return {
        title: title,
        url: uniqueSpeakingUrl(title),
        description: faker.lorem.paragraph(),
        password: 'password',
        dateFrom: dateFrom,
        dateTo: dateTo,
        image: randomPicsumImage(),
        organizer: fakeOrganizer,
        price: Number(faker.commerce.price(0, 10)),
        location: {
            latitude: String(genRand(47, 49)),
            longitude: String(genRand(17, 19)),
            name: faker.address.city(),
        },
        published: DEV_ENV,
    };
}

export async function seedDatabase() {
    const eventRepository = getRepository(Event);

    const organizers = [];
    for (let i = 0; i < 10; i++) {
        organizers.push(fakeOrganizer());
    }
    const events = organizers
        .map(organizer => {
            const events = [];
            for (let j = 0; j < 10; j++) {
                events.push(fakeEvent(organizer));
            }

            return events;
        })
        .flat();
    await eventRepository.save(events);
}
