import { gql } from 'apollo-boost';

export const GET_EVENTS = gql`
    query GetEvents($take: Int) {
        events(take: $take) {
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
