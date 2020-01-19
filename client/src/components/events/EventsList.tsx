import React from 'react';
import { GetEvents_events } from '_generated/GetEvents';
import { EventItem, EventItemSkeleton } from 'components/events/EventItem';
import Typography from '@material-ui/core/Typography/Typography';

export const EventsList: React.FC<{ events: GetEvents_events[] | undefined | null }> = ({ events }) => {
    if (!events) {
        return <EventsListLoader />;
    }

    if (!events.length) {
        return <Typography variant={'h6'}>No events found</Typography>;
    }
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
