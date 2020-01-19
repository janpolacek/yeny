import gql from 'graphql-tag';

export const GET_EVENTS = gql`
    query GetEvents($take: Int, $skip: Int, $date: DateTime) {
        events(take: $take, skip: $skip, date: $date) {
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
