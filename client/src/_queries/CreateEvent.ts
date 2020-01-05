import gql from 'graphql-tag';

export const CREATE_EVENT_MUTATION = gql`
    mutation CreateEvent(
        $title: String!
        $description: String!
        $location: LocationInput!
        $organizer: OrganizerInput!
        $dateFrom: DateTime!
        $dateTo: DateTime!
        $image: String
        $password: String!
        $price: Float
    ) {
        createEvent(
            data: {
                title: $title
                description: $description
                location: $location
                organizer: $organizer
                dateFrom: $dateFrom
                dateTo: $dateTo
                image: $image
                password: $password
                price: $price
            }
        ) {
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
