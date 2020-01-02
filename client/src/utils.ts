import { format } from 'date-fns';

export function formatDate(date: any) {
    return format(new Date(date), 'dd.MM.yyyy');
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
