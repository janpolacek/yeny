import { CircularProgress, fade, InputBase, makeStyles, Paper, Popper } from '@material-ui/core';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FullSearch, FullSearch_fullSearch, FullSearchVariables } from '_generated/FullSearch';
import { FULLSEARCH_EVENTS } from '_queries/Fullsearch';
import SearchIcon from '@material-ui/icons/Search';
import { useAutocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { EventItemSmall } from './events/EventItemSmall';

const useStyles = makeStyles(theme => ({
    searchRoot: {
        position: 'relative',
    },
    searchInput: {
        position: 'relative',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    inputIcon: {
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIcon: {
        width: theme.spacing(7),
    },
    loadingIcon: {
        width: theme.spacing(4),
        right: 0,
        top: 0,
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 4, 1, 7),
        transition: theme.transitions.create('width'),
        width: 240,
        '&:focus': {
            width: 360,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            '&:focus': {
                width: '100%',
            },
        },
    },
    popper: {
        marginTop: theme.spacing(1),
        zIndex: 1000,
    },
    searchResults: {
        width: 424,
        maxHeight: 320,

        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        overflowY: 'auto',
    },
}));

export const Search = () => {
    const classes = useStyles();
    const inputRef = useRef<HTMLDivElement | null>(null);
    const [query, setQuery] = useState('');
    const { data, loading, error } = useQuery<FullSearch, FullSearchVariables>(FULLSEARCH_EVENTS, {
        variables: { query },
    });
    const history = useHistory();

    const handleQueryChange = (value: string = '') => {
        setQuery(value.trim());
    };

    const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } = useAutocomplete({
        id: 'event-search',
        options: data?.fullSearch ?? [],
        value: query,
        onChange: (event, value: FullSearch_fullSearch) => {
            handleQueryChange(value?.title);
            history.push(`/event/${value.url}`);
            (event.target as HTMLInputElement).blur();
        },
        onInputChange: (event, value) => {
            handleQueryChange(value);
        },
        onClose: () => {
            handleQueryChange('');
        },
        getOptionLabel: (option: FullSearch_fullSearch | string) =>
            typeof option === 'string' ? option : option.title,
    });

    return (
        <div className={classes.searchRoot}>
            <div {...getRootProps()} className={classes.searchInput} ref={inputRef}>
                <div className={`${classes.searchIcon} ${classes.inputIcon}`}>
                    <SearchIcon />
                </div>
                <InputBase
                    {...getInputProps()}
                    placeholder="Search ..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <div className={`${classes.loadingIcon} ${classes.inputIcon}`}>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                </div>
            </div>
            <Popper
                open={groupedOptions.length > 0 && inputRef.current !== null}
                anchorEl={inputRef.current}
                className={classes.popper}
                placement={'bottom-start'}
            >
                <Paper {...getListboxProps()} square={true} className={classes.searchResults} elevation={8}>
                    {data?.fullSearch?.map((option: FullSearch_fullSearch, index) => (
                        <EventItemSmall
                            result={option}
                            cardProps={getOptionProps({ option, index })}
                            key={option.url}
                        />
                    ))}
                </Paper>
            </Popper>
        </div>
    );
};
