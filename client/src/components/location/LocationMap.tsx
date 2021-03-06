import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CurrentLocationMarker, useCurrentPosition } from 'components/CurrentLocationMarker';
import { DefaultMarker } from '../DefaultMarket';

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
            {position && <DefaultMarker position={position} />}
            <CurrentLocationMarker location={currentPosition} />
        </Map>
    );
};
