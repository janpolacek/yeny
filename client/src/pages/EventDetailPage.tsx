import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetEventDetail, GetEventDetailVariables } from '../_generated/GetEventDetail';
import { GET_EVENT_DETAIL_BY_URL } from '../_queries/GetEventDetail';
import { Typography } from '@material-ui/core';
import { formatDate } from '../utils';
import placeholderWhite from '../assets/placeholder_white.png';

export const EventDetailPage: React.FC<{ url: string }> = ({ url }) => {
    const { data, loading, error } = useQuery<GetEventDetail, GetEventDetailVariables>(GET_EVENT_DETAIL_BY_URL, {
        variables: { url: url }
    });

    if (error) {
        return <div>ERROR</div>;
    }

    if (loading || !data?.eventByUrl) {
        return <div>LOADING</div>;
    }

    return (
        <>
            <Typography component={'h2'}>{data.eventByUrl.title}</Typography>
            <Typography variant={'body1'}>{data.eventByUrl.description}</Typography>
            <Typography variant={'body1'}>
                {formatDate(data?.eventByUrl.dateFrom)} - {formatDate(data?.eventByUrl.dateTo)}
            </Typography>
            <img src={data.eventByUrl.image ?? placeholderWhite} alt={data.eventByUrl.title} />
        </>
    );
};
