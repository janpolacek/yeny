import { format } from 'date-fns';
import { useEffect } from 'react';
import { LatLngTuple } from 'leaflet';
import { GetEvents_events_location } from './_generated/GetEvents';

export const DATE_FORMAT = 'dd.MM.yyyy';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

export function formatDate(date: any) {
    return format(new Date(date), DATE_FORMAT);
}

export function formatDateAndTime(date: any) {
    return format(new Date(date), DATE_TIME_FORMAT);
}

export function formatPrice(price: number | null) {
    if (price == null) {
        return '';
    }

    if (price === 0) {
        return 'Free';
    }

    return `${price} €`;
}

export const useScrollTop = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
};

export function calcDistance([lat1, lon1]: LatLngTuple, [lat2, lon2]: LatLngTuple): number {
    const R = 6371; // km (change this constant to get miles)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export function calcZoomLevel(distanceOffice: number, widthInPixels = 300) {
    const equatorLength = 40075004; // in meters
    let metersPerPixel = equatorLength / 256;
    let zoomLevel = 1;
    while (metersPerPixel * widthInPixels > distanceOffice) {
        metersPerPixel /= 2;
        ++zoomLevel;
    }
    // zoom level is default 13 in office map for that we ll do -13 BUT when we do that markers are barely visible so we raised by one to -14
    return zoomLevel - 14;
}

export const shortenText = (text: string = '', max: number) => {
    return text.length > max ? `${text.slice(0, max)}...` : text;
};

export const locationToLatLngTuple = (location: Partial<GetEvents_events_location> | null): LatLngTuple => {
    return [Number(location?.latitude), Number(location?.longitude)];
};
