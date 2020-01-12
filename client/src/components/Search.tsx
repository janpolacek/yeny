import {
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    fade,
    InputBase,
    makeStyles,
    Paper,
    Popper,
    Typography,
} from '@material-ui/core';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FullSearch, FullSearch_fullSearch, FullSearchVariables } from '_generated/FullSearch';
import { FULLSEARCH_EVENTS } from '_queries/Fullsearch';
import SearchIcon from '@material-ui/icons/Search';
import { useAutocomplete } from '@material-ui/lab';
import placeholderWhite from 'assets/placeholder_white.png';
import * as colors from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';

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
    },
    popper: {
        marginTop: theme.spacing(1),
    },
    searchResults: {
        width: 424,
        maxHeight: 320,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        overflowY: 'auto',
    },
    searchItem: {
        display: 'flex',
        flexShrink: 0,
        borderRadius: 0,
        '&[data-focus="true"]': {
            backgroundColor: theme.palette.grey['200'],
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

export const Search = () => {
    const classes = useStyles();
    const inputRef = useRef<HTMLDivElement | null>(null);
    const [query, setQuery] = useState('');
    const { data, loading, error } = useQuery<FullSearch, FullSearchVariables>(FULLSEARCH_EVENTS, {
        variables: { query },
    });
    const history = useHistory();
    const handleQueryChange = (value: string) => {
        setQuery(value.trim());
    };

    const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } = useAutocomplete({
        id: 'event-search',
        options: data?.fullSearch ?? [],
        value: query,
        onChange: (event, value: FullSearch_fullSearch) => {
            handleQueryChange(value.title);
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
                        <SearchItemResult
                            result={option}
                            optionProps={getOptionProps({ option, index })}
                            key={option.url}
                        />
                    ))}
                </Paper>
            </Popper>
        </div>
    );
};

const SearchItemResult: React.FC<{ result: FullSearch_fullSearch; optionProps: {} }> = ({ result, optionProps }) => {
    const classes = useStyles();
    return (
        <Card {...optionProps} className={classes.searchItem}>
            <CardMedia className={classes.searchItemCover} image={result.image ?? placeholderWhite} />
            <CardContent className={classes.searchItemContent}>
                <Typography variant={'body1'} className={classes.searchItemTitle}>
                    {result.title}
                </Typography>
                <Typography variant={'body2'} className={classes.searchItemDescription}>
                    {result.description.length > 50 ? `${result.description.slice(0, 50)} ...` : result.description}
                </Typography>
            </CardContent>
        </Card>
    );
};
