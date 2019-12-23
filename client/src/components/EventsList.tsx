import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetEvents, GetEvents_events, GetEventsVariables } from '../generated/GetEvents';
import { GET_EVENTS } from '../queries/GetEvents';
import { useHistory } from 'react-router-dom';

export const EventsList = () => {
    const { loading, error, data } = useQuery<GetEvents, GetEventsVariables>(GET_EVENTS, { variables: {} });

    if (error) {
        return <div>ERROR</div>;
    }

    if (loading || !data) {
        return <div>LOADING</div>;
    }

    return (
        <>
            {data.events?.map(event => (
                <EventItem event={event} key={event.url} />
            ))}
        </>
    );
};

const EventItem = ({ event }: { event: GetEvents_events }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/event/${event.url}`);
    };
    return (
        <div onClick={handleClick}>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
            <img src={event.image} alt={event.title} />
            <span>{event.dateFrom}</span>
            <span>{event.dateTo}</span>
        </div>
    );
};
