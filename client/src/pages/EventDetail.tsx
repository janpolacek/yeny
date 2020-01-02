import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetEventDetail, GetEventDetailVariables } from '../generated/GetEventDetail';
import { GET_EVENT_DETAIL_BY_URL } from '../queries/GetEventDetail';
import { Typography } from '@material-ui/core';
import { formatDate } from '../utils';

export const EventDetail: React.FC<{ url: string }> = ({ url }) => {
    const { data, loading, error } = useQuery<GetEventDetail, GetEventDetailVariables>(GET_EVENT_DETAIL_BY_URL, {
        variables: { url: url }
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (error) {
        return <div>ERROR</div>;
    }

    if (loading || !data) {
        return <div>LOADING</div>;
    }

    return (
        <main>
            <Typography component={'h2'}>{data.eventByUrl.title}</Typography>
            <Typography variant={'body1'}>{data.eventByUrl.description}</Typography>
            <Typography variant={'body1'}>
                {formatDate(data?.eventByUrl.dateFrom)} - {formatDate(data?.eventByUrl.dateTo)}
            </Typography>
            <img src={data.eventByUrl.image} alt={data.eventByUrl.title} />
        </main>
    );
};
