import { format } from 'date-fns';
import { useEffect } from 'react';

export const DATE_FORMAT = 'dd.MM.yyyy';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

export function formatDate(date: any) {
    return format(new Date(date), DATE_FORMAT);
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
