import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from "react-router-dom";
// import ModalAuth from '../pages/ModalAuth.js'
import AccountCircle from '../layout/AccountCircle.js';
import logoCripto from '../../logos/default.png';
import Navbar from '../style/Navbar';

export default function SearchAppBar(props) {

    const classes = Navbar();
    const { data } = props
    let history = useHistory();

    const matchesMin = useMediaQuery('(min-width:350px)');
    const matches = useMediaQuery('(min-width:600px)');
    const matchesMedium = useMediaQuery('(min-width:750px)');

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
            <Toolbar style={{ justifyContent: 'space-between' }}>
                {props.loggedInUser && <AccountCircle {...props} />}
                {/* <ModalAuth {...props} /> */}
                <img style={{ width: !matches ? 60 : 70, height: !matches && 60 }} onClick={() => history.push('/')} className={classes.logoCripto} src={logoCripto} alt="cripto" />
                <Typography onClick={() => history.push('/')} className={classes.title} variant="h6" noWrap>
                    CryptoMarket
                </Typography>
                <div className={classes.search} style={{ backgroundColor: !matches && 'whitesmoke', width: !matchesMin && 160, flexBasis: !matchesMedium && '31%' }}>
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
                                        style={{ margin: 0, width: '9.6rem' }}
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