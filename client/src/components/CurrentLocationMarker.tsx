import React, { useEffect, useState } from 'react';
import { LatLngTuple } from 'leaflet';
import { Popup } from 'react-leaflet';
import Typography from '@material-ui/core/Typography';
import { DefaultMarker } from './DefaultMarket';

export const CurrentLocationMarker: React.FC<{ location?: LatLngTuple | null }> = ({ location }) => {
    if (!location) {
        return null;
    }

    return (
        <DefaultMarker position={location}>
            <Popup>
                <Typography variant={'body1'}>Your current location</Typography>
            </Popup>
        </DefaultMarker>
    );
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
