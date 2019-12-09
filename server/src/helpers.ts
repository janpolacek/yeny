import { getRepository } from 'typeorm';
import { Event } from './entities/Event';
import events from './mock/events.json';

export async function seedDatabase() {
    await getRepository(Event).save(events);
}
