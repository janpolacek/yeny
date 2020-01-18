import React from 'react';
import { Marker } from 'react-leaflet';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetinaIcon from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import { icon, LatLngTuple } from 'leaflet';

export const DefaultMarker: React.FC<{ className?: string; position: LatLngTuple; children: React.ReactNode }> = ({
    className,
    position,
    children,
}) => {
    return (
        <Marker
            position={position}
            icon={icon({
                className: className,
                iconRetinaUrl: markerRetinaIcon,
                iconUrl: markerIcon,
                shadowUrl: markerShadow,
            })}
        >
            {children}
        </Marker>
    );
};
