import React from 'react';
import { GetEvents_getEvents } from '_generated/GetEvents';
import { EventItem, EventItemSkeleton } from 'components/events/EventItem';

export const EventsList: React.FC<{ events: GetEvents_getEvents[] }> = ({ events }) => {
    return (
        <>
            {events.map(event => (
                <EventItem event={event} key={event.url} />
            ))}
        </>
    );
};

export const EventsListLoader = () => {
    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<EventItemSkeleton key={i} />);
    }
    return <>{skeleton}</>;
};
