/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEvents
// ====================================================

export interface GetEvents_getEvents_location {
    __typename: 'Location';
    name: string | null;
    latitude: string | null;
    longitude: string | null;
}

export interface GetEvents_getEvents_organizer {
    __typename: 'Organizer';
    name: string;
    email: string;
}

export interface GetEvents_getEvents {
    __typename: 'Event';
    title: string;
    url: string;
    price: number | null;
    description: string;
    image: string | null;
    dateFrom: any;
    dateTo: any;
    location: GetEvents_getEvents_location | null;
    organizer: GetEvents_getEvents_organizer;
}

export interface GetEvents {
    getEvents: GetEvents_getEvents[] | null;
}

export interface GetEventsVariables {
    take?: number | null;
}
