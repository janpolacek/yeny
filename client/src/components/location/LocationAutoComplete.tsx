import React, { useCallback, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { throttle } from 'lodash-es';
import axios from 'axios';
import { NominatimPlace, NominatimPlaceOptions } from '_types/NominatimPlace';
import { LocationMap } from 'components/location/LocationMap';
import { LocationDialogNameInput } from 'components/location/LocationNameInput';
import { useFormikContext } from 'formik';
import { LocationForm } from '_types/LocationForm';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { locationToLatLngTuple } from '../../utils';
import { LocationInfo } from './LocationInfo';

const useStyles = makeStyles(theme => ({
    listbox: {
        '&.MuiAutocomplete-listbox': {
            maxHeight: '200px',
        },
    },
}));

const fetchLocationDebounced = throttle(async (query: string) => {
    const result = await axios.get<NominatimPlace[]>(`https://nominatim.openstreetmap.org/search/${query}?format=json`);
    return result.data;
}, 100);

const useLocationFormFormikValue = () => {
    const { values: location, setValues } = useFormikContext<LocationForm>();

    const setLocation = useCallback((value: LocationForm) => setValues(value), [setValues]);

    return { location, setLocation };
};

const useOsmAutoComplete = () => {
    const { location, setLocation } = useLocationFormFormikValue();

    const [options, setOptions] = React.useState<NominatimPlaceOptions>([]);

    const onInputChange = (event: React.ChangeEvent<{}>, value: any, reason: 'input' | 'reset') => {
        setLocation({
            name: value,
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
                setOptions((results ?? []).slice(0, 10));
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
                longitude: nominatim.lon,
            });
        }
    }, [options, location.name, setLocation]);

    return { options, location, onInputChange };
};

export const LocationAutoComplete = () => {
    const classes = useStyles();
    const { location, options, onInputChange } = useOsmAutoComplete();

    const loading = location?.name?.length !== 0 && options === undefined;
    const position = location.latitude && location.longitude ? locationToLatLngTuple(location) : undefined;

    return (
        <>
            <Autocomplete
                id="location"
                classes={{
                    listbox: classes.listbox,
                }}
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
                renderInput={params => <LocationDialogNameInput loading={loading} params={params} />}
                renderOption={(option: NominatimPlace) => option.display_name}
            />
            <LocationMap position={position} />
            <LocationInfo location={location} />
        </>
    );
};
