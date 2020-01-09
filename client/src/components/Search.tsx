import { fade, InputBase, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FullSearch, FullSearchVariables } from '_generated/FullSearch';
import { FULLSEARCH_EVENTS } from '_queries/Fullsearch';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
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
    }
}));

export const Search = () => {
    const classes = useStyles();

    const [query, setQuery] = useState('');
    const { data, loading, error } = useQuery<FullSearch, FullSearchVariables>(FULLSEARCH_EVENTS, {
        variables: { query }
    });

    return (
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
                value={query}
                onChange={e => setQuery(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    );
};
