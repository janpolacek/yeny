import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { GetEvents, GetEvents_events, GetEventsVariables } from '../generated/GetEvents';

const GET_EVENTS = gql`
    query GetEvents($take: Int) {
        events(take: $take) {
            id
            title
            description
            image
            dateFrom
            dateTo
        }
    }
`;

export const EventsList = () => {
    const { loading, error, data } = useQuery<GetEvents, GetEventsVariables>(GET_EVENTS, { variables: {} });
    if (loading) {
        return <div>LOADING</div>;
    }

    if (error) {
        return <div>ERROR</div>;
    }

    if (!data?.events?.length) {
        return <div>EMPTY</div>;
    }
    return (
        <>
            {data.events.map(event => (
                <EventItem event={event} key={event.id} />
            ))}
        </>
    );
};

const EventItem = ({ event }: { event: GetEvents_events }) => (
    <div>
        <h4>{event.title}</h4>
        <p>{event.description}</p>
        <img src={event.image} alt={event.title} />
        <span>{event.dateFrom}</span>
        <span>{event.dateTo}</span>
    </div>
);
