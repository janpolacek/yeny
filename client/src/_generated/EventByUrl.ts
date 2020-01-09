/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EventByUrl
// ====================================================

export interface EventByUrl_getEvent_location {
    __typename: 'Location';
    longitude: string | null;
    latitude: string | null;
    name: string | null;
}

export interface EventByUrl_getEvent_organizer {
    __typename: 'Organizer';
    name: string;
    email: string;
}

export interface EventByUrl_getEvent {
    __typename: 'Event';
    title: string;
    description: string;
    url: string;
    location: EventByUrl_getEvent_location | null;
    dateFrom: any;
    dateTo: any;
    organizer: EventByUrl_getEvent_organizer;
    image: string | null;
    price: number | null;
}

export interface EventByUrl {
    getEvent: EventByUrl_getEvent | null;
}

export interface EventByUrlVariables {
    url: string;
}
