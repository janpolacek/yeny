import React from 'react';
import { RenderInputParams } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { LocationForm } from '_types/LocationForm';
import AddLocationIcon from '@material-ui/icons/AddLocation';

export const LocationDialogNameInput: React.FC<{
    params: RenderInputParams;
    loading: boolean;
}> = ({ params, loading }) => {
    return (
        <TextField
            {...params}
            label="Location"
            fullWidth
            required
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </React.Fragment>
                ),
            }}
        />
    );
};

export const LocationFormNameInput: React.FC<{
    name: LocationForm['name'];
    onChange: (name?: string) => void;
    onIconClick: () => void;
}> = ({ name, onChange, onIconClick }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <TextField
            value={name}
            onChange={handleChange}
            label="Location"
            fullWidth
            required
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton aria-label="Search location" onClick={onIconClick}>
                            <AddLocationIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};
