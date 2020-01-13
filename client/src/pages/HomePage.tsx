import React from 'react';
import { EventsList, EventsListLoader } from 'components/events/EventsList';
import { useQuery } from '@apollo/react-hooks';
import { GetEvents, GetEventsVariables } from '../_generated/GetEvents';
import { GET_EVENTS } from '../_queries/GetEvents';
import { Grid } from '@material-ui/core';
import { EventsMap } from '../components/events/EventsMap';

export const HomePage = () => {
    const { loading, error, data } = useQuery<GetEvents, GetEventsVariables>(GET_EVENTS, { variables: {} });

    if (error) {
        return <div>ERROR</div>;
    }

    if (loading || !data?.getEvents) {
        return <EventsListLoader />;
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <EventsList events={data.getEvents} />
            </Grid>
            <Grid item xs={false} md={4}>
                <EventsMap events={data.getEvents} />
            </Grid>
        </Grid>
    );
};
