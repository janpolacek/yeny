import { gql } from 'apollo-boost';

export const GET_EVENTS = gql`
    query GetEvents($take: Int) {
        events(take: $take) {
            title
            url
            description
            image
            dateFrom
            dateTo
        }
    }
`;
