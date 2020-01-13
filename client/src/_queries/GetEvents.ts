import gql from 'graphql-tag';

export const GET_EVENTS = gql`
    query GetEvents($take: Int) {
        getEvents(take: $take) {
            title
            url
            price
            description
            image
            dateFrom
            dateTo
            location {
                longitude
                latitude
                name
            }
            organizer {
                name
                email
            }
        }
    }
`;
