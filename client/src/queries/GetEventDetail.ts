import { gql } from 'apollo-boost';

export const GET_EVENT_DETAIL_BY_URL = gql`
    query GetEventDetailByUrl($url: String!) {
        eventByUrl(url: $url) {
            title
            description
            location {
                longitude
                latitude
                name
            }
            dateFrom
            dateTo
            organizer {
                name
                email
            }
            image
        }
    }
`;
