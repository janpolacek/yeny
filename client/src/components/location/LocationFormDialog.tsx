import * as React from 'react';
import { LocationAutoComplete } from 'components/location/LocationAutoComplete';
import { LocationForm } from '_types/LocationForm';
import { Form, Formik } from 'formik';
import { LocationInput } from '_generated/globalTypes';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

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
            keepMounted={false}
        >
            <Formik<LocationForm> initialValues={location} onSubmit={handleSubmit}>
                <Form>
                    <DialogTitle id="confirmation-dialog-title">Find location</DialogTitle>
                    <DialogContent dividers>
                        <LocationAutoComplete />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus type={'button'} onClick={handleCancel} color="primary">
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
