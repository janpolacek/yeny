import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetEventDetail, GetEventDetailVariables } from '../generated/GetEventDetail';
import { GET_EVENT_DETAIL_BY_URL } from '../queries/GetEventDetail';

export const EventDetail: React.FC<{ url: string }> = ({ url }) => {
    const { data, loading, error } = useQuery<GetEventDetail, GetEventDetailVariables>(GET_EVENT_DETAIL_BY_URL, {
        variables: { url: url }
    });

    if (error) {
        return <div>ERROR</div>;
    }

    if (loading || !data) {
        return <div>LOADING</div>;
    }

    return (
        <div>
            <h2>{data?.eventByUrl.title}</h2>
            <p>{data.eventByUrl.description}</p>
            <img src={data.eventByUrl.image} alt={data.eventByUrl.title} />
            <span>{data.eventByUrl.dateFrom}</span>
            <span>{data.eventByUrl.dateTo}</span>
        </div>
    );
};
