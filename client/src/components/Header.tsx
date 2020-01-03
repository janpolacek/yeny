import { AppBar, Button, fade, InputBase, Link, makeStyles, Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';
import * as colors from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: colors.red['800']
    },
    logo: {
        padding: theme.spacing(1),
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoIcon: {
        display: 'flex',
        stroke: theme.palette.common.white,
        height: '40px',
        width: '72px',
        '&:hover': {
            stroke: fade(theme.palette.common.white, 0.8),
            scale: '1.05',
            cursor: 'pointer'
        }
    },
    search: {
        position: 'relative',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 360
            }
        }
    },
    addNewButton: {
        margin: theme.spacing(1)
    }
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
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search ..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <Button color="inherit" className={classes.addNewButton} onClick={handleCreateEventClick}>
                    Create Event
                </Button>
            </Toolbar>
        </AppBar>
    );
};
