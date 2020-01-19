import gql from 'graphql-tag';

export const CALENDAR = gql`
    query Calendar {
        calendar {
            days
        }
    }
`;
