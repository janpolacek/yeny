import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { makeStyles } from '@material-ui/core';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CurrentLocationMarker, useCurrentPosition } from '../../CurrentLocationMarker';

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
    };
});

const defaultCenter: LatLngTuple = [48.1516988, 17.1093063];

export const LocationMap: React.FC<{ position?: LatLngTuple }> = ({ position }) => {
    const classes = useStyles();
    const { currentPosition } = useCurrentPosition();
    const center = position ?? currentPosition ?? defaultCenter;
    return (
        <Map center={center} zoom={10} className={classes.map}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {position && <Marker position={position} />}
            <CurrentLocationMarker location={currentPosition} />
        </Map>
    );
};
