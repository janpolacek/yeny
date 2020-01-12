import { AppBar, Button, fade, Link, makeStyles, Toolbar } from '@material-ui/core';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/logo.svg';
import * as colors from '@material-ui/core/colors';
import { Search } from './Search';

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
        margin: theme.spacing(1),
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
        <AppBar position="static" elevation={0} className={classes.root}>
            <Toolbar>
                <Link className={classes.logo}>
                    <Logo className={classes.logoIcon} onClick={handleLogoClick} />
                </Link>
                <Search />
                <Button
                    color="inherit"
                    type={'button'}
                    className={classes.addNewButton}
                    onClick={handleCreateEventClick}
                >
                    Create Event
                </Button>
            </Toolbar>
        </AppBar>
    );
};
