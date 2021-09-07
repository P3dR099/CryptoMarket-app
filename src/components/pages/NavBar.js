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
import FormDialog from '../layout/ModalAuth';
import { useSelector } from 'react-redux';
import AccountCircle from '../layout/AccountCircle.js';
// import logoCripto from '../../logos/default.png';
import Navbar from '../style/Navbar';


export default function SearchAppBar(props) {


    const { setUser } = useSelector(state => state)
    const classes = Navbar();
    let history = useHistory();
    const matchesMin = useMediaQuery('(min-width:350px)');
    const matches = useMediaQuery('(min-width:600px)');
    const matchesMedium = useMediaQuery('(min-width:750px)');
    const { data } = props;


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
                {setUser !== null && <AccountCircle {...props} />}
                {setUser === null &&
                    <Typography onClick={() => history.push('/')} className={classes.title} variant="h6" noWrap>
                        CryptoMarket
                    </Typography>

                }
                {matches && <FormDialog {...props} />}
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
                                    {matches ? <SearchIcon style={{ marginTop: "1rem" }} /> : ''}
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