import React from 'react';
import { LocationInput } from '../../_generated/globalTypes';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import makeStyles from '@material-ui/core/styles/makeStyles';
import * as colors from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    listbox: {
        '&.MuiAutocomplete-listbox': {
            maxHeight: '200px',
        },
    },
    legend: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1),
        color: colors.grey['800'],
    },
}));

export const LocationInfo: React.FC<{ location?: Partial<LocationInput> }> = ({ location }) => {
    const classes = useStyles();

    if (!location || !location?.latitude || !location.longitude) {
        return null;
    }

    return (
        <div className={classes.legend}>
            <LocationOnIcon />
            <span>
                Location: {location.latitude}, {location.longitude}
            </span>
        </div>
    );
};
