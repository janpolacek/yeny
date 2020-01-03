import { getRepository } from 'typeorm';
import { Event } from './entities/Event';
import * as faker from 'faker';
import { Organizer } from './entities/Organizer';
import speakingurl from 'speakingurl';
import { addDays } from 'date-fns';

function fakeOrganizer(): Partial<Organizer> {
    return {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email()
    };
}

function fakeEvent(fakeOrganizer: Partial<Organizer>) {
    const title = faker.random.words();
    const dateFrom = faker.date.future();
    const dateTo = addDays(dateFrom, 5);

    return {
        title: title,
        url: speakingurl(title),
        description: faker.lorem.paragraph(),
        password: 'password',
        dateFrom: dateFrom,
        dateTo: dateTo,
        image: faker.image.imageUrl(undefined, undefined, undefined, true, true),
        organizer: fakeOrganizer,
        price: Number(faker.commerce.price(0, 10)),
        location: {
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
            name: faker.address.city()
        },
        published: true
    };
}

export async function seedDatabase() {
    const eventRepository = getRepository(Event);

    const organizers = [fakeOrganizer(), fakeOrganizer(), fakeOrganizer(), fakeOrganizer()];
    const events = organizers
        .map(organizer => {
            return [
                fakeEvent(organizer),
                fakeEvent(organizer),
                fakeEvent(organizer),
                fakeEvent(organizer),
                fakeEvent(organizer)
            ];
        })
        .flat();
    await eventRepository.save(events);
}
