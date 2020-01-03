import { Card, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import * as colors from '@material-ui/core/colors';
import { GetEvents_events } from '../../generated/GetEvents';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { formatDate } from '../../utils';
import { Skeleton } from '@material-ui/lab';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useEventListStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    cardHover: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: '1 0 auto',
        padding: 0
    },
    fromDate: {
        color: colors.red.A700
    },
    location: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1)
    },
    delimiter: {
        color: colors.grey['400'],
        margin: `0 ${theme.spacing(0.5)}px`
    },
    description: {
        color: colors.grey['800']
    },

    cover: {
        flexShrink: 0,
        height: 110,
        width: 220,
        border: `1px solid ${colors.grey['300']}`,
        marginRight: theme.spacing(2)
    }
}));

export const EventItem = ({ event }: { event: GetEvents_events }) => {
    const classes = useEventListStyles({});
    const history = useHistory();
    const [elevation, setElevation] = useState(0);

    const handleMouseOver = () => setElevation(2);
    const handleMouseOut = () => setElevation(0);

    const handleClick = () => {
        history.push(`/event/${event.url}`);
    };

    return (
        <Card
            onClick={handleClick}
            className={`${classes.card} ${classes.cardHover}`}
            elevation={elevation}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <CardMedia className={classes.cover} image={event.image} title={event.title} />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant={'h6'}>
                        <span className={classes.fromDate}>{formatDate(event.dateFrom)}</span>
                        <span className={classes.delimiter}>|</span>

                        {event.title}
                    </Typography>

                    <Typography variant={'body1'} className={classes.location}>
                        {event.location?.name && (
                            <>
                                <LocationOnIcon fontSize={'small'} /> {event.location.name}
                                <span className={classes.delimiter}>|</span>
                            </>
                        )}
                        {event.organizer.name}
                    </Typography>
                    <Typography variant={'body2'} className={classes.description}>
                        {event.description}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
};

export const EventItemSkeleton = () => {
    const classes = useEventListStyles();

    return (
        <Card className={classes.card} elevation={0}>
            <Skeleton variant={'rect'} className={classes.cover} animation={false} />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Skeleton variant={'text'} width={200} height={32} animation={false} />
                    <Skeleton variant={'text'} width={500} height={24} animation={false} />
                    <Skeleton variant={'text'} width={200} height={24} animation={false} />
                    <Skeleton variant={'text'} width={300} height={24} animation={false} />
                </CardContent>
            </div>
        </Card>
    );
};
