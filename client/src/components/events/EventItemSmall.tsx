import * as React from 'react';
import { FullSearch_fullSearch } from '../../_generated/FullSearch';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import placeholderWhite from 'assets/placeholder_white.png';
import { shortenText } from 'utils';
import * as colors from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    searchItem: {
        display: 'flex',
        flexShrink: 0,
        borderRadius: 0,
        '&[data-focus="true"]': {
            backgroundColor: theme.palette.grey['200'],
        },
        '&:hover': {
            cursor: 'pointer',
        },
        padding: theme.spacing(2),
    },
    searchItemContent: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0,
        },
    },
    searchItemCover: {
        flexShrink: 0,
        height: 70,
        width: 140,
        border: `1px solid ${colors.grey['300']}`,
        marginRight: theme.spacing(2),
    },
    searchItemTitle: {
        textTransform: 'capitalize',
    },
    searchItemDescription: {
        textTransform: 'capitalize',
        color: colors.grey['800'],
    },
}));

export const EventItemSmall: React.FC<{ result: FullSearch_fullSearch; cardProps?: {} }> = ({ result, cardProps }) => {
    const classes = useStyles();
    return (
        <Card {...cardProps} className={classes.searchItem}>
            <CardMedia className={classes.searchItemCover} image={result.image ?? placeholderWhite} />
            <CardContent className={classes.searchItemContent}>
                <Typography variant={'body1'} className={classes.searchItemTitle}>
                    {result.title}
                </Typography>
                <Typography variant={'body2'} className={classes.searchItemDescription}>
                    {shortenText(result.description, 50)}
                </Typography>
            </CardContent>
        </Card>
    );
};
