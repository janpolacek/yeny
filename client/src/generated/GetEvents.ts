/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEvents
// ====================================================

export interface GetEvents_events {
    __typename: 'Event';
    id: string;
    title: string;
    description: string;
    image: string;
    dateFrom: any;
    dateTo: any;
}

export interface GetEvents {
    events: GetEvents_events[] | null;
}

export interface GetEventsVariables {
    take?: number | null;
}
