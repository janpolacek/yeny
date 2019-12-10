import { getRepository } from 'typeorm';
import { Event } from './entities/Event';
import { User } from './entities/User';

export async function seedDatabase() {
    const eventRepository = getRepository(Event);
    const userRepository = getRepository(User);

    const organizer1 = await userRepository.save({
        name: 'Tester',
        surname: 'Yeeen',
        email: 'tester@yeen.sk'
    });

    const organizer2 = await userRepository.save({
        name: 'Avaro',
        surname: 'Puios',
        email: 'Avaro@puios.sk'
    });

    await eventRepository.save([
        {
            title: 'My past event',
            description: 'Description of my first event',
            date_from: '2019-12-06T20:02:35.824Z',
            date_to: '2019-12-08T20:02:35.824Z',
            image: 'https://wapo.st/2P65TfP',
            organizer: organizer1,
            location: {
                longitude: '0',
                latitude: '0',
                name: 'North Pole'
            }
        },
        {
            title: 'My first event',
            description: 'Description of my first event',
            date_from: '2019-12-09T20:02:35.824Z',
            date_to: '2019-12-10T20:02:35.824Z',
            image: 'https://wapo.st/2P65TfP',
            organizer: organizer1,
            location: {
                longitude: '0',
                latitude: '0',
                name: 'North Pole'
            }
        },
        {
            title: 'My second event',
            description: 'Description of my second event',
            image: 'https://wapo.st/2P65TfP',
            organizer: organizer2,
            date_from: '2019-12-08T20:02:35.824Z',
            date_to: '2019-12-12T20:02:35.824Z'
        },
        {
            title: 'My third event',
            description: 'Description of my third event',
            organizer: organizer2,
            date_from: '2009-12-08T20:02:35.824Z',
            date_to: '2029-12-12T20:02:35.824Z',
            image: 'https://wapo.st/2P65TfP',
            location: {
                name: 'Middle Earth'
            }
        }
    ]);
}
