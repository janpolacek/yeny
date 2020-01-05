/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEvents
// ====================================================

export interface GetEvents_events_location {
    __typename: 'Location';
    name: string | null;
}

export interface GetEvents_events_organizer {
    __typename: 'Organizer';
    name: string;
}

export interface GetEvents_events {
    __typename: 'Event';
    title: string;
    url: string;
    price: number | null;
    description: string;
    image: string | null;
    dateFrom: any;
    dateTo: any;
    location: GetEvents_events_location | null;
    organizer: GetEvents_events_organizer;
}

export interface GetEvents {
    events: GetEvents_events[] | null;
}

export interface GetEventsVariables {
    take?: number | null;
}
