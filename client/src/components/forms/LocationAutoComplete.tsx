import React, { useCallback, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { throttle } from 'lodash-es';
import axios from 'axios';
import { NominatimPlace, NominatimPlaceOptions } from '../../_types/NominatimPlace';
import { LocationMap } from './LocationMap';
import { LatLngTuple } from 'leaflet';
import { LocationAutoCompleteInput } from './LocationInput';
import { useCreateEventFormikContext } from './useCreateEventFormikContext';
import { CreateEventFormValues } from '../../_types/CreateEventForm';

const fetchLocationDebounced = throttle(async (query: string) => {
    const result = await axios.get<NominatimPlace[]>(`https://nominatim.openstreetmap.org/search/${query}?format=json`);
    return result.data;
}, 200);

const useOsmAutoComplete = () => {
    const {
        values: { location },
        setFieldValue
    } = useCreateEventFormikContext();

    const [options, setOptions] = React.useState<NominatimPlaceOptions>([]);
    const setLocation = useCallback(
        (value: Partial<CreateEventFormValues['location']>) => setFieldValue('location', value),
        [setFieldValue]
    );

    const onInputChange = (event: React.ChangeEvent<{}>, value: any, reason: 'input' | 'reset') => {
        setLocation({
            name: value
        });
    };

    useEffect(() => {
        let active = true;

        if (!location.name) {
            setOptions([]);
            return;
        }

        setOptions(undefined);

        fetchLocationDebounced(location.name).then(results => {
            if (active) {
                setOptions(results || []);
            }
        });

        return () => {
            active = false;
        };
    }, [location.name]);

    useEffect(() => {
        const nominatim = options?.filter(option => option.display_name === location.name)[0];
        if (nominatim) {
            setLocation({
                name: nominatim.display_name,
                latitude: nominatim.lat,
                longitude: nominatim.lon
            });
        }
    }, [options, location.name, setLocation]);

    return { options, location, onInputChange };
};

export const LocationAutoComplete = () => {
    const { location, options, onInputChange } = useOsmAutoComplete();

    const loading = location?.name?.length !== 0 && options === undefined;
    const position =
        location.latitude && location.longitude
            ? ([Number(location.latitude), Number(location.longitude)] as LatLngTuple)
            : undefined;

    return (
        <>
            <Autocomplete
                id="location"
                getOptionLabel={(option: NominatimPlace | string) =>
                    typeof option === 'string' ? option : option.display_name
                }
                options={options}
                autoHighlight
                blurOnSelect
                includeInputInList
                freeSolo
                loading={loading}
                noOptionsText={'No options'}
                disablePortal
                disableOpenOnFocus
                value={location.name}
                onInputChange={onInputChange}
                renderInput={params => <LocationAutoCompleteInput loading={loading} params={params} />}
                renderOption={(option: NominatimPlace) => option.display_name}
            />
            <LocationMap position={position} />
        </>
    );
};
