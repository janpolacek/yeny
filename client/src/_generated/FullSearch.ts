/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FullSearch
// ====================================================

export interface FullSearch_fullSearch_location {
    __typename: 'Location';
    name: string | null;
}

export interface FullSearch_fullSearch_organizer {
    __typename: 'Organizer';
    name: string;
}

export interface FullSearch_fullSearch {
    __typename: 'Event';
    title: string;
    url: string;
    price: number | null;
    description: string;
    image: string | null;
    dateFrom: any;
    dateTo: any;
    location: FullSearch_fullSearch_location | null;
    organizer: FullSearch_fullSearch_organizer;
}

export interface FullSearch {
    fullSearch: FullSearch_fullSearch[] | null;
}

export interface FullSearchVariables {
    query: string;
}
