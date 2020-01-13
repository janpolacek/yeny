import { icon, LatLngTuple } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    red: {
        filter: 'hue-rotate(-205deg) saturate(1.5)',
    },
}));
export const CurrentLocationMarker: React.FC<{ location?: LatLngTuple | null }> = ({ location }) => {
    const classes = useStyles();
    return location ? (
        <Marker
            position={location}
            icon={icon({
                className: classes.red,
                iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
                iconUrl: require('leaflet/dist/images/marker-icon.png'),
                shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
            })}
        >
            <Popup>
                <Typography variant={'body1'}>Your current location</Typography>
            </Popup>
        </Marker>
    ) : null;
};

export const useCurrentPosition = () => {
    const [currentPosition, setCurrentPosition] = useState<LatLngTuple | null>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setCurrentPosition([position.coords.latitude, position.coords.longitude]);
        });
    }, []);

    return { currentPosition };
};
