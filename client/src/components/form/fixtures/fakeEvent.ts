import * as faker from 'faker';
import { addDays } from 'date-fns';
import { CreateEventFormValues } from '../../../_types/CreateEventForm';

export function generatedCreateEventData(): CreateEventFormValues {
    const title = faker.random.words();
    const dateFrom = faker.date.future();
    const dateTo = addDays(dateFrom, 5);

    return {
        title: title,
        description: faker.lorem.paragraph(),
        password: 'password',
        dateFrom: dateFrom,
        dateTo: dateTo,
        image: null,
        organizer: {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            email: faker.internet.email()
        },
        price: Number(faker.commerce.price(0, 10)),
        location: {
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
            name: faker.address.city()
        }
    };
}
