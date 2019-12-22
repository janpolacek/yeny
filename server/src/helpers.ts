import { getRepository } from 'typeorm';
import { Event } from './entities/Event';
import eventsFixture from './fixtures/events';

export async function seedDatabase() {
    const eventRepository = getRepository(Event);
    await eventRepository.save(eventsFixture);
}
