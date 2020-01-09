import { CreateEventVariables } from '_generated/CreateEvent';
import { LocationInput, OrganizerInput } from '_generated/globalTypes';

export type CreateEventFormValues = {
    organizer: OrganizerInput;
    image: File | null;
    title: CreateEventVariables['title'];
    location: LocationInput;
    description: CreateEventVariables['description'];
    dateFrom: CreateEventVariables['dateFrom'];
    dateTo: CreateEventVariables['dateTo'];
    price: CreateEventVariables['price'];
    password: CreateEventVariables['password'];
};
