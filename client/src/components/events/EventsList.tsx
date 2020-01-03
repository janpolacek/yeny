import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetEvents, GetEventsVariables } from '../../generated/GetEvents';
import { GET_EVENTS } from '../../queries/GetEvents';
import { EventItem, EventItemSkeleton } from './EventItem';
import { makeStyles, Typography } from '@material-ui/core';
import * as colors from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    header: { marginBottom: theme.spacing(2), color: colors.grey['900'], textAlign: 'center' }
}));

export const EventsList = () => {
    const classes = useStyles();
    const { loading, error, data } = useQuery<GetEvents, GetEventsVariables>(GET_EVENTS, { variables: {} });

    if (error) {
        return <div>ERROR</div>;
    }

    if (loading || !data) {
        return <EventsListLoader />;
    }

    return (
        <>
            <Typography component={'h2'} variant={'h5'} className={classes.header}>
                Your events nearby You
            </Typography>
            {data.events?.map(event => (
                <EventItem event={event} key={event.url} />
            ))}
        </>
    );
};

const EventsListLoader = () => {
    const classes = useStyles();
    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<EventItemSkeleton />);
    }
    return (
        <>
            <Typography variant={'h5'} className={`${classes.header}`}>
                Loading your events ...
            </Typography>
            {skeleton}
        </>
    );
};
