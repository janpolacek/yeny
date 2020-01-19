import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/logo.svg';
import * as colors from '@material-ui/core/colors';
import { Search } from './Search';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: colors.red['800'],
    },
    logo: {
        padding: theme.spacing(1),
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoIcon: {
        display: 'flex',
        stroke: theme.palette.common.white,
        height: '40px',
        width: '72px',
        '&:hover': {
            stroke: fade(theme.palette.common.white, 0.8),
            scale: '1.05',
            cursor: 'pointer',
        },
    },
    addNewButton: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(1),

        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(0),
            marginLeft: theme.spacing(2),
        },
        flexShrink: 0,
    },
}));

export const Header = () => {
    const classes = useStyles();
    const history = useHistory();

    const handleLogoClick = () => {
        history.push(`/`);
    };

    const handleCreateEventClick = () => {
        history.push(`/create-event`);
    };

    return (
        <AppBar position="fixed" elevation={0} className={classes.root}>
            <Toolbar>
                <Link className={classes.logo}>
                    <Logo className={classes.logoIcon} onClick={handleLogoClick} />
                </Link>
                <Search />
                <Button
                    color="inherit"
                    type={'button'}
                    variant={'outlined'}
                    className={classes.addNewButton}
                    onClick={handleCreateEventClick}
                >
                    Create Event
                </Button>
            </Toolbar>
        </AppBar>
    );
};
