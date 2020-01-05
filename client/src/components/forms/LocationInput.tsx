import React from 'react';
import { RenderInputParams } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';

export const LocationAutoCompleteInput: React.FC<{
    params: RenderInputParams;
    loading: boolean;
}> = ({ params, loading }) => {
    return (
        <TextField
            {...params}
            label="Add location"
            fullWidth
            variant="outlined"
            required
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
