import { useCreateEventFormikContext } from 'components/form/useCreateEventFormikContext';
import React, { useState } from 'react';
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { FormSubTitle, FormTitle } from 'components/form/FormTitle';

export const Password = () => {
    const { getFieldProps } = useCreateEventFormikContext();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(v => !v);

    return (
        <>
            <FormTitle>Password</FormTitle>
            <FormSubTitle>You will need it for editing of your event</FormSubTitle>
            <Grid item xs={12}>
                <TextField
                    {...getFieldProps('password')}
                    label="Password"
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    fullWidth
                />
            </Grid>
        </>
    );
};
