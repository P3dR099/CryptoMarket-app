import React from 'react';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import logoEUR from '../../logos/euro.png'

export default function SimpleMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
        event.preventDefault()
        if (event.target.innerText === 'EUR') {
            props.handleClick(event)
        }
        if (event.target.innerText === 'USD') {
            props.handleClick(event)
        }
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <img style={{ width: 20, margin: "0px 4px" }} src={logoEUR}></img>
                EUR
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>EUR</MenuItem>
                <MenuItem onClick={handleClose}>USD</MenuItem>
            </Menu>
        </div>
    );
}

