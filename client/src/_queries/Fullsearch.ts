import gql from 'graphql-tag';

export const FULLSEARCH_EVENTS = gql`
    query FullSearch($query: String!) {
        fullSearch(query: $query) {
            title
            url
            price
            description
            image
            dateFrom
            dateTo
            location {
                name
            }
            organizer {
                name
            }
        }
    }
`;
