/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEventDetailByUrl
// ====================================================

export interface GetEventDetailByUrl_eventByUrl_location {
    __typename: 'Location';
    longitude: string | null;
    latitude: string | null;
    name: string | null;
}

export interface GetEventDetailByUrl_eventByUrl_organizer {
    __typename: 'Organizer';
    name: string;
    surname: string;
    phone: string;
    email: string;
}

export interface GetEventDetailByUrl_eventByUrl {
    __typename: 'Event';
    title: string;
    description: string;
    location: GetEventDetailByUrl_eventByUrl_location | null;
    dateFrom: any;
    dateTo: any;
    organizer: GetEventDetailByUrl_eventByUrl_organizer;
    image: string;
}

export interface GetEventDetailByUrl {
    eventByUrl: GetEventDetailByUrl_eventByUrl;
}

export interface GetEventDetailByUrlVariables {
    url: string;
}
