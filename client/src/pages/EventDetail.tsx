import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { GetEventDetail, GetEventDetailVariables } from '../generated/GetEventDetail';

const GET_EVENTS_DETAIL = gql`
    query GetEventDetail($id: Int!) {
        eventById(id: $id) {
            id
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
                surname
                phone
                email
            }
            image
        }
    }
`;

export const EventDetail: React.FC<{ eventId: number }> = ({ eventId }) => {
    const { data, loading, error } = useQuery<GetEventDetail, GetEventDetailVariables>(GET_EVENTS_DETAIL, {
        variables: { id: eventId }
    });

    if (loading) {
        return <div>LOADING</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <h2>{data.eventById.title}</h2>
            <p>{data.eventById.description}</p>
            <img src={data.eventById.image} alt={data.eventById.title} />
            <span>{data.eventById.dateFrom}</span>
            <span>{data.eventById.dateTo}</span>
        </div>
    );
};
