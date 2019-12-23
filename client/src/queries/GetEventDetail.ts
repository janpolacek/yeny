import { gql } from 'apollo-boost';

export const GET_EVENT_DETAIL_BY_URL = gql`
    query GetEventDetail($url: String!) {
        eventByUrl(url: $url) {
            title
            url
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
                surname
                phone
                email
            }
            image
        }
    }
`;
