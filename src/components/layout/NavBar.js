import React from 'react';
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
// import ModalAuth from '../pages/ModalAuth.js'
import AccountCircle from './AccountCircle.js'
import logoCripto from '../../logos/default.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlignLast: 'center'
    },
    navbar: {
        background: 'transparent',
        boxShadow: 'none',
        // position: 'absolute'
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
        display: 'flex',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        justifyContent: 'flex-end',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    logoCripto: {
        marginRight: 90,
        marginTop: 8,
        width: 60,
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

    const classes = useStyles();
    const { data } = props
    let history = useHistory();

    const matchesMin = useMediaQuery('(min-width:350px)');
    const matches = useMediaQuery('(min-width:600px)');

    const handleClick = (event) => {
        data.map(el => {
            if (el.name === event.target.innerText) {
                return history.push('/coin/' + el.id)
            }
            return 0
        })

    };


    return (
        <AppBar position="static" className={classes.navbar}>
            <Toolbar>
                {props.loggedInUser && <AccountCircle {...props} />}
                {/* <ModalAuth {...props} /> */}
                <img style={{ width: !matches ? 60 : 70, height: !matches && 60 }} className={classes.logoCripto} src={logoCripto} alt="cripto" />
                <Typography onClick={() => history.push('/')} className={classes.title} variant="h6" noWrap>
                    CryptoMarket
                </Typography>
                <div className={classes.search} style={{ backgroundColor: !matches && 'transparent', width: !matchesMin && 160 }}>
                    <Autocomplete
                        freeSolo
                        onChange={(event) => handleClick(event)}
                        id="free-solo-2"
                        disableClearable
                        options={data ? data.map((option) => option.name) : []}
                        renderInput={(params) => (
                            <Grid container spacing={1} style={{ justifyContent: "flex-end" }}>
                                <Grid item>
                                    {matches ? <SearchIcon style={{ marginTop: "15px" }} /> : ''}
                                    <TextField
                                        style={{ margin: 0, width: 175 }}
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
    );
}