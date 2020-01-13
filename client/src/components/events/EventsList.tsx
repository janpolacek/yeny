import React from 'react';
import { GetEvents_getEvents } from '_generated/GetEvents';
import { EventItem, EventItemSkeleton } from 'components/events/EventItem';
import { makeStyles, Typography } from '@material-ui/core';
import * as colors from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    header: { marginBottom: theme.spacing(2), color: colors.grey['900'], textAlign: 'center' },
}));

export const EventsList: React.FC<{ events: GetEvents_getEvents[] }> = ({ events }) => {
    const classes = useStyles();

    return (
        <>
            {events.map(event => (
                <EventItem event={event} key={event.url} />
            ))}
        </>
    );
};

export const EventsListLoader = () => {
    const classes = useStyles();
    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<EventItemSkeleton key={i} />);
    }
    return <>{skeleton}</>;
};
