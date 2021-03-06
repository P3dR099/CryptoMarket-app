import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHistory } from "react-router-dom";


export default function MenuAccountBar(props) {

    let history = useHistory();
    const [auth,] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        if (event.target.innerText === 'Profile') {
            history.push('/user/')
        }
        if (event.target.innerText === 'Market') {
            history.push('/')
        }



        setAnchorEl(null);
    };

    return (
        <div>
            {auth && (
                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={(event) => handleClose(event)}>{history.location.pathname === '/user/' && 'Market'}</MenuItem>
                        <MenuItem onClick={() => props.handleLogOut()}>Logout</MenuItem>
                    </Menu>
                </div>
            )}
        </div >
    );
}