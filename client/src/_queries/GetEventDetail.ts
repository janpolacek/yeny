import gql from 'graphql-tag';

export const GET_EVENT_DETAIL_BY_URL = gql`
    query EventByUrl($url: String!) {
        getEvent(url: $url) {
            title
            description
            url
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

            price
        }
    }
`;
