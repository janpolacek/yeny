/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEventDetail
// ====================================================

export interface GetEventDetail_eventById_location {
    __typename: 'Location';
    longitude: string;
    latitude: string;
    name: string;
}

export interface GetEventDetail_eventById_organizer {
    __typename: 'User';
    name: string;
    surname: string;
    phone: string;
    email: string;
}

export interface GetEventDetail_eventById {
    __typename: 'Event';
    id: string;
    title: string;
    description: string;
    location: GetEventDetail_eventById_location | null;
    dateFrom: any;
    dateTo: any;
    organizer: GetEventDetail_eventById_organizer;
    image: string;
}

export interface GetEventDetail {
    eventById: GetEventDetail_eventById;
}

export interface GetEventDetailVariables {
    id: number;
}
