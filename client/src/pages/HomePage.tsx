import React, { useCallback, useState } from 'react';
import { EventsList } from 'components/events/EventsList';
import { useQuery } from '@apollo/react-hooks';
import { GET_EVENTS } from '../_queries/GetEvents';
import Grid from '@material-ui/core/Grid';
import { EventsMap } from '../components/events/EventsMap';
import { GetEvents, GetEventsVariables } from '../_generated/GetEvents';
import { EventsDayCalendar } from '../components/EventsDayCalendar';

export const HomePage = () => {
    const [dateFilter, setDateFilter] = useState<Date | undefined>();
    const handleDateChange = useCallback(
        (date: Date | undefined) => {
            setDateFilter(date);
        },
        [setDateFilter]
    );
    const { loading, error, data } = useQuery<GetEvents, GetEventsVariables>(GET_EVENTS, {
        variables: { take: 100, date: dateFilter },
    });

    if (error) {
        return <div>ERROR</div>;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <EventsList events={data?.events} />
            </Grid>
            <Grid item xs={false} sm={false} md={4}>
                <EventsDayCalendar onChange={handleDateChange} />
                <EventsMap events={data?.events} />
            </Grid>
        </Grid>
    );
};
