/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LocationInput, OrganizerInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: CreateEvent
// ====================================================

export interface CreateEvent_createEvent_location {
    __typename: 'Location';
    longitude: string | null;
    latitude: string | null;
    name: string | null;
}

export interface CreateEvent_createEvent_organizer {
    __typename: 'Organizer';
    name: string;
    email: string;
}

export interface CreateEvent_createEvent {
    __typename: 'Event';
    title: string;
    description: string;
    url: string;
    location: CreateEvent_createEvent_location | null;
    dateFrom: any;
    dateTo: any;
    organizer: CreateEvent_createEvent_organizer;
    image: string | null;
    price: number | null;
}

export interface CreateEvent {
    createEvent: CreateEvent_createEvent;
}

export interface CreateEventVariables {
    title: string;
    description: string;
    location: LocationInput;
    organizer: OrganizerInput;
    dateFrom: any;
    dateTo: any;
    image?: string | null;
    password: string;
    price?: number | null;
}
