import * as faker from 'faker';
import { addMinutes } from 'date-fns';
import { CreateEventFormValues } from '_types/CreateEventForm';

function genRand(min: number, max: number) {
    const rand = Math.random() * (max - min) + min;
    const power = Math.pow(10, 7);
    return Math.floor(rand * power) / power;
}

export function generatedCreateEventData(): CreateEventFormValues {
    const title = faker.random.words();
    const dateFrom = faker.date.future();
    const dateTo = addMinutes(dateFrom, Math.floor(genRand(0, 5 * 24 * 60)));
    return {
        title: title,
        description: faker.lorem.paragraph(5),
        password: 'password',
        dateFrom: dateFrom,
        dateTo: dateTo,
        image: null,
        organizer: {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            email: faker.internet.email(),
        },
        price: Number(faker.commerce.price(0, 10)),
        location: {
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
            name: faker.address.city(),
        },
    };
}
