import Grid from '@material-ui/core/Grid';
import React, { useCallback, useState } from 'react';
import { LocationFormDialog } from 'components/location/LocationFormDialog';
import { useCreateEventFormikContext } from 'components/form/useCreateEventFormikContext';
import { LocationForm } from '_types/LocationForm';
import { LocationFormNameInput } from 'components/location/LocationNameInput';

const useCreateEventFormLocationvalue = () => {
    const {
        values: { location },
        setFieldValue,
    } = useCreateEventFormikContext();

    const setLocation = useCallback((value: LocationForm) => setFieldValue('location', value), [setFieldValue]);

    return { location, setLocation };
};

export const LocationField = () => {
    const { location, setLocation } = useCreateEventFormLocationvalue();
    const [showLocationDialog, setShowLocationDialog] = useState(false);

    const handleDialogOpen = () => {
        setShowLocationDialog(true);
    };
    const handleDialogClose = (location?: LocationForm) => {
        if (location) {
            setLocation(location);
        }

        setShowLocationDialog(false);
    };

    const handleSimpleInputChange = (name?: string) => {
        setLocation({ name });
    };

    return (
        <>
            <Grid item xs={12}>
                <LocationFormNameInput
                    name={location.name}
                    onChange={handleSimpleInputChange}
                    onIconClick={handleDialogOpen}
                />
            </Grid>
            <LocationFormDialog open={showLocationDialog} onClose={handleDialogClose} location={location} />
        </>
    );
};
