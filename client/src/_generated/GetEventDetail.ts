/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEventDetail
// ====================================================

export interface GetEventDetail_eventByUrl_location {
    __typename: 'Location';
    longitude: string | null;
    latitude: string | null;
    name: string | null;
}

export interface GetEventDetail_eventByUrl_organizer {
    __typename: 'Organizer';
    name: string;
    email: string;
}

export interface GetEventDetail_eventByUrl {
    __typename: 'Event';
    title: string;
    description: string;
    url: string;
    location: GetEventDetail_eventByUrl_location | null;
    dateFrom: any;
    dateTo: any;
    organizer: GetEventDetail_eventByUrl_organizer;
    image: string | null;
    price: number | null;
}

export interface GetEventDetail {
    eventByUrl: GetEventDetail_eventByUrl | null;
}

export interface GetEventDetailVariables {
    url: string;
}
