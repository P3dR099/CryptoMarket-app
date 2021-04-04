import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";

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

function SimpleMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
        console.log(event.target.innerText)
        if (event.target.innerText === 'EUR') {
            props.setCurrency('EUR')
        }
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Open Menu
      </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>EUR</MenuItem>
                <MenuItem onClick={handleClose}>GBP</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}


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

    return (
        <div className={classes.root}>
            {/* {console.log(props)} */}
            <AppBar backgroundcolor="#04048ded" position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <SimpleMenu {...props} />
                    <Typography className={classes.title} variant="h6" noWrap>
                        CryptoMarket
                    </Typography>
                    <div className={classes.search}>
                        <Autocomplete
                            freeSolo
                            onChange={(event) => handleClick(event)}
                            id="free-solo-2"
                            disableClearable
                            options={data === undefined ? [] : data.map((option) => option.name)}
                            renderInput={(params) => (
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <div style={{ marginBottom: 10 }}>
                                            <SearchIcon />
                                        </div>
                                    </Grid>
                                    <Grid item>
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