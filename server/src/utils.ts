import { Event } from './entities/Event';
import speakingurl from 'speakingurl';
import uuid from 'uuid/v4';

export function uniqueSpeakingUrl(title: Event['title']): string {
    return `${speakingurl(title)}-${uuid().slice(0, 6)}`;
}
