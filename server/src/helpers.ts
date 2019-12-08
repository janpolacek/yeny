
import { getRepository} from "typeorm";

import { Event } from "./entities/Event";

export async function seedDatabase() {
    const eventRepository = getRepository(Event);

    const defaultEvent = eventRepository.create({
        name: 'Prvy event',
        date: Date.now()
    });
    await eventRepository.save(defaultEvent);

    return {
        defaultEvent
    };
}
