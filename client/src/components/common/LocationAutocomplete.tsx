import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { RenderInputParams } from '@material-ui/lab/Autocomplete';
import { throttle } from 'lodash-es';
import axios from 'axios';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const useStyles = makeStyles(theme => {
    return {
        map: {
            width: '100%',
            height: '300px',
            overflow: 'hidden',
            marginTop: theme.spacing(2)
        }
    };
});

const fetchLocationThrottled = throttle(async (query: string) => {
    const result = await axios.get(`https://nominatim.openstreetmap.org/search/${query}?format=json`);
    return result.data;
}, 200);

const LocationInput: React.FC<{
    params: RenderInputParams;
    loading: boolean;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ params, loading, handleChange }) => {
    return (
        <TextField
            {...params}
            label="Add location"
            fullWidth
            onChange={handleChange}
            variant="outlined"
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </React.Fragment>
                )
            }}
        />
    );
};

export const LocationAutocomplete = () => {
    const [options, setOptions] = React.useState<[] | undefined>([]);
    const [inputValue, setInputValue] = React.useState('');

    const loading = inputValue.length !== 0 && options === undefined;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    React.useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions([]);
            return;
        }

        setOptions(undefined);

        fetchLocationThrottled(inputValue).then(results => {
            if (active) {
                setOptions(results || []);
            }
        });

        return () => {
            active = false;
        };
    }, [inputValue]);

    return (
        <>
            <Autocomplete
                id="location"
                getOptionLabel={option => option.display_name}
                filterOptions={x => x}
                options={options}
                autoComplete
                includeInputInList
                freeSolo
                disablePortal
                disableOpenOnFocus
                renderInput={params => <LocationInput handleChange={handleChange} loading={loading} params={params} />}
                renderOption={option => option.display_name}
            />
            <LocationMap />
        </>
    );
};

const LocationMap = () => {
    const classes = useStyles();
    const position: LatLngTuple = [51.505, -0.09];
    return (
        <Map center={position} zoom={13} className={classes.map}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} />
        </Map>
    );
};
