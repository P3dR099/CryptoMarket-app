import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import WalletModal from './WalletModal';
import Modal from '@material-ui/core/Modal';
import FormModal from './FormModal';

const SimpleMenu = ({ title, provider, addressWallet }) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={(event) => handleClick(event)}
            >
                {title.substring(0, 7) + '...'}
                <KeyboardArrowDownRoundedIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleOpenModal}>Wallet</MenuItem>
                <MenuItem onClick={handleClose}>Transactions</MenuItem>
                <MenuItem onClick={handleClose}>Disconnect</MenuItem>
            </Menu>
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {<WalletModal provider={provider} addressWallet={addressWallet} />}
            </Modal>
        </div>
    );
}

export default SimpleMenu;