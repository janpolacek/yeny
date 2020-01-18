import { Map, TileLayer } from 'react-leaflet';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GetEvents_getEvents } from '_generated/GetEvents';
import React from 'react';
import { calcDistance, calcZoomLevel, locationToLatLngTuple } from 'utils';
import { EventMapMarker } from 'components/events/EventMapMarker';
import { useHistory } from 'react-router-dom';
import { EventItemSmall } from './EventItemSmall';
import { CurrentLocationMarker, useCurrentPosition } from '../CurrentLocationMarker';

const useStyles = makeStyles(theme => {
    return {
        map: {
            width: '100%',
            height: '300px',
            overflow: 'hidden',
            marginTop: theme.spacing(2),
        },
        closestTitle: {
            padding: theme.spacing(2, 1, 0, 1),
        },
    };
});

const defaultCenter: LatLngTuple = [48.1516988, 17.1093063];
const defaultZoom = 7;

export const EventsMap: React.FC<{ events: GetEvents_getEvents[] }> = ({ events }) => {
    const classes = useStyles();
    const history = useHistory();
    const { currentPosition } = useCurrentPosition();
    const center = currentPosition ?? defaultCenter;

    const eventsWithLocation = events
        .filter(event => Boolean(event.location?.latitude && event.location?.longitude))
        .sort(
            (event1, event2) =>
                calcDistance(center, locationToLatLngTuple(event1.location)) -
                calcDistance(center, locationToLatLngTuple(event2.location))
        );

    const minDistance = calcDistance(center, locationToLatLngTuple(eventsWithLocation[0].location));
    const zoom = currentPosition ? calcZoomLevel(minDistance) : defaultZoom;

    return (
        <>
            <Map center={center} zoom={zoom} className={classes.map}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {eventsWithLocation.map(event => (
                    <EventMapMarker event={event} key={event.url} />
                ))}
                <CurrentLocationMarker location={currentPosition} />
            </Map>
            <div>
                <Typography variant={'h6'} className={classes.closestTitle}>
                    Events closest to you
                </Typography>
                <div>
                    {eventsWithLocation.slice(0, 4).map(event => (
                        <EventItemSmall
                            key={event.url}
                            result={event}
                            cardProps={{
                                elevation: 0,
                                onClick: () => {
                                    history.push(`/event/${event.url}`);
                                },
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
