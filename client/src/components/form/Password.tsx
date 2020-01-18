import { useCreateEventFormikContext } from 'components/form/useCreateEventFormikContext';
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
                        ),
                    }}
                    fullWidth
                />
            </Grid>
        </>
    );
};
