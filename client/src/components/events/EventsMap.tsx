import React from 'react';
import { useHistory } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { LatLngTuple } from 'leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css'; // inside .js file
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { CurrentLocationMarker, useCurrentPosition } from '../CurrentLocationMarker';
import 'leaflet/dist/leaflet.css';
import { calcDistance, calcZoomLevel, locationToLatLngTuple } from 'utils';
import { EventMapMarker } from 'components/events/EventMapMarker';
import { EventItemSmall } from './EventItemSmall';
import { GetEvents_events } from '../../_generated/GetEvents';

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

export const EventsMap: React.FC<{ events: GetEvents_events[] | undefined | null }> = ({ events }) => {
    const classes = useStyles();
    const history = useHistory();
    const { currentPosition } = useCurrentPosition();
    const center = currentPosition ?? defaultCenter;

    if (!events) {
        events = [];
    }

    const eventsWithLocation = events
        .filter(event => Boolean(event.location?.latitude && event.location?.longitude))
        .sort(
            (event1, event2) =>
                calcDistance(center, locationToLatLngTuple(event1.location)) -
                calcDistance(center, locationToLatLngTuple(event2.location))
        );

    const minDistance = eventsWithLocation?.[0]
        ? calcDistance(center, locationToLatLngTuple(eventsWithLocation[0].location))
        : 0;

    const zoom = currentPosition && minDistance ? calcZoomLevel(minDistance) : defaultZoom;

    return (
        <>
            <Map center={center} zoom={zoom} className={classes.map} maxZoom={20}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <MarkerClusterGroup>
                    {eventsWithLocation.map(event => (
                        <EventMapMarker event={event} key={event.url} />
                    ))}
                </MarkerClusterGroup>
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
