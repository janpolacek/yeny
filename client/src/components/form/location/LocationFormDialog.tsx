import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { LocationAutoComplete } from './LocationAutoComplete';
import { LocationForm } from '../../../_types/LocationForm';
import { Form, Formik } from 'formik';
import { LocationInput } from '../../../_generated/globalTypes';

export const LocationFormDialog: React.FC<{
    open: boolean;
    onClose: (location?: LocationForm) => void;
    location: LocationInput;
}> = ({ open, onClose, location }) => {
    const handleCancel = () => {
        onClose();
    };

    const handleSubmit = (location: LocationForm) => {
        onClose(location);
    };

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            aria-labelledby="confirmation-dialog-title"
            open={open}
            fullWidth={true}
            maxWidth={'sm'}
        >
            <Formik<LocationForm> initialValues={location} onSubmit={handleSubmit}>
                <Form>
                    <DialogTitle id="confirmation-dialog-title">Find location</DialogTitle>
                    <DialogContent dividers>
                        <LocationAutoComplete />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCancel} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Form>
            </Formik>
        </Dialog>
    );
};
