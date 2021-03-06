import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import * as colors from '@material-ui/core/colors';
import React from 'react';
import { GetEvents_events } from '_generated/GetEvents';
import { useHistory } from 'react-router-dom';
import placeholderWhite from 'assets/placeholder_white.png';
import { locationToLatLngTuple, shortenText } from 'utils';
import { Popup } from 'react-leaflet';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { DefaultMarker } from '../DefaultMarket';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        padding: theme.spacing(0),
        '&:hover': {
            cursor: 'pointer',
        },
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    content: {
        flex: '1 0 auto',
        padding: 0,
        '&:last-child': {
            paddingBottom: 0,
        },
    },
    location: {
        textTransform: 'capitalize',
        display: 'flex',
        alignItems: 'center',
        margin: '0 !important',

        marginBottom: theme.spacing(1),
    },
    delimiter: {
        color: colors.grey['400'],
        margin: `0 ${theme.spacing(0.5)}px`,
    },
    title: {
        textTransform: 'capitalize',
        margin: '0 !important',
    },
    description: {
        margin: '0 !important',
        textTransform: 'capitalize',
        color: colors.grey['800'],
    },

    cover: {
        flexShrink: 0,
        height: 100,
        width: 100,
        border: `1px solid ${colors.grey['300']}`,
        marginRight: theme.spacing(2),
    },
    popup: {
        '& .leaflet-popup-content': {
            margin: theme.spacing(1, 2, 1, 1),
        },
    },
    redIcon: {
        filter: 'hue-rotate(-215deg) saturate(1.1)',
    },
}));

export const EventMapMarker: React.FC<{ event: GetEvents_events }> = ({ event }) => {
    const classes = useStyles({});

    const history = useHistory();

    const handleClick = () => {
        history.push(`/event/${event.url}`);
    };
    const position = locationToLatLngTuple(event.location);

    return (
        <DefaultMarker position={position} className={classes.redIcon}>
            <Popup className={classes.popup}>
                <Card onClick={handleClick} className={`${classes.card}`} elevation={0}>
                    <CardMedia className={classes.cover} image={event.image ?? placeholderWhite} title={event.title} />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography variant={'subtitle1'} className={classes.title} noWrap>
                                {event.title}
                            </Typography>
                            {event.location?.name && (
                                <Typography variant={'body2'} className={classes.location} noWrap>
                                    <LocationOnIcon fontSize={'small'} /> {event.location.name}
                                </Typography>
                            )}
                            <Typography variant={'body2'} className={classes.location} noWrap>
                                {event.organizer.name}
                            </Typography>
                            <Typography variant={'body2'} className={classes.description} noWrap>
                                {shortenText(event.description, 30)}
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </Popup>
        </DefaultMarker>
    );
};
