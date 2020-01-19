import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { EventByUrl, EventByUrlVariables } from '_generated/EventByUrl';
import { GET_EVENT_DETAIL_BY_URL } from '_queries/GetEventDetail';
import Typography from '@material-ui/core/Typography';
import { formatDate, formatDateAndTime, formatPrice, locationToLatLngTuple } from 'utils';
import placeholderWhite from 'assets/placeholder_white.png';
import { CardContent, Grid } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import * as colors from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';
import { Map, TileLayer } from 'react-leaflet';
import { DefaultMarker } from '../components/DefaultMarket';
import { LocationInfo } from '../components/location/LocationInfo';
import { LocationInput } from '../_generated/globalTypes';
import { GetEvents_events, GetEvents_events_location } from '../_generated/GetEvents';
import Button from '@material-ui/core/Button';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PlaceIcon from '@material-ui/icons/Place';

const useStyles = makeStyles(theme => ({
    detailHeader: {
        borderBottom: `1px solid ${colors.grey['300']}`,
    },
    container: {
        flexShrink: 0,
        padding: theme.spacing(2, 2, 2, 3),
    },
    infoContainer: {
        backgroundColor: colors.grey['100'],
    },
    baseInfoDetail: {
        justifyContent: 'flex-start',
        display: 'flex',
        '& svg': {
            marginRight: theme.spacing(1),
        },
    },
    detailsContainer: {},
    detailTitle: {
        marginBottom: theme.spacing(0.5),
    },
    detailSubblock: {
        padding: theme.spacing(2, 0, 2, 0),
        '&:first-of-type': {
            marginTop: -theme.spacing(4),
        },
    },
    cover: {
        display: 'flex',
        flexShrink: 0,
        paddingBottom: '40%',
        width: '100%',
    },
    dateFrom: {
        color: colors.red.A700,
    },
    delimiter: {
        color: colors.grey['400'],
        margin: `0 ${theme.spacing(0.5)}px`,
    },
    titleAndOrganizer: {
        textTransform: 'capitalize',
    },
    price: {
        alignSelf: 'flex-end',
    },
    actions: {
        alignSelf: 'flex-end',
    },
    map: {
        width: '100%',
        height: '200px',
        overflow: 'hidden',
        marginTop: theme.spacing(1),
    },
}));

export const EventDetailPage: React.FC<{ url: string }> = ({ url }) => {
    const classes = useStyles();

    const { data, loading, error } = useQuery<EventByUrl, EventByUrlVariables>(GET_EVENT_DETAIL_BY_URL, {
        variables: { url: url },
    });

    const event = data?.getEvent;

    useEffect(() => {
        if (event?.title) {
            document.title = `Yeny | ${event.title}`;
        }
        return () => {
            document.title = 'Yeny';
        };
    }, [event]);

    if (error) {
        return <div>ERROR</div>;
    }

    if (loading || !event) {
        return <div>LOADING</div>;
    }

    return (
        <Grid container item xs={12}>
            <Card>
                <Grid container className={classes.detailHeader}>
                    <Grid item xs={7}>
                        <CardMedia image={event.image ?? placeholderWhite} className={classes.cover} />
                    </Grid>
                    <Grid container item xs={5} className={`${classes.container} ${classes.infoContainer}`}>
                        <Grid item xs={12}>
                            <Typography variant={'h5'} className={classes.titleAndOrganizer}>
                                {event.title}
                            </Typography>
                            <Typography variant={'subtitle1'}>by {event.organizer.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <BaseInfoDetail>
                                <CalendarTodayIcon /> {formatDate(event.dateFrom)}
                            </BaseInfoDetail>
                            {event.location ? (
                                <BaseInfoDetail>
                                    <PlaceIcon /> {event.location?.name}
                                </BaseInfoDetail>
                            ) : null}
                        </Grid>
                        <Grid container item xs={12} className={classes.price}>
                            <Grid item xs={9}>
                                <Typography variant={'h6'}>{formatPrice(event.price)}</Typography>
                            </Grid>
                            <Grid item xs={'auto'} className={classes.actions}>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={7}>
                                <DetailTitle>Description</DetailTitle>
                                <Typography variant={'body1'}>{event.description}</Typography>
                            </Grid>
                            <Grid container item xs={5} className={`${classes.container} ${classes.detailsContainer}`}>
                                <Grid item xs={12}>
                                    <DetailOrganizerBlock event={event} />
                                    <DetailDateTimeBlock event={event} />
                                    <DetailLocationBlock event={event} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
            </Card>
        </Grid>
    );
};

const DetailSubblock: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const classes = useStyles();

    return <div className={classes.detailSubblock}>{children}</div>;
};

const DetailTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const classes = useStyles();

    return (
        <Typography variant={'subtitle2'} className={classes.detailTitle}>
            {children}
        </Typography>
    );
};

const DetailMap: React.FC<{ location: GetEvents_events_location | null }> = ({ location }) => {
    const classes = useStyles();

    if (!location) {
        return null;
    }

    const position = locationToLatLngTuple(location);

    return (
        <>
            <Map center={position} zoom={10} className={classes.map}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <DefaultMarker position={position} />
            </Map>
            <LocationInfo location={location as Partial<LocationInput>} />
        </>
    );
};

const AddToCalendar = () => {
    return (
        <Button variant="text" startIcon={<InsertInvitationIcon />}>
            Add to calendar
        </Button>
    );
};

const DetailOrganizerBlock: React.FC<{ event: GetEvents_events }> = ({ event }) => {
    return (
        <DetailSubblock>
            <DetailTitle>Organizer</DetailTitle>
            <Typography variant={'subtitle1'}>
                {event.organizer.name} (<Link href={`mailto:${event.organizer.email}`}>{event.organizer.email}</Link>)
            </Typography>
        </DetailSubblock>
    );
};

const DetailDateTimeBlock: React.FC<{ event: GetEvents_events }> = ({ event }) => {
    return (
        <DetailSubblock>
            <DetailTitle>Date and time</DetailTitle>
            <Typography variant={'body1'}>
                {formatDateAndTime(event.dateFrom)} - {formatDateAndTime(event.dateTo)}
            </Typography>
            <AddToCalendar />
        </DetailSubblock>
    );
};

const DetailLocationBlock: React.FC<{ event: GetEvents_events }> = ({ event }) => {
    return (
        <DetailSubblock>
            <DetailTitle>Location</DetailTitle>
            <Typography variant={'body1'}>{event.location?.name}</Typography>
            <DetailMap location={event.location} />
        </DetailSubblock>
    );
};

const BaseInfoDetail: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const classes = useStyles();
    return (
        <Typography variant={'subtitle1'} className={classes.baseInfoDetail}>
            {children}
        </Typography>
    );
};
