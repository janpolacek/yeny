import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { EventByUrl, EventByUrlVariables } from '_generated/EventByUrl';
import { GET_EVENT_DETAIL_BY_URL } from '_queries/GetEventDetail';
import Typography from '@material-ui/core/Typography';
import { formatDate } from 'utils';
import placeholderWhite from 'assets/placeholder_white.png';

export const EventDetailPage: React.FC<{ url: string }> = ({ url }) => {
    const { data, loading, error } = useQuery<EventByUrl, EventByUrlVariables>(GET_EVENT_DETAIL_BY_URL, {
        variables: { url: url },
    });

    if (error) {
        return <div>ERROR</div>;
    }

    const event = data?.getEvent;

    if (loading || !event) {
        return <div>LOADING</div>;
    }

    return (
        <>
            <Typography component={'h2'}>{event.title}</Typography>
            <Typography variant={'body1'}>{event.description}</Typography>
            <Typography variant={'body1'}>
                {formatDate(event.dateFrom)} - {formatDate(event.dateTo)}
            </Typography>
            <img src={event.image ?? placeholderWhite} alt={event.title} />
        </>
    );
};
