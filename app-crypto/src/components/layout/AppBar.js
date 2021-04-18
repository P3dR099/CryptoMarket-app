import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from "react-router-dom";
import ModalAuth from '../pages/ModalAuth.js'
import { Button } from '@material-ui/core';
import AccountCircle from './AccountCircle.js'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
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
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar(props) {

    const [val, setVal] = useState({})
    const classes = useStyles();
    const { data } = props
    let history = useHistory();

    const handleClick = (event) => {
        data.map(el => {
            if (el.name === event.target.innerText) {
                return history.push('/coin/' + el.id)
            }
            return 0;
        })
        setVal(event.target.innerText)
    };

    const matches = useMediaQuery('(min-width:600px)');

    return (
        <div className={classes.root}>
            <AppBar backgroundcolor="#04048ded" position="static">
                <Toolbar>
                    {props.loggedInUser && <AccountCircle {...props} />}
                    <ModalAuth {...props} />
                    <Typography onClick={() => history.push('/')} className={classes.title} variant="h6" noWrap>
                        CryptoMarket
                    </Typography>
                    <div className={classes.search}>
                        <Autocomplete
                            freeSolo
                            onChange={(event) => handleClick(event)}
                            id="free-solo-2"
                            disableClearable
                            options={data && data.map((option) => option.name)}
                            renderInput={(params) => (
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        {matches ? <SearchIcon /> : ''}
                                        <TextField
                                            style={{ margin: 0, width: 180 }}
                                            {...params}
                                            label="Search"
                                            margin="normal"
                                            variant="outlined"
                                            InputProps={{ ...params.InputProps, type: 'search' }}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div >
    );
}