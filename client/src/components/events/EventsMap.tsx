import { Map, TileLayer } from 'react-leaflet';
import { makeStyles, Typography } from '@material-ui/core';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GetEvents_getEvents } from '_generated/GetEvents';
import React from 'react';
import { calcDistance, calcZoomLevel, locationToLatLngTuple } from 'utils';
import { EventMapMarker } from 'components/events/EventMapMarker';
import { useHistory } from 'react-router-dom';
import { EventItemSmall } from './EventItemSmall';
import { CurrentLocationMarker, useCurrentPosition } from '../CurrentLocationMarker';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

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
                    {eventsWithLocation.slice(0, 4).map(event => {
                        return (
                            <EventItemSmall
                                result={event}
                                cardProps={{
                                    elevation: 0,
                                    onClick: () => {
                                        history.push(`/event/${event.url}`);
                                    },
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};
